'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('queenCalculator', ['bishopCalculator', 'rookCalculator', function (bishopCalculator, rookCalculator) {

        var getPossibleMovesFromSquare = function(position, fromSquare, color) {
            var bishopMoves = bishopCalculator.getPossibleMovesFromSquare(position, fromSquare, color);
            var rookMoves = rookCalculator.getPossibleMovesFromSquare(position, fromSquare, color);
            return bishopMoves.concat(rookMoves);
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);