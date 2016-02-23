'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('standardRuleset', ['$q', function ($q) {

        var getPossibleMovesForPosition = function(position) {
            // TODO
            return $q.when([]);
        };

        return {
            getPossibleMovesForPosition: getPossibleMovesForPosition
        };

    }]);

})(angular);