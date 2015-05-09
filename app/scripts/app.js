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
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('base', {
        url: '/base',
        templateUrl: 'views/header.html',
        controller: 'BaseController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  });
