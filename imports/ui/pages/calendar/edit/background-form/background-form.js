import { Calendars } from '/imports/api/calendars/calendars.js';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'
import './background-form.html';

Template.calendar_edit_background_form.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
  Meteor.subscribe('calendars.all');
  Meteor.subscribe('files.calendar.all');
});

Template.calendar_edit_background_form.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.calendar_edit_background_form.events({
  'submit'(event, template) {
    event.preventDefault();
    var file = event.target.background.files[0];

    if (file) {
      var meta = {
        calendarId: template.data._id,
        type: 'background'
      };
      const upload = CalendarFiles.insert({
        file,
        meta,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', () => {
        template.currentUpload.set(this);
      });

      upload.on('end', (error, fileObj) => {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          // Success
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }

  }
});