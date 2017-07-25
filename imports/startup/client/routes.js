import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
// Body
import '/imports/ui/layouts/body/body.js';
// App
import '/imports/ui/pages/app/home/home.js';
import '/imports/ui/pages/app/not-found/not-found.js';
import '/imports/ui/pages/app/login/login.js';
// User
import '/imports/ui/pages/user/profile/profile.js';
import '/imports/ui/pages/user/create/create.js';
//Calendar
import '/imports/ui/pages/calendar/view/view.js';
import '/imports/ui/pages/calendar/edit/edit.js';
import '/imports/ui/pages/calendar/edit-info/edit-info.js';

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


// Calendar section
const calendarSection = FlowRouter.group({
  prefix: '/c'
});

calendarSection.route('/:_id/view', {
  name: 'calendar.view',
  action() {
    BlazeLayout.render('app_body', { main: 'calendar_view' });
  },
});

calendarSection.route('/:_id/edit', {
  name: 'calendar.edit',
  action() {
    BlazeLayout.render('app_body', { main: 'calendar_edit' });
  },
});

calendarSection.route('/:_id/edit/info', {
  name: 'calendar.edit.info',
  action() {
    BlazeLayout.render('app_body', { main: 'calendar_edit_info' });
  },
});