// Methods related to calendars

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Calendars } from './calendars.js';

Meteor.methods({
  'calendars.insert'(title, description) {
    check(title, String);
    check(description, String);

    return Calendars.insert({
      title,
      description,
      'user': Meteor.userId(),
      createdAt: new Date(),
    });
  },
});
