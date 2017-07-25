export const CalendarData = new FS.Collection("calendarData", {
  stores: [new FS.Store.FileSystem("calendarData", { path: "calendarData" })]
});