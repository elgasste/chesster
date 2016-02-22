'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('algebraicHelper', [function () {

        var getSquareIndexFromAlgebraic = function(algebraic) {
            var file = algebraic[0].toLowerCase().charCodeAt(0) - 97;
            var rank = 8 - parseInt(algebraic[1]);
            return file + (rank * 8);
        };

        return {
            getSquareIndexFromAlgebraic: getSquareIndexFromAlgebraic
        };

    }]);

})(angular);