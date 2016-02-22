'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('sessionMessenger', [function () {

        var subscribers = {};

        var subscribe = function(sessionId, listener) {
            if (!subscribers[sessionId]) {
                subscribers[sessionId] = [];
            }
            subscribers[sessionId].push(listener);
        };

        // TODO: unsubscribe?

        var broadcast = function(sessionId, messageId, data) {
            if (!subscribers[sessionId]) {
                return;
            }
            for (var i = 0; i < subscribers[sessionId].length; i++) {
                subscribers[sessionId][i](messageId, data);
            }
        };

        return {
            subscribe: subscribe,
            broadcast: broadcast
        };

    }]);

})(angular);