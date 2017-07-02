import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';
import './calendars-create.html';

Template.app_calendars_create.events({
  'submit'(event) {
    event.preventDefault();
    
    const target = event.target;
    const title = target.title;
    const description = target.description;

    Meteor.call('calendars.insert', title.value, description.value, (error) => {
      if (error) {
        alert("an error occured");
      } else {
        
      }
    });
  }
});