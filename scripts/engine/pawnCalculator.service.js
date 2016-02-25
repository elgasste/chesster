'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('pawnCalculator', ['algebraicHelper', function (algebraicHelper) {

        var position = {};

        var getBlackMoves = function(fromSquare) {
            if (fromSquare > 55) {
                return [];
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
                var passantSquare = algebraicHelper.getIndexFromAlgebraic(position.passant);
                if (passantSquare == fromSquare + 7 || passantSquare == fromSquare + 9) {
                    possibleMoves.push(passantSquare);
                }
            }

            return possibleMoves;
        };

        var getWhiteMoves = function(fromSquare) {
            if (fromSquare < 8) {
                return [];
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
                var passantSquare = algebraicHelper.getIndexFromAlgebraic(position.passant);
                if (passantSquare == fromSquare - 7 || passantSquare == fromSquare - 9) {
                    possibleMoves.push(passantSquare);
                }
            }

            return possibleMoves;
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare, color) {
            position = pos;
            if (color == 'b') {
                return getBlackMoves(fromSquare);
            } else {
                return getWhiteMoves(fromSquare);
            }
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);