import { Calendars } from '/imports/api/calendars/calendars.js';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';
import { Meteor } from 'meteor/meteor';
import './edit.html';
import './background-form/background-form.js';

Template.calendar_edit.onCreated(function() {
  Meteor.subscribe('calendars.all');
  Meteor.subscribe('files.calendar.all');
});

Template.calendar_edit.helpers({
  calendar() {
    var id = FlowRouter.getParam('_id');
    return Calendars.findOne(id);
  }
});

Template.calendar_edit.events({
  'submit #calendarInfoForm'(event) {
    event.preventDefault();
    Meteor.call('calendars.update.info', FlowRouter.getParam('_id'), event.target.title.value, event.target.description.value);
    // TODO: display success alert
  }
});