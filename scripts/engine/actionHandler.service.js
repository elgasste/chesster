'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('actionHandler', [function () {

        var pendingMoves = {};

        var squareClicked = function(sessionId, index) {
            if (pendingMoves[sessionId]) {
                delete pendingMoves[sessionId];
            } else {
                pendingMoves[sessionId] = index;
            }
        };

        return {
            squareClicked: squareClicked
        };

    }]);

})(angular);