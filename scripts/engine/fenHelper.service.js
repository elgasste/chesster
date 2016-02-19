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
            // TODO
            return $q.reject('not implemented');
        };

        var parsePassant = function(position, passantString) {
            // TODO
            return $q.reject('not implemented');
        };

        var parseHalfmove = function(position, halfmoveString) {
            // TODO
            return $q.reject('not implemented');
        };

        var parseFullmove = function(position, fullmoveString) {
            // TODO
            return $q.reject('not implemented');
        };

        var getPositionFromFenString = function(fenString) {
            return parseFenArray(fenString).then(function(fenArray) {
                var position = {};
                var promises = [];

                promises.push(parsePieces(position, fenArray[0]));
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