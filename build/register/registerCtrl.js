'use strict';

app.controller('registerCtrl', function ($scope, $location, authSvc) {

  console.log('Register Controller');

  $scope.newUser = {
    ip: '1.1.1.1'
  };

  $scope.Register = function () {
    authSvc.Register($scope.newUser, function (result) {
      if (result === true) {
        $location.path('/');
      }
    });
  };

  authSvc.Logout();
});