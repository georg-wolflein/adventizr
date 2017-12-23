import { Calendars } from '/imports/api/calendars/calendars.js';
import fs from 'fs';
import archiver from 'archiver';

var compress = id => {
  var output = fs.createWriteStream(
    Meteor.settings.public.CALENDAR_FILES_PATH + '/' + id + '.zip'
  );
  var archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(
    Meteor.settings.public.CALENDAR_FILES_PATH + '/' + id,
    false
  );
  archive.finalize();
};

module.exports = id => {
  fs.writeFile(
    Meteor.settings.public.CALENDAR_FILES_PATH + '/' + id + '/calendar.json',
    JSON.stringify(Calendars.findOne(id)),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('Saved calendar.json, now exporting as zip');
      compress(id);
    }
  );
};
