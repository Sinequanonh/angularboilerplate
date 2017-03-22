app.controller('loginCtrl', function($scope, $http, $rootScope, $location, authSvc) {

  $scope.email = 'test@example.com'
  $scope.password = 'test'

  $scope.Login = function() {
    authSvc.Login($scope.email, $scope.password, function(result) {
      if (result === true) {
        $location.path('/')
      }
    })
  }

  authSvc.Logout()
})