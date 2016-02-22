'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('pawnCalculator', ['$q', function ($q) {

        var position = {};

        var getBlackMoves = function(fromSquare) {
            // TODO
            return $q.when([]);
        };

        var getWhiteMoves = function(fromSquare) {
            // TODO
            return $q.when([]);
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare) {
            position = pos;
            var piece = position.pieces[fromSquare];
            if (piece == 'p') {
                return getBlackMoves(fromSquare);
            } else if (piece == 'P') {
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