'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('fenHelper', ['$q', 'errorStrings', function ($q, errorStrings) {

        var parseFenArray = function(fenString) {
            var fenSections = fenString.trim().split(' ');
            if (fenSections.length != 6)
                return $q.reject(errorStrings.FEN_SECTIONS_INCORRECT);
            return $q.when(fenSections);
        };

        var parsePieces = function(position, piecesString) {
            // TODO
            return $q.reject('not implemented');
        };

        var parseActive = function(position, activeString) {
            var activePiece = activeString.toLowerCase();
            if (activePiece == 'w' || activePiece == 'b') {
                position.active = activePiece;
                return $q.when();
            } else {
                return $q.reject(errorStrings.FEN_ACTIVE_INCORRECT);
            }
        };

        var parseCastling = function(position, castlingString) {
            if (castlingString == '-') {
                position.castling = '-';
                return $q.when();
            }

            var piecePool = ['K', 'Q', 'k', 'q'];
            var castling = "";
            for (var i = 0; i < piecePool.length; i++) {
                var idx = castlingString.indexOf(piecePool[i]);
                if (idx != -1) {
                    castling += piecePool[i];
                    castlingString = castlingString.replace(piecePool[i], '');
                }
            }

            if (castlingString.length > 0) {
                return $q.reject(errorStrings.FEN_CASTLING_INCORRECT);
            }

            position.castling = castling;
            return $q.when();
        };

        var parsePassant = function(position, passantString) {
            if (passantString == '-') {
                position.passant = '-';
                return $q.when();
            }

            if (passantString.length != 2) {
                return $q.reject(errorStrings.FEN_PASSANT_INCORRECT);
            }

            var file = passantString[0].toLowerCase();
            var charCode = file.charCodeAt(0);
            if (charCode < 97 || charCode > 104) {
                return $q.reject(errorStrings.FEN_PASSANT_INCORRECT);
            }

            var rank = parseInt(passantString[1]);
            if (rank != 3 && rank != 6) {
                return $q.reject(errorStrings.FEN_PASSANT_INCORRECT);
            }

            position.passant = file + rank;
            return $q.when();
        };

        var parseHalfmove = function(position, halfmoveString) {
            var halfmove = parseInt(halfmoveString);
            if (isNaN(halfmove) || halfmove < 0) {
                return $q.reject(errorStrings.FEN_HALFMOVE_INCORRECT);
            } else {
                position.halfmove = halfmove;
                return $q.when();
            }
        };

        var parseFullmove = function(position, fullmoveString) {
            var fullmove = parseInt(fullmoveString);
            if (isNaN(fullmove) || fullmove < 1) {
                return $q.reject(errorStrings.FEN_FULLMOVE_INCORRECT);
            } else {
                position.fullmove = fullmove;
                return $q.when();
            }
        };

        var getPositionFromFenString = function(fenString) {
            return parseFenArray(fenString).then(function(fenArray) {
                var position = {};
                var promises = [];

                //promises.push(parsePieces(position, fenArray[0]));
                promises.push(parseActive(position, fenArray[1]));
                promises.push(parseCastling(position, fenArray[2]));
                promises.push(parsePassant(position, fenArray[3]));
                promises.push(parseHalfmove(position, fenArray[4]));
                promises.push(parseFullmove(position, fenArray[5]));

                return $q.all(promises).then(function() {
                    return position;
                });
            })
        };

        return {
            getPositionFromFenString: getPositionFromFenString
        };

    }]);

})(angular);