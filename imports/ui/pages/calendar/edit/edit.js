import { Calendars } from "/imports/api/calendars/calendars.js";
import { CalendarFiles } from "/imports/api/calendar-files/calendar-files.js";
import { Meteor } from "meteor/meteor";
import "./edit.html";
import "./info-form/info-form.js";
import "./background-form/background-form.js";
import "./size-form/size-form.js";

import interact from "interactjs";

Template.calendar_edit.onCreated(function() {
  Meteor.subscribe("calendars.all");
  Meteor.subscribe("files.calendar.all");
});

Template.calendar_edit.onRendered(function() {
  interact(".resize-drag")
    .draggable({
      inertia: false,
      onmove: onMove
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true }
    })
    .on("resizemove", onResizeMove);
});

Template.calendar_edit.helpers({
  calendar() {
    var id = FlowRouter.getParam("_id");
    var calendar = Calendars.findOne(id);
    if (
      calendar &&
      calendar.background &&
      CalendarFiles.findOne(calendar.background)
    )
      calendar.backgroundImage = CalendarFiles.findOne(
        calendar.background
      ).link();
    return calendar;
  }
});

function onMove(event) {
  var target = event.target,
    // Keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx,
    y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // Translate the element
  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  // Update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

function onResizeMove(event) {
  var target = event.target,
    x = parseFloat(target.getAttribute("data-x")) || 0,
    y = parseFloat(target.getAttribute("data-y")) || 0;

  // Update the element's style
  target.style.width = event.rect.width + "px";
  target.style.height = event.rect.height + "px";

  // Translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px," + y + "px)";

  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}
