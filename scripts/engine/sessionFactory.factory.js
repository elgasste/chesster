'use strict';

(function(angular) {

    angular.module('chesster.engine').factory('sessionFactory', ['$q', 'sessionMessenger', 'positionHelper', 'fenHelper', function ($q, sessionMessenger, positionHelper, fenHelper) {

        function Session () {
            var sessionId = sessionMessenger.getNewSessionId();
            var currentPosition = {};

            var getSessionId = function() {
                return sessionId;
            };

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
                getSessionId: getSessionId,
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