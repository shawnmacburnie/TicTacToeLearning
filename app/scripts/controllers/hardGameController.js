'use strict';

angular.module('hackaweek2App')
    .controller('HardGameController', function($scope, $timeout,Restangular) {
        var turn,
            numOfFree;

        function initiBoard() {
            $scope.board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ];
            turn = true;
            numOfFree = 9;
        }
        initiBoard();
        $scope.boardClicked = function(row, col) {
            if (!$scope.board[row][col]) {
                if (turn) {
                    $scope.board[row][col] = "X";
                    turn = !turn;
                    $timeout(function() {
                        if (checkIfWon("XXX")) {
                            alert("You Won!");
                            initiBoard();
                            return;
                        }
                        numOfFree--;
                        computerMove("O");
                        $timeout(function() {
                            if (checkIfWon("OOO")) {
                                alert("Sorry, you lost!");
                                initiBoard();
                                return;
                            }
                        }, 100);
                    }, 100);
                } else {
                    $scope.board[row][col] = "O";
                    if (checkIfWon("XXX")) {
                        alert("You Won!");
                        initiBoard();
                    }
                    numOfFree--;
                    turn = !turn;
                    computerMove("X");
                    if (checkIfWon("XXX")) {
                        alert("Sorry, you lost!");
                        initiBoard();
                    }
                }
            }
        };

        function checkIfWon(symbols) {
            var board = $scope.board;
            return board[0].join('') === symbols ||
                board[1].join('') === symbols ||
                board[2].join('') === symbols ||
                board[0][0] + board[1][0] + board[2][0] === symbols ||
                board[0][1] + board[1][1] + board[2][1] === symbols ||
                board[0][2] + board[1][2] + board[2][2] === symbols ||
                board[0][0] + board[1][1] + board[2][2] === symbols ||
                board[0][2] + board[1][1] + board[2][0] === symbols;
        }

        function computerMove(symbol) {
            var moves = []
            var index = 0;
            for(var x=0;x <$scope.board.length;x++) {
                for(var y=0;y <$scope.board.length;y++) {
                    if($scope.board[x][y]) {
                        moves[index] = ($scope.board[x][y] === "X" ? 1 : -1)
                        index++;
                    } else {
                        moves[index] = 0
                        index++;
                    }
                }
            }
            Restangular.service('get-move/' + 1).post({'moves': moves}).then(function(res,err) {
                console.log(res);
            });
            console.log("no valid move found");
            return true;
        }
    });



