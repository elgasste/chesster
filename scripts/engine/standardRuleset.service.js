'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('standardRuleset', ['$q', 'pawnCalculator', 'knightCalculator', 'bishopCalculator', 'rookCalculator', 'queenCalculator', 'kingCalculator', function ($q, pawnCalculator, knightCalculator, bishopCalculator, rookCalculator, queenCalculator, kingCalculator) {

        var getPossibleMovesForSquare = function(position, square) {
            var activeColor = position.active;
            var pieceToMove = position.pieces[square];
            if (pieceToMove == '-' || (activeColor == 'w' && pieceToMove.toUpperCase() != pieceToMove) || (activeColor == 'b' && pieceToMove.toLowerCase() != pieceToMove)) {
                return $q.when([]);
            }
            switch(pieceToMove.toLowerCase()) {
                case 'p': return pawnCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'n': return knightCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'b': return bishopCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'r': return rookCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'q': return queenCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'k': return kingCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                default: return $q.when([]);
            }
        };

        return {
            getPossibleMovesForSquare: getPossibleMovesForSquare
        };

    }]);

})(angular);