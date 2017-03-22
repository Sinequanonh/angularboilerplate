app.service('authSvc', function($http, $localStorage) {
  console.log('Auth Service')
  var service = {}

  function Login(email, password, callback) {

    var params = {
      email: email,
      password: password,
    }

    $http.get('http://127.0.0.1' + ':8789/api/signin', { params: params })
      .then(function(response) {
        if (response.data.token_session) {
          $localStorage.currentUser = {
            email: email,
            token: response.data.token_session,
          }
          $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token_session
          callback(true)
        } else {
          callback(false)
        }
      })
  }

 function Logout() {
    delete $localStorage.currentUser
    $http.defaults.headers.common.Authorization = ''
  }

  service.Login = Login
  service.Logout = Logout

  return service
})
