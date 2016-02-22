'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('actionHandler', ['sessionFactory', function (sessionFactory) {

        var pendingMoves = {};

        var squareClicked = function(sessionId, index) {
            sessionFactory.getSession(sessionId).then(function(session) {
                if (pendingMoves[sessionId]) {
                    if (pendingMoves[sessionId].possibleMoves.indexOf(index) != -1) {
                        session.movePiece(pendingMoves[sessionId].fromSquare, index);
                    }
                    delete pendingMoves[sessionId];
                } else {
                    session.activateSquare(index).then(function(moves) {
                        if (moves.length == 0) {
                            return;
                        }
                        pendingMoves[sessionId] = {fromSquare: index, possibleMoves: moves};
                    });
                }
            });
        };

        return {
            squareClicked: squareClicked
        };

    }]);

})(angular);