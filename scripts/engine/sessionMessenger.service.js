'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('sessionMessenger', [function () {

        var sessionCounter = 0;

        var getNewSessionId = function() {
            return sessionCounter++;
        };

        return {
            getNewSessionId: getNewSessionId
        };

    }]);

})(angular);