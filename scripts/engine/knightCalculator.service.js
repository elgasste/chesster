'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('knightCalculator', ['$q', function ($q) {

        var position = {};

        var getBlackMoves = function(fromSquare) {
            // TODO
            var possibleMoves = [];
            return $q.when(possibleMoves);
        };

        var getWhiteMoves = function(fromSquare) {
            // TODO
            var possibleMoves = [];
            return $q.when(possibleMoves);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare) {
            position = pos;
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