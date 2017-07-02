import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/home/home.js';
import '/imports/ui/pages/not-found/not-found.js';
import '/imports/ui/pages/login/login.js';
import '/imports/ui/pages/profile/profile.js';
import '/imports/ui/pages/calendars-create/calendars-create.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'app.home',
  action() {
    BlazeLayout.render('app_body', { main: 'app_home' });
  },
});

FlowRouter.route('/login', {
  name: 'app.login',
  action() {
    BlazeLayout.render('app_body', { main: 'app_login' });
  },
});

FlowRouter.route('/profile', {
  name: 'app.profile',
  action() {
    BlazeLayout.render('app_body', { main: 'app_profile' });
  },
});

FlowRouter.route('/create', {
  name: 'app.calendars.create',
  action() {
    BlazeLayout.render('app_body', { main: 'app_calendars_create' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('app_body', { main: 'app_notFound' });
  },
};
