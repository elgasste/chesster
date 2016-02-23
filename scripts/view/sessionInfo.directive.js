'use strict';

angular.module('chesster.view').directive('sessionInfo', ['sessionMessenger', 'constants', function(sessionMessenger, constants) {

    function link(scope) {

        var updatePositionInfo = function(position) {
            scope.activeColor = (position.active == 'w') ? 'White' : 'Black';
        };

        var sessionUpdateHandler = function(sessionId, messageId, data) {
            if (scope.session.getSessionId() != sessionId) {
                return;
            }
            var codes = constants.messageCodes;
            switch (messageId) {
                case codes.SESSION_POSITION_CHANGED:
                    updatePositionInfo(data);
                    break;
            }
        };

        sessionMessenger.subscribe(sessionUpdateHandler);

        updatePositionInfo(scope.session.getCurrentPosition());
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
