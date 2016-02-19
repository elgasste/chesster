'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('fenHelper', ['$q', function ($q) {

        var parseFenArray = function(fenString) {
            // TODO
            return $q.reject('not implemented');
        };

        var parsePieces = function(position, piecesString) {
            // TODO
            return $q.reject('not implemented');
        };

        var parseActive = function(position, activeString) {
            // TODO
            return $q.reject('not implemented');
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