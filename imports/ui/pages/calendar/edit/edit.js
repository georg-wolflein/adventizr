import { Calendars } from '/imports/api/calendars/calendars.js';
import { CalendarFiles } from '/imports/api/calendar-files/calendar-files.js';
import { Meteor } from 'meteor/meteor';
import './edit.html';
import './info-form/info-form.js';
import './background-form/background-form.js';
import './size-form/size-form.js';
import './door-form/door-form.js';

import interact from 'interactjs';

let calendar = new ReactiveVar(null),
  selectedDoor = new ReactiveVar(null);

Template.calendar_edit.onCreated(function() {
  Meteor.subscribe('calendars.all');
  Meteor.subscribe('files.calendar.all');
});

Template.calendar_edit.onRendered(function() {
  this.autorun(() => {
    let id = FlowRouter.getParam('_id'),
      cal = Calendars.findOne(id);
    if (cal && cal.background && CalendarFiles.findOne(cal.background))
      cal.backgroundImage = CalendarFiles.findOne(cal.background).link();
    calendar.set(cal);
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
    return calendar.get();
  },
  selectedDoor() {
    return selectedDoor.get();
  },
  isSelected(number) {
    return selectedDoor.get() && selectedDoor.get().number == number;
  }
});

Template.calendar_edit.events({
  'mousedown .door'(event, template) {
    let target = event.target.classList.contains('door')
        ? event.target
        : event.target.parentElement,
      number = target.getAttribute('data-door-number');
    // Check if selection changed
    if (!selectedDoor.get() || selectedDoor.get().number != number)
      changeSelection(number);
  },
  'mousedown .door-background'(event, template) {
    if (selectedDoor.get()) changeSelection(null);
  },
  'mouseup .door'(event, template) {
    save();
    changeSelection(selectedDoor.get().number);
  },
  'click #save'(event, template) {
    changeSelection(null);
    save();
  }
});

function save() {
  Meteor.call(
    'calendars.update.doors',
    calendar.get()._id,
    calendar.get().doors
  );
}

function onMove(event) {
  selectedDoor.get().x += event.dx;
  selectedDoor.get().y += event.dy;
  updateCalendarDoors();
}

function onResizeMove(event) {
  // Define new element properties
  let x = selectedDoor.get().x + parseInt(event.deltaRect.left, 10),
    y = selectedDoor.get().y + parseInt(event.deltaRect.top, 10),
    width = parseInt(event.rect.width, 10),
    height = parseInt(event.rect.height, 10);
  // Force minimum width and height
  width = width > 30 ? width : 30;
  height = height > 30 ? height : 30;
  // Update element style
  selectedDoor.get().x = x;
  selectedDoor.get().y = y;
  selectedDoor.get().width = width;
  selectedDoor.get().height = height;
  updateCalendarDoors();
}

function changeSelection(number) {
  selectedDoor.set(
    calendar.get().doors.find(element => element.number == number)
  );
}

function updateCalendarDoors() {
  calendar.set(
    Object.assign(calendar.get(), {
      doors: calendar
        .get()
        .doors.map(
          element =>
            element.number == selectedDoor.get().number
              ? selectedDoor.get()
              : element
        )
    })
  );
}
