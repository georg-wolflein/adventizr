import './body.html';

import '/imports/ui/components/navbar/navbar.js';
import '/imports/ui/components/footer/footer.js';

Template.app_body.events({
  'click .logout'(event) {
    Meteor.logout();
    FlowRouter.go('app.home');
  }
});
