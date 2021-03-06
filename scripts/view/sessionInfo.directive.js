'use strict';

angular.module('chesster.view').directive('sessionInfo', ['sessionMessenger', 'constants', 'fenHelper', function(sessionMessenger, constants, fenHelper) {

    function link(scope) {

        scope.moveList = [];

        var updatePositionInfo = function(position) {
            scope.activeColor = (position.active == 'w') ? 'White' : 'Black';
            fenHelper.getFenStringFromPosition(position).then(function(fen) {
                scope.fenString = fen;
            });
        };

        var updateMoveList = function(moveList) {
            scope.moveList = [];
            for (var i = 0, j = 0; i < moveList.length; i++) {
                var move = moveList[i];
                if (move.position.active == 'b') {
                    scope.moveList.push({
                        number: move.position.fullmove,
                        white: move.algebraic,
                        black: ''
                    });
                } else {
                    if (i == 0) {
                        scope.moveList.push({
                            number: move.position.fullmove - 1,
                            white: '...'
                        })
                    }
                    scope.moveList[j].black = move.algebraic;
                    j++;
                }
            }
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
                case codes.SESSION_MOVE_LIST_CHANGED:
                    updateMoveList(data);
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
