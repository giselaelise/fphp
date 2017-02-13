angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('home', {
    url: '/page1',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('findPetsNearMe', {
    url: '/page4',
    templateUrl: 'templates/findPetsNearMe.html',
    controller: 'findPetsNearMeCtrl'
  })

  .state('petOwnerSignup', {
    url: '/page5',
    templateUrl: 'templates/petOwnerSignup.html',
    controller: 'petOwnerSignupCtrl'
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('page7', {
    url: '/page7',
    templateUrl: 'templates/page7.html',
    controller: 'page7Ctrl'
  })

  .state('petOwnerSignup2', {
    url: '/page8',
    templateUrl: 'templates/petOwnerSignup2.html',
    controller: 'petOwnerSignup2Ctrl'
  })

  .state('registrationComplete', {
    url: '/page9',
    templateUrl: 'templates/registrationComplete.html',
    controller: 'registrationCompleteCtrl'
  })

  .state('signup', {
    url: '/page10',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('petSeekerSignup', {
    url: '/page11',
    templateUrl: 'templates/petSeekerSignup.html',
    controller: 'petSeekerSignupCtrl'
  })

  .state('myProfile', {
    url: '/page13',
    templateUrl: 'templates/myProfile.html',
    controller: 'myProfileCtrl'
  })

  .state('petProfile', {
    url: '/page16',
    templateUrl: 'templates/petProfile.html',
    controller: 'petProfileCtrl'
  })

  .state('reminder', {
    url: '/page17',
    templateUrl: 'templates/reminder.html',
    controller: 'reminderCtrl'
  })

  .state('page', {
    url: '/page12',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('thankYou', {
    url: '/page15',
    templateUrl: 'templates/thankYou.html',
    controller: 'thankYouCtrl'
  })

  .state('reminder2', {
    url: '/page18',
    templateUrl: 'templates/reminder2.html',
    controller: 'reminder2Ctrl'
  })

  .state('petRequests', {
    url: '/page19',
    templateUrl: 'templates/petRequests.html',
    controller: 'petRequestsCtrl'
  })

$urlRouterProvider.otherwise('/page1')

  

});