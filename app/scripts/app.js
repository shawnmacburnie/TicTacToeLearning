'use strict';

/**
 * @ngdoc overview
 * @name hackaweek2App
 * @description
 * # hackaweek2App
 *
 * Main module of the application.
 */
angular
  .module('hackaweek2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'restangular'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/about');
    $stateProvider
      .state('base', {
        url: '/',
        templateUrl: 'views/header.html',
        controller: 'BaseController'
      })
      .state('base.about', {
        url: '^/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('base.easyGame', {
        url: '^/easy',
        templateUrl: 'views/easyGame.html',
        controller: 'EasyGameController'
      })
      .state('base.hardGame', {
        url: '^/hard',
        templateUrl: 'views/hardGame.html',
        controller: 'HardGameController'
      });
  })
  .run(function(Restangular) {
    Restangular.setBaseUrl('http://mjong-dev.compilr.com');
  });