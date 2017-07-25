import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';
import './create.html';

Template.user_create.events({
  'submit'(event) {
    event.preventDefault();
    
    const target = event.target;
    const title = target.title;
    const description = target.description;

    Meteor.call('calendars.insert', title.value, description.value, (error, result) => {
      if (error) {
        alert("an error occured");
      } else {
        FlowRouter.go('calendar.edit', { _id: result });
      }
    });
  }
});