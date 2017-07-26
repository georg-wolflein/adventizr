import { Calendars } from '/imports/api/calendars/calendars.js';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var'
import './background-form.html';

Template.calendar_edit_background_form.onCreated(function() {
  this.currentUpload = new ReactiveVar(false);
  //Meteor.subscribe('calendars.all');
  //sMeteor.subscribe('files.calendar.all');
});

Template.calendar_edit_background_form.helpers({
  /*
  calendar() {
    var id = FlowRouter.getParam('_id');
    return Calendars.findOne(id);
  },
  */
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.calendar_edit_background_form.events({
  'submit #calendarBackgroundForm'(event, template) {
    event.preventDefault();
    var file = event.target.background.files[0];

    if (file) {
      file.name = "background";
      const upload = CalendarFiles.insert({
        file,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', () => {
        console.log(template.currentUpload);
        template.currentUpload.set(this);
      });

      upload.on('end', (error, fileObj) => {
        if (error) {
          alert('Error during upload: ' + error);
        } else {
          alert('File "' + fileObj.name + '" successfully uploaded');
          console.log(fileObj);
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }

  }
});