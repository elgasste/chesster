'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('standardRuleset', ['$q', 'constants', 'pawnCalculator', 'knightCalculator', 'bishopCalculator', 'rookCalculator', 'queenCalculator', 'kingCalculator', function ($q, constants, pawnCalculator, knightCalculator, bishopCalculator, rookCalculator, queenCalculator, kingCalculator) {

        var getPossibleMovesForSquare = function(position, square) {
            // TODO: this doesn't take checks into consideration at all
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
                // TODO: pass in attack squares for king calculation
                case 'k': return kingCalculator.getPossibleMovesFromSquare(position, square, activeColor, []); break;
                default: return $q.when([]);
            }
        };

        var movePiece = function(position, fromSquare, toSquare) {
            return getPossibleMovesForSquare(position, fromSquare).then(function(moves) {
                if (moves.indexOf(toSquare) == -1) {
                    console.error('standardRuleset: ' + constants.rulesetErrors.STANDARD_INVALID_MOVE);
                    return $q.reject();
                }
                position.pieces = position.pieces.substr(0, toSquare) + position.pieces[fromSquare] + position.pieces.substr(toSquare+1);
                position.pieces = position.pieces.substr(0, fromSquare) + '-' + position.pieces.substr(fromSquare+1);
                // TODO: update active, castling, passant, fullmove, and halfmove
                return $q.when(position);
            })
        };

        return {
            getPossibleMovesForSquare: getPossibleMovesForSquare,
            movePiece: movePiece
        };

    }]);

})(angular);