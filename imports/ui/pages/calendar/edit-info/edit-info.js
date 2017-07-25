import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';
import './edit-info.html';

Template.calendar_edit_info.onCreated(() => {
  Meteor.subscribe('calendars.all');
});

Template.calendar_edit_info.helpers({
  calendar() {
    var id = FlowRouter.getParam("_id");
    return Calendars.findOne(id);
  }
});

Template.calendar_edit_info.events({
  'submit'(event) {
    event.preventDefault();
    console.log(Meteor.call('calendars.update', FlowRouter.getParam("_id"), event.target.title.value, event.target.description.value));
    Meteor.call('calendars.update', FlowRouter.getParam("_id"), event.target.title.value, event.target.description.value)
      FlowRouter.go('calendar.edit', { _id: FlowRouter.getParam("_id")});
  }
});