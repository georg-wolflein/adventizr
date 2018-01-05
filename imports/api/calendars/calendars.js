// Definition of the calendars collection

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';

export const Calendars = new Mongo.Collection('calendars', {
  transform(doc) {
    doc.user = Meteor.users.findOne(doc.user, {
      fields: { _id: 1, username: 1 }
    });
    let backgroundImage =
      doc.background != null ? CalendarFiles.findOne(doc.background) : null;
    doc.background = backgroundImage != null ? backgroundImage.link() : null;
    return doc;
  }
});
