import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';

import './profile.html';

import '/imports/ui/components/calendar-card/calendar-card.js';

Template.user_profile.onCreated(function() {
  Meteor.subscribe('calendars.all');
});

Template.user_profile.helpers({
  mycalendars() {
    return Calendars.find({'user': Meteor.userId()});
  },
});