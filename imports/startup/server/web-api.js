import { Calendars } from '/imports/api/calendars/calendars.js';
import fs from 'fs';
import exportCalendar from '/imports/api/calendars/export-calendar.js';

// Global API configuration
var Api = new Restivus({
  apiPath: '/api/v1',
  useDefaultAuth: false,
  prettyJson: true
});

var calendarFields = {
  width: 0,
  height: 0,
  doors: 0
};

Api.addRoute('calendars', {
  get() {
    return Calendars.find({}, { fields: calendarFields }).fetch();
  }
});

Api.addRoute('calendars/:_id', {
  get() {
    return Calendars.findOne(this.urlParams._id, { fields: calendarFields });
  }
});

Picker.filter((req, res) => req.method == 'GET').route(
  '/api/v1/calendars/:_id/download',
  (params, req, res) => {
    exportCalendar(params._id).pipe(res);
  }
);

Api.addRoute('status', {
  get() {
    if (this.queryParams.format == 'plain') {
      this.response.write('running');
      this.done();
    } else {
      return { status: 'running' };
    }
  }
});
