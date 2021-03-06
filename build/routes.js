'use strict';

function config($urlRouterProvider, $stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: 'app/home/home.html'
  });

  $stateProvider.state('login', {
    url: '/login',
    controller: 'loginCtrl',
    templateUrl: 'app/login/login.html'
  });

  $stateProvider.state('register', {
    url: '/register',
    controller: 'registerCtrl',
    templateUrl: 'app/register/register.html'
  });

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    controller: 'homeCtrl',
    templateUrl: 'app/dashboard/dashboard.html'
  });

  $urlRouterProvider.otherwise('/');
}

function run($rootScope, $http, $location, $localStorage) {
  if ($localStorage.currentUser) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
  }

  $rootScope.currentUser = $localStorage.currentUser;

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    var publicPages = ['/', '/login', '/register'];
    var restrictedPage = publicPages.indexOf($location.path()) === -1;
    if (restrictedPage && !$localStorage.currentUser) {
      $location.path('/login');
    }
  });
}