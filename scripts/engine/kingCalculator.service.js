'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('kingCalculator', ['$q', function ($q) {

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