import { FilesCollection } from 'meteor/ostrio:files';
import { Calendars } from '/imports/api/calendars/calendars.js';

export const CalendarFiles = new FilesCollection({
  collectionName: 'calendar-files',
  allowClientCode: false, // Disallow remove files from client
  storagePath(file) {
    var path = Meteor.settings.public.CALENDAR_FILES_PATH;
    if (file.meta && file.meta.calendarId) path += '/' + file.meta.calendarId;
    return path;
  },
  namingFunction(file) {
    if (file.meta && file.meta.type)
      return file.meta.type + (file.meta.type == 'gift' ? file.meta.door : '');
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB
    if (file.size > 10485760)
      return 'Please upload files with size equal or less than 10MB';

    // Delete old version
    if (file.meta && file.meta.type && file.meta.calendarId) {
      var oldFileId;
      switch (file.meta.type) {
        case 'background':
          oldFileId = Calendars.findOne(file.meta.calendarId).background;
          break;
        case 'gift':
          oldFileId = Calendars.findOne(file.meta.calendarId).doors.find(
            d => d.number == file.meta.door
          ).gift;
          break;
      }
      if (oldFileId && CalendarFiles.findOne(oldFileId))
        CalendarFiles.findOne(oldFileId).remove();
    }
    return true;
  },
  onAfterUpload(file) {
    // Update Calendars collection
    if (file.meta && file.meta.type && file.meta.calendarId) {
      switch (file.meta.type) {
        case 'background':
          Meteor.call(
            'calendars.update.background',
            file.meta.calendarId,
            file._id
          );
          break;
        case 'gift':
          Meteor.call(
            'calendars.update.doors',
            file.meta.calendarId,
            Calendars.findOne(file.meta.calendarId).doors.map(door => {
              if (door.number == file.meta.door) door.gift = file._id;
              return door;
            })
          );
          break;
      }
    }
  },
  onAfterRemove(files) {
    // Remove reference from Calendars
    files.forEach(function(file) {
      if (file.meta && file.meta.type && file.meta.calendarId) {
        switch (file.meta.type) {
          case 'background':
            Meteor.call(
              'calendars.update.background',
              file.meta.calendarId,
              undefined
            );
            break;
          case 'gift':
            Meteor.call(
              'calendars.update.doors',
              file.meta.calendarId,
              Calendars.findOne(file.meta.calendarId).doors.map(door => {
                if (door.number == file.meta.door) door.gift = undefined;
                return door;
              })
            );
            break;
        }
      }
    }, this);
  }
});
