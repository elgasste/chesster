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

        return {
            getIndexFromAlgebraic: getIndexFromAlgebraic,
            getAlgebraicFromIndex: getAlgebraicFromIndex
        };

    }]);

})(angular);