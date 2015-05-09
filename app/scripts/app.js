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
    'ui.bootstrap'
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
      });
  });