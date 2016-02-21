'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('actionHandler', [function () {

        var squareClicked = function(sessionId, index) {
            console.log('session ' + sessionId + ' action: clicked on square ' + index);
        };

        return {
            squareClicked: squareClicked
        };

    }]);

})(angular);