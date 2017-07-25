import { CalendarData } from '../calendar-data';

CalendarData.allow({
  'insert'() {
    // TODO: check for permissions to upload
    return true;
  }
})