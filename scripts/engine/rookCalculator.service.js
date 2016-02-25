'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('rookCalculator', ['indexHelper', function (indexHelper) {

        var position = {};
        var possibleMoves = [];

        var addMoveIfPossible = function(targetSquare, color) {
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || (color == 'b' && obstruction.toUpperCase() == obstruction) || (color == 'w' && obstruction.toLowerCase() == obstruction)) {
                possibleMoves.push(targetSquare);
            }
        };

        var getMovesForColor = function(fromSquare, color) {
            var rank = indexHelper.getRankFromIndex(fromSquare);
            var file = indexHelper.getFileFromIndex(fromSquare);

            for (var i = rank - 1, iter = 1; i > 0; i--, iter++) {
                var targetSquare = fromSquare + (8 * iter);
                addMoveIfPossible(targetSquare, color);
                if (position.pieces[targetSquare] != '-') {
                    break;
                }
            }
            for (var i = rank + 1, iter = 1; i < 9; i++, iter++) {
                var targetSquare = fromSquare - (8 * iter);
                addMoveIfPossible(targetSquare, color);
                if (position.pieces[targetSquare] != '-') {
                    break;
                }
            }
            for (var i = file - 1, iter = 1; i > 0; i--, iter++) {
                var targetSquare = fromSquare - iter;
                addMoveIfPossible(targetSquare, color);
                if (position.pieces[targetSquare] != '-') {
                    break;
                }
            }
            for (var i = file + 1, iter = 1; i < 9; i++, iter++) {
                var targetSquare = fromSquare + iter;
                addMoveIfPossible(targetSquare, color);
                if (position.pieces[targetSquare] != '-') {
                    break;
                }
            }

            return possibleMoves;
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare, color) {
            position = pos;
            possibleMoves = [];
            return getMovesForColor(fromSquare, color);
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);