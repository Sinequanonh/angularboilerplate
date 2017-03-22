app.controller('homeCtrl', function ($scope, $location, authSvc) {
  console.log('home Controller')

  $scope.email = 'test@example.com'
  $scope.password = 'test'

  $scope.Login = function() {
    authSvc.Login($scope.email, $scope.password, function(result) {
      console.log(result)
      if (result === true) {
        $location.path('/')
      }
    })
  }

  $scope.Logout = function() {
    console.log('Logout')
    authSvc.Logout()
  }
})