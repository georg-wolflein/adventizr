import './size-form.html';

Template.calendar_edit_size_form.events({
  'submit'(event, template) {
    event.preventDefault();
    Meteor.call('calendars.update.size', template.data._id, parseInt(event.target.width.value), parseInt(event.target.height.value));
    // TODO: display success alert
  }
});