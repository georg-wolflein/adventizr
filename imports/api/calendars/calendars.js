// Definition of the calendars collection

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Calendars = new Mongo.Collection('calendars', {
  transform(doc) {
    doc.user = Meteor.users.findOne(doc.user, {
      fields: { _id: 1, username: 1 }
    });
    return doc;
  }
});
