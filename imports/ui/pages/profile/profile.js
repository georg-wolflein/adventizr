import { Calendars } from '/imports/api/calendars/calendars.js';
import { Meteor } from 'meteor/meteor';

import './profile.html';

import '/imports/ui/components/calendar-card/calendar-card.js';

Template.app_profile.onCreated(function() {
  Meteor.subscribe('calendars.all');
});

Template.app_profile.helpers({
  mycalendars() {
    return Calendars.find({'user': Meteor.userId()});
  },
});