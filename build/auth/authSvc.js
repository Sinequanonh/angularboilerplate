'use strict';

app.service('authSvc', function ($http, $localStorage, $rootScope, cfg) {
  console.log('Auth Service');
  var service = {};

  // Login
  // ==========================================
  function Login(email, password, callback) {
    var params = {
      email: email,
      password: password
    };

    $http.get(cfg.url + ':' + cfg.port + '/api/signin', { params: params }).then(function (response) {
      if (response.data.token_session) {
        $localStorage.currentUser = {
          email: email,
          token: response.data.token_session
        };
        $rootScope.currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token_session;
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  // Logout
  // ==========================================
  function Logout() {
    delete $localStorage.currentUser;
    delete $rootScope.currentUser;
    $http.defaults.headers.common.Authorization = '';
  }

  function Register(params, callback) {
    $http.post(cfg.url + ':' + cfg.port + '/api/register', { params: params }).then(function (response) {
      if (response.data.token_session) {
        $localStorage.currentUser = {
          email: params.email,
          token: response.data.token_session
        };
        $rootScope.currentUser = $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token_session;
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  service.Login = Login;
  service.Logout = Logout;
  service.Register = Register;

  return service;
});