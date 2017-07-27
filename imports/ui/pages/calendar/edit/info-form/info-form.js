import './info-form.html';

Template.calendar_edit_info_form.events({
  'submit'(event, template) {
    event.preventDefault();
    Meteor.call('calendars.update.info', template.data._id, event.target.title.value, event.target.description.value);
    // TODO: display success alert
  }
});