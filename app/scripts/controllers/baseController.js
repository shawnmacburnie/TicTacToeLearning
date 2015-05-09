'use strict';

angular.module('hackaweek2App')
  .controller('BaseController', function ($scope, $state) {
    $('.dropdown-toggle').dropdown();
        $scope.headerViews = {
            calendar: false,
            analytics: false,
            account: false,
            support: false,
            messaging: false,
            pendingStatus: false,
            timeSlots: false
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

        var turn = true;
        $scope.board = [["","",""],["","",""],["","",""]]
        $scope.boardClicked = function(row, col){
            if (!$scope.board[row][col]) {
                if (turn) {
                    $scope.board[row][col] = "X";
                    turn = !turn;
                } else {
                    $scope.board[row][col] = "O";
                    turn = !turn;
                }
            }
        };
  });
