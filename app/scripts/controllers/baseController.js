'use strict';

angular.module('hackaweek2App')
    .controller('BaseController', function($scope, $state) {
        $('.dropdown-toggle').dropdown();
        $scope.headerViews = {
            calendar: false,
        };

        $scope.changeState = function(state) {
            $state.go('base.' + state);
        };

        $scope.setView = function(key) {
            for (var i in $scope.headerViews) {
                if (key === i) {
                    $scope.headerViews[i] = true;
                } else {
                    $scope.headerViews[i] = false;
                }
            }
        };
    });