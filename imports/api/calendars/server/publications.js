// All calendars-related publications

import { Meteor } from 'meteor/meteor';
import { Calendars } from '../calendars.js';

Meteor.publish('calendars.all', function() {
  return Calendars.find();
});
