'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('positionHelper', [function () {

        var copyPosition = function(position) {
            var copy = {};

            copy.pieces = position.pieces;
            copy.active = position.active;
            copy.castling = position.castling;
            copy.passant = position.passant;
            copy.halfmove = position.halfmove;
            copy.fullmove = position.fullmove;

            return copy;
        };

        var movePieceInString = function(position, fromIndex, toIndex) {
            position.pieces = position.pieces.substr(0, toIndex) + position.pieces[fromIndex] + position.pieces.substr(toIndex+1);
            position.pieces = position.pieces.substr(0, fromIndex) + '-' + position.pieces.substr(fromIndex+1);
        };

        var removePieceInString = function(position, index) {
            position.pieces = position.pieces.substr(0, index) + '-' + position.pieces.substr(index+1);
        };

        return {
            copyPosition: copyPosition,
            movePieceInString: movePieceInString,
            removePieceInString: removePieceInString
        };

    }]);

})(angular);