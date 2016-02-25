'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('kingCalculator', ['indexHelper', function (indexHelper) {

        var position = {};
        var possibleMoves = [];
        var dangerZones = [];

        var addMoveIfPossible = function(targetSquare, color) {
            if (dangerZones.indexOf(targetSquare) != -1) {
                return;
            }
            var obstruction = position.pieces[targetSquare];
            if (obstruction == '-' || (color == 'b' && obstruction.toUpperCase() == obstruction) || (color == 'w' && obstruction.toLowerCase() == obstruction)) {
                possibleMoves.push(targetSquare);
            }
        };

        var tryKingsideCastling = function(fromSquare, color) {
            var safetySquares = [];
            if (color == 'b') {
                if (position.pieces[4] != 'k' || position.pieces[7] != 'r' || position.pieces[5] != '-' || position.pieces[6] != '-') {
                    return;
                }
                safetySquares = [4, 5, 6];
            } else {
                if (position.pieces[60] != 'K' || position.pieces[63] != 'R' || position.pieces[61] != '-' || position.pieces[62] != '-') {
                    return;
                }
                safetySquares = [60, 61, 62];
            }

            for (var i = 0; i < safetySquares.length; i++) {
                if (dangerZones.indexOf(safetySquares[i]) != -1) {
                    return;
                }
            }

            possibleMoves.push(color == 'b' ? 6 : 62);
        };

        var tryQueensideCastling = function(fromSquare, color) {
            var safetySquares = [];
            if (color == 'b') {
                if (position.pieces[4] != 'k' || position.pieces[0] != 'r' || position.pieces[1] != '-' || position.pieces[2] != '-' || position.pieces[3] != '-') {
                    return;
                }
                safetySquares = [2, 3, 4];
            } else {
                if (position.pieces[60] != 'K' || position.pieces[56] != 'R' || position.pieces[57] != '-' || position.pieces[58] != '-' || position.pieces[59] != '-') {
                    return;
                }
                safetySquares = [58, 59, 60];
            }

            for (var i = 0; i < safetySquares.length; i++) {
                if (dangerZones.indexOf(safetySquares[i]) != -1) {
                    return;
                }
            }

            possibleMoves.push(color == 'b' ? 2 : 58);
        };

        var getMovesForColor = function(fromSquare, color) {
            var rank = indexHelper.getRankFromIndex(fromSquare);
            var file = indexHelper.getFileFromIndex(fromSquare);

            // non-castling moves
            if (rank > 1) {
                addMoveIfPossible(fromSquare + 8, color);
                if (file > 1) addMoveIfPossible(fromSquare + 7, color);
                if (file < 8) addMoveIfPossible(fromSquare + 9, color);
            }
            if (rank < 8) {
                addMoveIfPossible(fromSquare - 8, color);
                if (file > 1) addMoveIfPossible(fromSquare - 9, color);
                if (file < 8) addMoveIfPossible(fromSquare - 7, color);
            }
            if (file > 1) addMoveIfPossible(fromSquare - 1, color);
            if (file < 8) addMoveIfPossible(fromSquare + 1, color);

            // castling moves
            if (position.castling.indexOf(color == 'w' ? 'K' : 'k') != -1) {
                tryKingsideCastling(fromSquare, color);
            }
            if (position.castling.indexOf(color == 'w' ? 'Q' : 'q') != -1) {
                tryQueensideCastling(fromSquare, color);
            }

            return possibleMoves;
        };

        var getPossibleMovesFromSquare = function(pos, fromSquare, color, attackedSquares) {
            position = pos;
            possibleMoves = [];
            dangerZones = attackedSquares;
            return getMovesForColor(fromSquare, color);
        };

        return {
            getPossibleMovesFromSquare: getPossibleMovesFromSquare
        };

    }]);

})(angular);