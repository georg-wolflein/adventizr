import { FilesCollection } from 'meteor/ostrio:files';
import { Calendars } from '/imports/api/calendars/calendars.js';

export const CalendarFiles = new FilesCollection({
  collectionName: 'CalendarFiles',
  allowClientCode: false, // Disallow remove files from client
  storagePath(file) {
    var path = Meteor.settings.public.CALENDAR_FILES_PATH;
    if (file.meta && file.meta.calendarId) path += '/' + file.meta.calendarId;
    return path;
  },
  namingFunction(file) {
    if (file.meta && file.meta.type) return file.meta.type;
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB
    if (file.size > 10485760)
      return 'Please upload files with size equal or less than 10MB';

    // Delete old version
    if (file.meta && file.meta.type && file.meta.calendarId) {
      if (file.meta.type == 'background') {
        var oldFileId = Calendars.findOne(file.meta.calendarId).background;
        if (oldFileId) CalendarFiles.findOne(oldFileId).remove();
      }
    }
    return true;
  },
  onAfterUpload(file) {
    // Update Calendars collection
    if (file.meta && file.meta.type && file.meta.calendarId) {
      if (file.meta.type == 'background')
        Meteor.call(
          'calendars.update.background',
          file.meta.calendarId,
          file._id
        );
    }
  },
  onAfterRemove(files) {
    // Remove reference from Calendars
    files.forEach(function(file) {
      if (file.meta && file.meta.type && file.meta.calendarId) {
        if (file.meta.type == 'background')
          Meteor.call(
            'calendars.update.background',
            file.meta.calendarId,
            undefined
          );
      }
    }, this);
  }
});
