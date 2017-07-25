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
      created: new Date(),
      updated: new Date()
    });
  },
  'calendars.update'(_id, title, description) {
    check(_id, String);
    check(title, String);
    check(description, String);

    return Calendars.update(_id, {
      $set: {
        title,
        description,
        updated: new Date()
      }
    });
  }
});
