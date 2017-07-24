import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '/imports/ui/layouts/body/body.js';
import '/imports/ui/pages/app/home/home.js';
import '/imports/ui/pages/app/not-found/not-found.js';
import '/imports/ui/pages/app/login/login.js';
import '/imports/ui/pages/user/profile/profile.js';
import '/imports/ui/pages/user/create/create.js';

// Set up all routes in the app

// App section
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

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('app_body', { main: 'app_notFound' });
  },
};

// User section
const userSection = FlowRouter.group({
  prefix: '/my',
  triggersEnter: [
    (context, redirect) => {
      // Require login
      if (!Meteor.userId()) {
        redirect('app.login');
      }
    }
  ]
});

userSection.route('/profile', {
  name: 'user.profile',
  action() {
    BlazeLayout.render('app_body', { main: 'user_profile' });
  },
});

userSection.route('/create', {
  name: 'user.create',
  action() {
    BlazeLayout.render('app_body', { main: 'user_create' });
  },
});
