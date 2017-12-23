import { Calendars } from '/imports/api/calendars/calendars.js';
import fs from 'fs';

// Global API configuration
var Api = new Restivus({
  apiPath: '/api/v1',
  useDefaultAuth: false,
  prettyJson: true
});

var calendarFields = {
  _id: 1,
  title: 1,
  description: 1,
  user: 1,
  created: 1,
  updated: 1
};

Api.addRoute('calendars', {
  get: function() {
    return Calendars.find({}, { fields: calendarFields }).fetch();
  }
});

Api.addRoute('calendars/:_id', {
  get: function() {
    return Calendars.findOne(this.urlParams._id, { fields: calendarFields });
  }
});

Picker.filter(
  (req, res) => req.method == 'GET'
).route('/api/v1/calendars/:_id/download', (params, req, res) => {
  res.end(
    fs.readFileSync(
      Meteor.settings.public.CALENDAR_FILES_PATH + '/' + params._id + '.zip'
    )
  );
});
