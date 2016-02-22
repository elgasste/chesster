'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('pawnCalculator', ['$q', 'algebraicHelper', function ($q, algebraicHelper) {

        var position = {};

        var getBlackMoves = function(fromSquare) {
            if (fromSquare > 55) {
                return $q.when([]);
            }
            var possibleMoves = [];

            // non-capturing moves
            var obstruction = position.pieces[fromSquare + 8];
            if (obstruction == '-') {
                possibleMoves.push(fromSquare + 8);
                if (fromSquare > 7 && fromSquare < 16) {
                    obstruction = position.pieces[fromSquare + 16];
                    if (obstruction == '-') {
                        possibleMoves.push(fromSquare + 16);
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

            // en passant
            if (position.passant != '-' && fromSquare > 31 && fromSquare < 40) {
                var passantSquare = algebraicHelper.getSquareIndexFromAlgebraic(position.passant);
                if (passantSquare == fromSquare + 7 || passantSquare == fromSquare + 9) {
                    possibleMoves.push(passantSquare);
                }
            }

            return $q.when(possibleMoves);
        };

        var getWhiteMoves = function(fromSquare) {
            if (fromSquare < 8) {
                return $q.when([]);
            }
            var possibleMoves = [];

            // non-capturing moves
            var obstruction = position.pieces[fromSquare - 8];
            if (obstruction == '-') {
                possibleMoves.push(fromSquare - 8);
                if (fromSquare > 47 && fromSquare < 56) {
                    obstruction = position.pieces[fromSquare - 16];
                    if (obstruction == '-') {
                        possibleMoves.push(fromSquare - 16);
                    }
                }
            }

            // capturing moves
            if (fromSquare % 8 != 0) {
                obstruction = position.pieces[fromSquare - 7];
                if (obstruction != '-' && obstruction.toLowerCase() == obstruction) {
                    possibleMoves.push(fromSquare - 7);
                }
            }
            if ((fromSquare + 1) % 8 != 0) {
                obstruction = position.pieces[fromSquare - 9];
                if (obstruction != '-' && obstruction.toLowerCase() == obstruction) {
                    possibleMoves.push(fromSquare - 9);
                }
            }

            // en passant
            if (position.passant != '-' && fromSquare > 23 && fromSquare < 32) {
                var passantSquare = algebraicHelper.getSquareIndexFromAlgebraic(position.passant);
                if (passantSquare == fromSquare - 7 || passantSquare == fromSquare - 9) {
                    possibleMoves.push(passantSquare);
                }
            }

            return $q.when(possibleMoves);
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