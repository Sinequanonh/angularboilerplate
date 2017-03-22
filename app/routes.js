app.config(function config($urlRouterProvider, $stateProvider) {

  $stateProvider.state('home', {
    url: '/',
    controller: 'homeCtrl',
    templateUrl: 'app/home/home.html',
  })

  $stateProvider.state('login', {
    url: '/login',
    controller: 'homeCtrl',
    templateUrl: 'app/auth/login/login.html',
  })
  
  $urlRouterProvider.otherwise('/')
})
