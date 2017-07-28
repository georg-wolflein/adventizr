import './size-form.html';

Template.calendar_edit_size_form.events({
  'submit'(event, template) {
    event.preventDefault();
    Meteor.call('calendars.update.size', template.data._id, parseInt(event.target.width.value), parseInt(event.target.height.value));
    // TODO: display success alert
  },
  'click #matchAspectRatio'(event, template) {
    var img = new Image();
    img.onload = function() {
      var width = event.target.parentElement.width.value,
          height = (img.height / img.width) * width;
      Meteor.call('calendars.update.size', template.data._id, parseInt(width), parseInt(height));
    }
    img.src = this.backgroundImage;
  }
});