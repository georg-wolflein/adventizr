import { Meteor } from 'meteor/meteor';

import './login.html';

Template.app_login.onRendered(function() {
  $('#alertAuthenticationError').hide();
});

Template.app_login.events({
  submit(event) {
    event.preventDefault();
    Meteor.loginWithPassword(
      event.target.username.value,
      event.target.password.value,
      function(error) {
        if (error) {
          $('#alertAuthenticationError').show();
        } else {
          FlowRouter.go('app.home');
        }
      }
    );
  }
});
