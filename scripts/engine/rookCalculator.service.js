'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('rookCalculator', ['$q', 'indexHelper', function ($q, indexHelper) {

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

            return $q.when(possibleMoves);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare) {
            position = pos;
            possibleMoves = [];
            var piece = position.pieces[fromSquare];
            if (piece == 'r') {
                return getMovesForColor(fromSquare, 'b');
            } else if (piece == 'R') {
                return getMovesForColor(fromSquare, 'w');
            } else {
                return $q.when([]);
            }
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);