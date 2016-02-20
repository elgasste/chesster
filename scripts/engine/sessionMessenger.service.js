'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('sessionMessenger', [function () {

        var sessionCounter = 0;
        var subscribers = [];

        var getNewSessionId = function() {
            subscribers.push([]);
            return sessionCounter++;
        };

        var subscribe = function(sessionId, listener) {
            subscribers[sessionId].push(listener);
        };

        // TODO: unsubscribe?

        var broadcast = function(sessionId, messageId) {
            for (var i = 0; i < subscribers[sessionId].length; i++) {
                subscribers[sessionId][i]();
            }
        };

        return {
            getNewSessionId: getNewSessionId,
            subscribe: subscribe,
            broadcast: broadcast
        };

    }]);

})(angular);