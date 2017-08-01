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
      user: Meteor.userId(),
      created: new Date(),
      updated: new Date(),
      // default width, height and doors
      width: 400,
      height: 400,
      doors: generateCalendarDoors()
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
  },
  'calendars.update.doors'(_id, doors) {
    check(_id, String);
    check(doors, Array);

    return Calendars.update(_id, {
      $set: {
        doors,
        updated: new Date()
      }
    });
  }
});

function generateCalendarDoors() {
  var doors = [];
  for (var door = 0; door < 24; door++) {
    doors.push({
      number: door + 1,
      width: 50,
      height: 50,
      x: 10 + 70 * (door % 6),
      y: 10 + 70 * Math.floor(door / 6),
      text: {
        color: '000',
        size: 12
      }
    });
  }
  return doors;
}

// TODO: change created/updated attributes with event hooks
