'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('standardRuleset', ['$q', 'constants', 'positionHelper', 'pawnCalculator', 'knightCalculator', 'bishopCalculator', 'rookCalculator', 'queenCalculator', 'kingCalculator', function ($q, constants, positionHelper, pawnCalculator, knightCalculator, bishopCalculator, rookCalculator, queenCalculator, kingCalculator) {

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

        var movePieceInString = function(position, fromSquare, toSquare) {
            position.pieces = position.pieces.substr(0, toSquare) + position.pieces[fromSquare] + position.pieces.substr(toSquare+1);
            position.pieces = position.pieces.substr(0, fromSquare) + '-' + position.pieces.substr(fromSquare+1);
        };

        var removeCastlingAbility = function(position, charCode) {
            // TODO
        };

        var detectCastling = function(position, fromSquare, toSquare) {
            if (fromSquare == 4) {
                if (toSquare == 6 && position.pieces[6] == 'k') {
                    positionHelper.movePieceInString(position, 7, 5);
                    removeCastlingAbility('k');
                } else if (toSquare == 2 && position.pieces[2] == 'k') {
                    positionHelper.movePieceInString(position, 0, 3);
                    removeCastlingAbility('q');
                }
            } else if (fromSquare == 60) {
                if (toSquare == 62 && position.pieces[62] == 'K') {
                    positionHelper.movePieceInString(position, 63, 61);
                    removeCastlingAbility('K');
                } else if (toSquare == 58 && position.pieces[58] == 'K') {
                    positionHelper.movePieceInString(position, 56, 59);
                    removeCastlingAbility('Q');
                }
            }
        };

        var movePiece = function(position, fromSquare, toSquare) {
            return getPossibleMovesForSquare(position, fromSquare).then(function(moves) {
                if (moves.indexOf(toSquare) == -1) {
                    console.error('standardRuleset: ' + constants.rulesetErrors.STANDARD_INVALID_MOVE);
                    return $q.reject();
                }

                positionHelper.movePieceInString(position, fromSquare, toSquare);

                detectCastling(position, fromSquare, toSquare);

                position.halfmove++;
                if (position.active == 'b') {
                    position.fullmove++;
                }
                position.active = (position.active == 'w') ? 'b' : 'w';
                // TODO: update castling availability and en passant square

                return $q.when(position);
            })
        };

        return {
            getPossibleMovesForSquare: getPossibleMovesForSquare,
            movePiece: movePiece
        };

    }]);

})(angular);