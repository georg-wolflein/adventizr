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
  'calendars.update.info'(_id, title, description) {
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
  },
  'calendars.update.size'(_id, width, height) {
    check(_id, String);
    check(width, Number);
    check(height, Number);

    return Calendars.update(_id, {
      $set: {
        width,
        height,
        updated: new Date()
      }
    });
  },
  'calendars.update.background'(_id, background) {
    check(_id, String);

    return Calendars.update(_id, {
      $set: {
        background,
        updated: new Date()
      }
    });
  }
});

// TODO: change created/updated attributes with event hooks