import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';
import './edit.html';

Template.calendar_edit.onCreated(() => {
  Meteor.subscribe('calendars.all');
});

Template.calendar_edit.helpers({
  calendar() {
    var id = FlowRouter.getParam("_id");
    return Calendars.findOne(id);
  }
});