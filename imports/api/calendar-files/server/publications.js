import { CalendarFiles } from '../calendar-files.js';

Meteor.publish('files.calendar.all', function() {
  return CalendarFiles.find().cursor;
});
