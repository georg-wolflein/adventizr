import { Calendars } from '/imports/api/calendars/calendars.js';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';
import { Meteor } from 'meteor/meteor';
import './edit.html';
import './info-form/info-form.js';
import './background-form/background-form.js';
import './size-form/size-form.js';

import interact from 'interactjs';

Template.calendar_edit.onCreated(function() {
  Meteor.subscribe('calendars.all');
  Meteor.subscribe('files.calendar.all');
  this.calendar = new ReactiveVar(null);
  this.selectedDoor = new ReactiveVar(null);
});

Template.calendar_edit.onRendered(function() {
  this.autorun(() => {
    var id = FlowRouter.getParam('_id');
    var calendar = Calendars.findOne(id);
    if (
      calendar &&
      calendar.background &&
      CalendarFiles.findOne(calendar.background)
    )
      calendar.backgroundImage = CalendarFiles.findOne(
        calendar.background
      ).link();
    this.calendar.set(calendar);
  });
  this.autorun(() => {
    var number = this.selectedDoor.get()
      ? this.selectedDoor.get().number
      : null;
    if (this.calendar.get())
      this.calendar.get().doors.forEach(function(door) {
        if (document.getElementById('door' + door.number))
          document.getElementById('door' + door.number).style.borderStyle =
            door.number == number ? 'dashed' : 'solid';
      }, this);
  });
  interact('.resize-drag')
    .draggable({
      inertia: false,
      onmove: onMove
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true }
    })
    .on('resizemove', onResizeMove);
});

Template.calendar_edit.helpers({
  calendar() {
    return Template.instance().calendar.get();
  },
  selectedDoor() {
    return Template.instance().selectedDoor.get();
  }
});

Template.calendar_edit.events({
  'mousedown .door'(event, template) {
    var target = event.target.classList.contains('door')
      ? event.target
      : event.target.parentElement;
    var number = template.selectedDoor.get()
      ? template.selectedDoor.get().number
      : null;
    //if (number && 'door' + number != target.id)
    selectDoor(target.id.substring('door'.length));
  },
  'mousedown .door-background'(event, template) {
    selectDoor(null);
  }
});

function onMove(event) {
  var target = event.target,
    // Keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // Translate the element
  target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';

  // Update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function onResizeMove(event) {
  var target = event.target,
    x = parseFloat(target.getAttribute('data-x')) || 0,
    y = parseFloat(target.getAttribute('data-y')) || 0;

  // Update the element's style
  target.style.width = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';

  // Translate when resizing from top or left edges
  x += event.deltaRect.left;
  y += event.deltaRect.top;

  target.style.webkitTransform = target.style.transform =
    'translate(' + x + 'px,' + y + 'px)';

  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function selectDoor(number) {
  console.log(number);
  Template.instance().selectedDoor.set(
    number
      ? Template.instance().calendar.get().doors.find(element => {
          return element.number == number;
        })
      : null
  );
}
