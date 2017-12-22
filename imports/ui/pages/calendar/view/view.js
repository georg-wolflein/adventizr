import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';
import './view.html';

Template.calendar_view.onCreated(() => {
  Meteor.subscribe('calendars.all');
});

Template.calendar_view.helpers({
  calendar() {
    var id = FlowRouter.getParam('_id');
    return Calendars.findOne(id);
  }
});
