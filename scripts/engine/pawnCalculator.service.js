'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('pawnCalculator', ['$q', function ($q) {

        var position = {};

        var getBlackMoves = function(fromSquare) {
            if (fromSquare > 55) {
                return $q.when([]);
            }
            var possibleMoves = [];
            var obstruction = '';

            // non-capturing moves
            if (fromSquare < 56) {
                obstruction = position.pieces[fromSquare + 8];
                if (obstruction == '-') {
                    possibleMoves.push(fromSquare + 8);
                    if (fromSquare > 7 && fromSquare < 16) {
                        obstruction = position.pieces[fromSquare + 16];
                        if (obstruction == '-') {
                            possibleMoves.push(fromSquare + 16);
                        }
                    }
                }
            }

            // capturing moves
            if (fromSquare % 8 != 0) {
                obstruction = position.pieces[fromSquare + 7];
                if (obstruction != '-' && obstruction.toUpperCase() == obstruction) {
                    possibleMoves.push(fromSquare + 7);
                }
            }
            if ((fromSquare + 1) % 8 != 0) {
                obstruction = position.pieces[fromSquare + 9];
                if (obstruction != '-' && obstruction.toUpperCase() == obstruction) {
                    possibleMoves.push(fromSquare + 9);
                }
            }

            // TODO: en passant

            return $q.when(possibleMoves);
        };

        var getWhiteMoves = function(fromSquare) {
            // TODO
            return $q.when([]);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare) {
            position = pos;
            var piece = position.pieces[fromSquare];
            if (piece == 'p') {
                return getBlackMoves(fromSquare);
            } else if (piece == 'P') {
                return getWhiteMoves(fromSquare);
            } else {
                return $q.when([]);
            }
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);