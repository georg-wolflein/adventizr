import { Calendars } from '/imports/api/calendars/calendars.js';
import fs from 'fs';
import JSZip from 'jszip';

/**
 * Get a Node.js stream of the exported ZIP file.
 * @param {String} id the calendar's id
 */
module.exports = id => {
  var folder = Meteor.settings.public.CALENDAR_FILES_PATH + '/' + id,
    jsonFile = folder + '/calendar.json',
    jsonContent = JSON.stringify(Calendars.findOne(id)),
    zip = new JSZip();
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  fs.writeFileSync(jsonFile, jsonContent);
  fs
    .readdirSync(folder)
    .forEach(file => zip.file(file, fs.readFileSync(folder + '/' + file)));
  return zip.generateNodeStream({ streamFiles: true });
};
