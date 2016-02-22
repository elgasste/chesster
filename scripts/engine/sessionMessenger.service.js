'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('sessionMessenger', [function () {

        var subscribers = [];

        var subscribe = function(listener) {
            if (subscribers.indexOf(listener) == -1)
                subscribers.push(listener);
        };

        // TODO: unsubscribe?

        var broadcast = function(sessionId, messageId, data) {
            for (var i = 0; i < subscribers.length; i++) {
                subscribers[i](sessionId, messageId, data);
            }
        };

        return {
            subscribe: subscribe,
            broadcast: broadcast
        };

    }]);

})(angular);