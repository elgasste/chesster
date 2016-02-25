'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('algebraicHelper', [function () {

        var getIndexFromAlgebraic = function(algebraic) {
            var file = algebraic[0].toLowerCase().charCodeAt(0) - 97;
            var rank = 8 - parseInt(algebraic[1]);
            return file + (rank * 8);
        };

        var getAlgebraicFromIndex = function(index) {
            var numericRank = parseInt(index / 8);
            var file = String.fromCharCode(index - (numericRank * 8) + 97);
            return file + (8 - numericRank);
        };

        var getAlgebraicMove = function(fromSquare, toSquare, movedPiece, isCapture) {
            // TODO: this doesn't account for check or checkmate
            var algebraicString = '';
            var toNumericRank = parseInt(toSquare / 8);
            var toRank = 8 - toNumericRank;
            var toFile = String.fromCharCode(toSquare - (toNumericRank * 8) + 97);

            if (movedPiece == 'p' || movedPiece == 'P') {
                if (isCapture) {
                    var fromFile = String.fromCharCode(fromSquare - (parseInt(fromSquare / 8) * 8) + 97);
                    algebraicString += fromFile + 'x';
                }
                // TODO: pawn promotion
                algebraicString += toFile + toRank;
            } else if ((movedPiece == 'k' || movedPiece == 'K') && toSquare == (fromSquare - 2)) {
                algebraicString = '0-0-0';
            } else if ((movedPiece == 'k' || movedPiece == 'K') && toSquare == (fromSquare + 2)) {
                algebraicString = '0-0';
            } else {
                algebraicString += movedPiece.toUpperCase();
                // TODO: check if there's another matching piece that could be moved to this square
                if (isCapture) {
                    algebraicString += 'x';
                }
                algebraicString += toFile + toRank;
            }

            return algebraicString;
        };

        return {
            getIndexFromAlgebraic: getIndexFromAlgebraic,
            getAlgebraicFromIndex: getAlgebraicFromIndex,
            getAlgebraicMove: getAlgebraicMove
        };

    }]);

})(angular);