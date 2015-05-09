'use strict';

angular.module('hackaweek2App')
    .controller('EasyGameController', function($scope, $state) {
        var turn = true,
            numOfFree = 9;
        $scope.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        $scope.boardClicked = function(row, col) {
            if (!$scope.board[row][col]) {
                if (turn) {
                    $scope.board[row][col] = "X";
                    numOfFree--;
                    turn = !turn;
                    computerMove("O");
                } else {
                    $scope.board[row][col] = "O";
                    numOfFree--;
                    turn = !turn;
                    computerMove("X");
                }
            }
        };

        function computerMove(symbol) {
            var move = Math.ceil(Math.random() * numOfFree);
            var freeIter = 0;
            for(var x = 0; x < $scope.board.length;x++) {
                for(var y = 0; y < $scope.board[x].length;y++) {
                    if(!$scope.board[x][y]) {
                        freeIter++;
                        if(freeIter === move) {
                            $scope.board[x][y] = symbol;
                            turn = !turn;
                            numOfFree--;
                            return;
                        }
                    }
                }
            }
            console.log("no valid move found");

        }
    });