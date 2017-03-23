const app = angular.module('app', ['ui.router', 'ngStorage'])
.constant('cfg', {
  url: 'http://127.0.0.1',
  port: 8787
})
.config(config)
.run(run)
