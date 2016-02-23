'use strict';

angular.module('chesster.view').directive('sessionInfo', ['sessionMessenger', 'constants', function(sessionMessenger, constants) {

    function link(scope) {

        var sessionUpdateHandler = function(sessionId, messageId, data) {
            if (scope.session.getSessionId() != sessionId) {
                return;
            }
            var codes = constants.messageCodes;
            switch (messageId) {
                case codes.SESSION_POSITION_CHANGED:
                    console.log('new position: ' + data);
                    break;
            }
        };

        sessionMessenger.subscribe(sessionUpdateHandler);
    }

    return {
        restrict: 'E',
        link: link,
        scope: {
            session: '='
        },
        templateUrl: 'templates/session-info.html'
    };
}]);
