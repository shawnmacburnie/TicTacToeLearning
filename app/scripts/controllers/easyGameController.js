'use strict';

angular.module('hackaweek2App')
    .controller('EasyGameController', function($scope, $timeout) {
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
                board[0].join('') === symbols ||
                board[1].join('') === symbols ||
                board[0][0] + board[1][0] + board[2][0] === symbols ||
                board[0][1] + board[1][1] + board[2][1] === symbols ||
                board[0][2] + board[1][2] + board[2][2] === symbols ||
                board[0][0] + board[1][1] + board[2][2] === symbols ||
                board[0][2] + board[1][1] + board[2][0] === symbols;
        }

        function computerMove(symbol) {
            var move = Math.ceil(Math.random() * numOfFree);
            var freeIter = 0;
            for (var x = 0; x < $scope.board.length; x++) {
                for (var y = 0; y < $scope.board[x].length; y++) {
                    if (!$scope.board[x][y]) {
                        freeIter++;
                        if (freeIter === move) {
                            $scope.board[x][y] = symbol;
                            turn = !turn;
                            numOfFree--;
                            return false;
                        }
                    }
                }
            }
            console.log("no valid move found");
            return true;
        }
    });