'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('standardRuleset', ['$q', 'constants', 'positionHelper', 'algebraicHelper', 'pawnCalculator', 'knightCalculator', 'bishopCalculator', 'rookCalculator', 'queenCalculator', 'kingCalculator', function ($q, constants, positionHelper, algebraicHelper, pawnCalculator, knightCalculator, bishopCalculator, rookCalculator, queenCalculator, kingCalculator) {

        var moveCache = [];
        var capturedPiece = '-';

        var getCalculatedMoves = function(position, square, piece, activeColor, dangerSquares) {
            switch(piece.toLowerCase()) {
                case 'p': return pawnCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'n': return knightCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'b': return bishopCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'r': return rookCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'q': return queenCalculator.getPossibleMovesFromSquare(position, square, activeColor); break;
                case 'k': return kingCalculator.getPossibleMovesFromSquare(position, square, activeColor, dangerSquares); break;
                default: return [];
            }
        };

        var getDangerSquares = function(position, color) {
            var dangerSquares = [];
            for (var i = 0; i < position.pieces.length; i++) {
                var piece = position.pieces[i];
                if (piece != '-' && ((color == 'w' && piece.toUpperCase() == piece) || (color == 'b' && piece.toLowerCase() == piece))) {
                    var moves = getCalculatedMoves(position, i, piece, color, []);
                    for (var j = 0; j < moves.length; j++) {
                        if (dangerSquares.indexOf(moves[j]) == -1) {
                            dangerSquares.push(moves[j]);
                        }
                    }
                }
            }
            return dangerSquares;
        };

        // TODO: add a checkmate check
        var isKingInCheck = function(position, color) {
            var dangerSquares = getDangerSquares(position, (color == 'w') ? 'b' : 'w');
            var king = (color == 'w') ? 'K' : 'k';
            for (var i = 0; i < position.pieces.length; i++) {
                if (position.pieces[i] == king) {
                    return (dangerSquares.indexOf(i) != -1);
                }
            }
            return false;
        };

        var getPossibleMovesForSquare = function(position, square) {
            var activeColor = position.active;
            var pieceToMove = position.pieces[square];
            if (pieceToMove == '-' || (activeColor == 'w' && pieceToMove.toUpperCase() != pieceToMove) || (activeColor == 'b' && pieceToMove.toLowerCase() != pieceToMove)) {
                return [];
            }
            var dangerSquares = getDangerSquares(position, (activeColor == 'w') ? 'b' : 'w');
            var moves = getCalculatedMoves(position, square, pieceToMove, activeColor, dangerSquares);

            moveCache = [];
            for (var i = 0; i < moves.length; i++) {
                var positionCopy = positionHelper.copyPosition(position);
                movePiece(positionCopy, square, moves[i]);
                if (!isKingInCheck(positionCopy, activeColor)) {
                    moveCache.push(moves[i]);
                }
            }

            return moveCache;
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
            if (position.passant == '-' || (position.pieces[toSquare] != 'p' && position.pieces[toSquare != 'P'])) {
                return;
            }
            var passantIndex = algebraicHelper.getIndexFromAlgebraic(position.passant);
            if (toSquare == passantIndex) {
                console.log('en passant!');
                if (position.pieces[toSquare] == 'p') {
                    capturedPiece = 'P';
                    positionHelper.removePieceInString(position, toSquare - 8);
                } else {
                    capturedPiece = 'p';
                    positionHelper.removePieceInString(position, toSquare + 8);
                }
            }
        };

        var updateEnPassantFlag = function(position, fromSquare, toSquare) {
            if (position.pieces[toSquare] == 'p' && fromSquare == (toSquare - 16)) {
                position.passant = algebraicHelper.getAlgebraicFromIndex(toSquare - 8);
            } else if (position.pieces[toSquare] == 'P' && fromSquare == (toSquare + 16)) {
                position.passant = algebraicHelper.getAlgebraicFromIndex(toSquare + 8);
            } else {
                position.passant = '-';
            }
        };

        var movePiece = function(position, fromSquare, toSquare) {
            positionHelper.movePieceInString(position, fromSquare, toSquare);
            detectCastling(position, fromSquare, toSquare);
            detectEnPassant(position, fromSquare, toSquare);
        };

        var makeMove = function(position, fromSquare, toSquare) {
            if (moveCache.length == 0) {
                getPossibleMovesForSquare(position, fromSquare);
            }
            if (moveCache.indexOf(toSquare) == -1) {
                console.error('standardRuleset: ' + constants.rulesetErrors.STANDARD_INVALID_MOVE);
                return $q.reject();
            }

            var movedPiece = position.pieces[fromSquare];
            capturedPiece = position.pieces[toSquare];

            // TODO: this doesn't account for pawn promotion
            movePiece(position, fromSquare, toSquare);
            updateCastlingFlags(position, fromSquare);
            updateEnPassantFlag(position, fromSquare, toSquare);

            var isPawnMove = position.pieces[toSquare] == 'p' || position.pieces[toSquare] == 'P';
            if (capturedPiece != '-' || isPawnMove) {
                position.halfmove = 0;
            } else {
                position.halfmove++;
            }

            position.active = (position.active == 'w') ? 'b' : 'w';
            if (position.active == 'w') {
                position.fullmove++;
            }

            moveCache = [];
            return $q.when({position: position, from: fromSquare, to: toSquare, moved: movedPiece, captured: capturedPiece});
        };

        return {
            getPossibleMovesForSquare: getPossibleMovesForSquare,
            makeMove: makeMove
        };

    }]);

})(angular);