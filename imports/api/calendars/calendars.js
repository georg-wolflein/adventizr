// Definition of the calendars collection

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import exportCalendar from './export-calendar';

export const Calendars = new Mongo.Collection('calendars', {
  transform(doc) {
    doc.user = Meteor.users.findOne(doc.user, {
      fields: { _id: 1, username: 1 }
    });
    return doc;
  }
});

Calendars.after.insert((userId, doc) => exportCalendar(doc._id));
Calendars.after.update((userId, doc) => exportCalendar(doc._id));
