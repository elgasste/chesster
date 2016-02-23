'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('actionHandler', ['sessionFactory', 'sessionMessenger', 'constants', function (sessionFactory, sessionMessenger, constants) {

        var pendingMoves = {};

        var sessionUpdateHandler = function(sessionId, messageId, data) {
            if (messageId == constants.messageCodes.SESSION_SQUARE_ACTIVATED && data.possibleMoves.length > 0) {
                pendingMoves[sessionId] = {fromSquare: data.square, possibleMoves: data.possibleMoves};
            }
        };

        var squareClicked = function(sessionId, index) {
            sessionFactory.getSession(sessionId).then(function(session) {
                if (pendingMoves[sessionId]) {
                    if (pendingMoves[sessionId].fromSquare == index) {
                        delete pendingMoves[sessionId];
                        session.deactivateSquares();
                    } else if (pendingMoves[sessionId].possibleMoves.indexOf(index) != -1) {
                        session.movePiece(pendingMoves[sessionId].fromSquare, index);
                        session.deactivateSquares();
                        delete pendingMoves[sessionId];
                    } else {
                        delete pendingMoves[sessionId];
                        session.deactivateSquares();
                        session.activateSquare(index);
                    }
                } else {
                    session.activateSquare(index);
                }
            });
        };

        sessionMessenger.subscribe(sessionUpdateHandler);

        return {
            squareClicked: squareClicked
        };

    }]);

})(angular);