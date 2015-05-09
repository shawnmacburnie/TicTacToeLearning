'use strict';

/**
 * @ngdoc function
 * @name hackaweek2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackaweek2App
 */
angular.module('hackaweek2App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
