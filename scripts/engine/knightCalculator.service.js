'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('knightCalculator', ['$q', 'indexHelper', function ($q, indexHelper) {

        var position = {};
        var possibleMoves = [];

        var addMoveIfPossible = function(targetSquare, color) {
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || (color == 'b' && obstruction.toUpperCase() == obstruction) || (color == 'w' && obstruction.toLowerCase() == obstruction)) {
                possibleMoves.push(targetSquare);
            }
        };

        var getMovesForColor = function(fromSquare, color) {
            var fromRank = indexHelper.getRankFromIndex(fromSquare);
            var fromFile = indexHelper.getFileFromIndex(fromSquare);

            if (fromRank < 8) {
                if (fromFile > 1) addMoveIfPossible(fromSquare - 10, color);
                if (fromFile < 7) addMoveIfPossible(fromSquare - 6, color);
            }
            if (fromRank < 7) {
                if (fromFile > 1) addMoveIfPossible(fromSquare - 17, color);
                if (fromFile < 8) addMoveIfPossible(fromSquare - 15, color);
            }
            if (fromRank > 2) {
                if (fromFile > 1) addMoveIfPossible(fromSquare + 15, color);
                if (fromFile < 8) addMoveIfPossible(fromSquare + 17, color);
            }
            if (fromRank > 1) {
                if (fromFile > 1) addMoveIfPossible(fromSquare + 6, color);
                if (fromFile < 7) addMoveIfPossible(fromSquare + 10, color);
            }

            return $q.when(possibleMoves);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare) {
            position = pos;
            possibleMoves = [];
            var piece = position.pieces[fromSquare];
            if (piece.toLowerCase() == piece) {
                return getMovesForColor(fromSquare, 'b');
            } else {
                return getMovesForColor(fromSquare, 'w');
            }
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);