'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('knightCalculator', ['$q', 'indexHelper', function ($q, indexHelper) {

        var position = {};
        var possibleMoves = [];

        var addBlackMoveIfPossible = function(targetSquare) {
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || obstruction.toUpperCase() == obstruction) {
                possibleMoves.push(targetSquare);
            }
        };

        var getBlackMoves = function(fromSquare) {
            var fromRank = indexHelper.getRankFromIndex(fromSquare);
            var fromFile = indexHelper.getFileFromIndex(fromSquare);

            if (fromRank < 8) {
                if (fromFile > 1) addBlackMoveIfPossible(fromSquare - 10);
                if (fromFile < 7) addBlackMoveIfPossible(fromSquare - 6);
            }
            if (fromRank < 7) {
                if (fromFile > 1) addBlackMoveIfPossible(fromSquare - 17);
                if (fromFile < 8) addBlackMoveIfPossible(fromSquare - 15);
            }
            if (fromRank > 2) {
                if (fromFile > 1) addBlackMoveIfPossible(fromSquare + 15);
                if (fromFile < 8) addBlackMoveIfPossible(fromSquare + 17);
            }
            if (fromRank > 1) {
                if (fromFile > 1) addBlackMoveIfPossible(fromSquare + 6);
                if (fromFile < 7) addBlackMoveIfPossible(fromSquare + 10);
            }

            return $q.when(possibleMoves);
        };

        var getWhiteMoves = function(fromSquare) {
            // TODO
            return $q.when(possibleMoves);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare) {
            position = pos;
            possibleMoves = [];
            var piece = position.pieces[fromSquare];
            if (piece == 'n') {
                return getBlackMoves(fromSquare);
            } else if (piece == 'N') {
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