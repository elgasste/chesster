'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('bishopCalculator', ['$q', 'indexHelper', function ($q, indexHelper) {

        var position = {};
        var possibleMoves = [];

        var addMoveIfPossible = function(targetSquare, color) {
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || (color == 'b' && obstruction.toUpperCase() == obstruction) || (color == 'w' && obstruction.toLowerCase() == obstruction)) {
                possibleMoves.push(targetSquare);
            }
        };

        var getMovesForColor = function(fromSquare, color) {
            var file = indexHelper.getFileFromIndex(fromSquare);

            var upperPathClear = true;
            var lowerPathClear = true;
            for (var i = file - 1, iter = 1; (i > 0) && (upperPathClear || lowerPathClear); i--, iter++) {
                if (upperPathClear) {
                    var upperLeft = fromSquare - (9 * iter);
                    if (upperLeft >= 0) {
                        addMoveIfPossible(upperLeft, color);
                        upperPathClear = position.pieces[upperLeft] == '-';
                    } else {
                        upperPathClear = false;
                    }
                }
                if (lowerPathClear) {
                    var lowerLeft = fromSquare + (7 * iter);
                    if (lowerLeft <= 63) {
                        addMoveIfPossible(lowerLeft, color);
                        lowerPathClear = position.pieces[lowerLeft] == '-';
                    } else {
                        lowerPathClear = false;
                    }
                }
            }

            upperPathClear = true;
            lowerPathClear = true;
            for (var i = file + 1, iter = 1; (i < 9) && (upperPathClear || lowerPathClear); i++, iter++) {
                if (upperPathClear) {
                    var upperRight = fromSquare - (7 * iter);
                    if (upperRight >= 0) {
                        addMoveIfPossible(upperRight, color);
                        upperPathClear = position.pieces[upperRight] == '-';
                    } else {
                        upperPathClear = false;
                    }
                }
                if (lowerPathClear) {
                    var lowerRight = fromSquare + (9 * iter);
                    if (lowerRight <= 63) {
                        addMoveIfPossible(lowerRight, color);
                        lowerPathClear = position.pieces[lowerRight] == '-';
                    } else {
                        lowerPathClear = false;
                    }
                }
            }

            return $q.when(possibleMoves);
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