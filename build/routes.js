'use strict';

app.config(function config($urlRouterProvider, $stateProvider) {
  // Home
  $stateProvider.state('home', {
    url: '/'
  });
  $urlRouterProvider.otherwise('/');
});
//# sourceMappingURL=routes.js.map