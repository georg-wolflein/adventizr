import { Calendars } from '/imports/api/calendars/calendars.js';
import fs from 'fs';
import JSZip from 'jszip';

/**
 * Get a Node.js stream of the exported ZIP file.
 * @param {String} id the calendar's id
 */
module.exports = id => {
  var folder = Meteor.settings.public.CALENDAR_FILES_PATH + '/' + id,
    zip = new JSZip();
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  fs
    .readdirSync(folder)
    .forEach(file => zip.file(file, fs.readFileSync(folder + '/' + file)));
  zip.file('calendar.json', JSON.stringify(Calendars.findOne(id)));
  return zip.generateNodeStream({ streamFiles: true });
};
