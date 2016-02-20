'use strict';

(function(angular) {

    angular.module('chesster.engine').factory('sessionFactory', ['$q', 'positionHelper', 'fenHelper', function ($q, positionHelper, fenHelper) {

        function Session () {
            var currentPosition = {};

            var getCurrentPosition = function() {
                return positionHelper.copyPosition(currentPosition);
            };

            var loadFromFen = function(fenString) {
                return fenHelper.getPositionFromFenString(fenString).then(function(position) {
                    currentPosition = position;
                    return $q.when();
                });
            };

            return {
                getCurrentPosition: getCurrentPosition,
                loadFromFen: loadFromFen
            };
        }

        var getNewSession = function() {
            return $q.when(new Session());
        };

        return {
            getNewSession: getNewSession
        };

    }]);

})(angular);