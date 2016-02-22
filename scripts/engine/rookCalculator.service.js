'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('rookCalculator', ['$q', function ($q) {

        var position = {};
        var possibleMoves = [];

        var addMoveIfPossible = function(targetSquare, color) {
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || (color == 'b' && obstruction.toUpperCase() == obstruction) || (color == 'w' && obstruction.toLowerCase() == obstruction)) {
                possibleMoves.push(targetSquare);
            }
        };

        var getMovesForColor = function(fromSquare, color) {
            // TODO
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