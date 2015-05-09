'use strict';

/**
 * @ngdoc function
 * @name hackaweek2App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hackaweek2App
 */
angular.module('hackaweek2App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
