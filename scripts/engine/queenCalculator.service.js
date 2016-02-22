'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('queenCalculator', ['$q', 'bishopCalculator', 'rookCalculator', function ($q, bishopCalculator, rookCalculator) {

        var getPossibleMovesFromSquare = function(position, fromSquare, color) {
            return bishopCalculator.getPossibleMovesFromSquare(position, fromSquare, color).then(function(bishopMoves) {
                return rookCalculator.getPossibleMovesFromSquare(position, fromSquare, color).then(function(rookMoves) {
                    return $q.when(bishopMoves.concat(rookMoves));
                })
            });
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);