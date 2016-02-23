'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('standardRuleset', ['$q', 'constants', 'positionHelper', 'algebraicHelper', 'pawnCalculator', 'knightCalculator', 'bishopCalculator', 'rookCalculator', 'queenCalculator', 'kingCalculator', function ($q, constants, positionHelper, algebraicHelper, pawnCalculator, knightCalculator, bishopCalculator, rookCalculator, queenCalculator, kingCalculator) {

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

        var removeCastlingAbility = function(position, charCode) {
            while (position.castling.indexOf(charCode) != -1) {
                var index = position.castling.indexOf(charCode);
                position.castling = position.castling.substr(0, index) + position.castling.substr(index+1);
            }
            if (position.castling.length == 0) {
                position.castling = '-';
            }
        };

        var detectCastling = function(position, fromSquare, toSquare) {
            if (fromSquare == 4) {
                if (toSquare == 6 && position.pieces[6] == 'k') {
                    positionHelper.movePieceInString(position, 7, 5);
                } else if (toSquare == 2 && position.pieces[2] == 'k') {
                    positionHelper.movePieceInString(position, 0, 3);
                }
            } else if (fromSquare == 60) {
                if (toSquare == 62 && position.pieces[62] == 'K') {
                    positionHelper.movePieceInString(position, 63, 61);
                } else if (toSquare == 58 && position.pieces[58] == 'K') {
                    positionHelper.movePieceInString(position, 56, 59);
                }
            }
        };

        var updateCastlingFlags = function(position, fromSquare) {
            switch(fromSquare) {
                case 0: removeCastlingAbility(position, 'q'); break;
                case 4: removeCastlingAbility(position, 'q');
                        removeCastlingAbility(position, 'k');
                        break;
                case 7: removeCastlingAbility(position, 'k'); break;
                case 56: removeCastlingAbility(position, 'Q'); break;
                case 60: removeCastlingAbility(position, 'Q');
                         removeCastlingAbility(position, 'K');
                         break;
                case 63: removeCastlingAbility(position, 'K'); break;
            }
        };

        var detectEnPassant = function(position, fromSquare, toSquare) {
            if (position.pieces[toSquare] == 'p' && fromSquare == (toSquare - 16)) {
                position.passant = algebraicHelper.getAlgebraicFromIndex(toSquare - 8);
            } else if (position.pieces[toSquare] == 'P' && fromSquare == (toSquare + 16)) {
                position.passant = algebraicHelper.getAlgebraicFromIndex(toSquare + 8);
            } else {
                position.passant = '-';
            }
        };

        var movePiece = function(position, fromSquare, toSquare) {
            // TODO: add a function that detects if the king is in check.
            return getPossibleMovesForSquare(position, fromSquare).then(function(moves) {
                // TODO: for each of these moves, see if it leaves the king in check
                if (moves.indexOf(toSquare) == -1) {
                    console.error('standardRuleset: ' + constants.rulesetErrors.STANDARD_INVALID_MOVE);
                    return $q.reject();
                }

                positionHelper.movePieceInString(position, fromSquare, toSquare);

                detectCastling(position, fromSquare, toSquare);
                updateCastlingFlags(position, fromSquare);
                detectEnPassant(position, fromSquare, toSquare);

                position.active = (position.active == 'w') ? 'b' : 'w';
                position.halfmove++;
                if (position.active == 'w') {
                    position.fullmove++;
                }

                return $q.when(position);
            })
        };

        return {
            getPossibleMovesForSquare: getPossibleMovesForSquare,
            movePiece: movePiece
        };

    }]);

})(angular);