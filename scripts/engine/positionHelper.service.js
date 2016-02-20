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
        };

        return {
            copyPosition: copyPosition
        };

    }]);

})(angular);