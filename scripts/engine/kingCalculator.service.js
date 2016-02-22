'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('kingCalculator', ['$q', 'indexHelper', function ($q, indexHelper) {

        var position = {};
        var possibleMoves = [];
        var dangerZones = [];

        var addMoveIfPossible = function(targetSquare, color) {
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || (color == 'b' && obstruction.toUpperCase() == obstruction) || (color == 'w' && obstruction.toLowerCase() == obstruction)) {
                possibleMoves.push(targetSquare);
            }
        };

        var getMovesForColor = function(fromSquare, color) {
            var rank = indexHelper.getRankFromIndex(fromSquare);
            var file = indexHelper.getFileFromIndex(fromSquare);

            // non-castling moves
            if (rank > 1) {
                addMoveIfPossible(fromSquare + 8, color);
                if (file > 1) addMoveIfPossible(fromSquare + 7, color);
                if (file < 8) addMoveIfPossible(fromSquare + 9, color);
            }
            if (rank < 8) {
                addMoveIfPossible(fromSquare - 8, color);
                if (file > 1) addMoveIfPossible(fromSquare - 9, color);
                if (file < 8) addMoveIfPossible(fromSquare - 7, color);
            }
            if (file > 1) addMoveIfPossible(fromSquare - 1, color);
            if (file < 8) addMoveIfPossible(fromSquare + 1, color);

            return $q.when(possibleMoves);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare, color, attackedSquares) {
            position = pos;
            possibleMoves = [];
            dangerZones = attackedSquares;
            return getMovesForColor(fromSquare, color);
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);