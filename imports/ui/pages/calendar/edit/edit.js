import { Calendars } from '/imports/api/calendars/calendars.js';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';
import { Meteor } from 'meteor/meteor';
import './edit.html';
import './info-form/info-form.js';
import './background-form/background-form.js';
import './size-form/size-form.js';

Template.calendar_edit.onCreated(function() {
  Meteor.subscribe('calendars.all');
  Meteor.subscribe('files.calendar.all');
});

Template.calendar_edit.helpers({
  calendar() {
    var id = FlowRouter.getParam('_id');
    var calendar = Calendars.findOne(id);
    if (calendar && calendar.background)
      calendar.backgroundImage = CalendarFiles.findOne(calendar.background).link();
    return calendar;
  }
});