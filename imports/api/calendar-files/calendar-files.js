import { FilesCollection } from 'meteor/ostrio:files';

export const CalendarFiles = new FilesCollection({
  collectionName: 'CalendarFiles',
  allowClientCode: false, // Disallow remove files from client
  onBeforeUpload(file) {
    // Allow upload files under 10MB
    if (file.size <= 10485760) {
      return true;
    } else {
      return 'Please upload files with size equal or less than 10MB';
    }
  }
});