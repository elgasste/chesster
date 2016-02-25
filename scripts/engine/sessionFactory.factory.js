'use strict';

(function(angular) {

    angular.module('chesster.engine').factory('sessionFactory', ['$q', 'constants', 'sessionMessenger', 'positionHelper', 'fenHelper', 'standardRuleset', function ($q, constants, sessionMessenger, positionHelper, fenHelper, standardRuleset) {

        var sessions = [];
        var sessionCounter = 0;

        var getNewSessionId = function() {
            return sessionCounter++;
        };

        function Session (id) {
            var sessionId = id;
            var currentPosition = {};
            var moveList = [];
            var ruleset = standardRuleset;

            var getSessionId = function() {
                return sessionId;
            };

            var getCurrentPosition = function() {
                return positionHelper.copyPosition(currentPosition);
            };

            var loadFromFen = function(fenString) {
                return fenHelper.getPositionFromFenString(fenString).then(function(position) {
                    currentPosition = position;
                    sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_POSITION_CHANGED);
                    return $q.when();
                });
            };

            var activateSquare = function(square) {
                deactivateSquares();
                var positionCopy = positionHelper.copyPosition(currentPosition);
                var possibleMoves = ruleset.getPossibleMovesForSquare(positionCopy, square);
                if (possibleMoves.length > 0) {
                    sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_SQUARE_ACTIVATED, {square: square, possibleMoves: possibleMoves});
                }
            };

            var deactivateSquares = function () {
                sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_SQUARES_DEACTIVATED);
            };

            var makeMove = function(fromSquare, toSquare) {
                deactivateSquares();
                var positionCopy = positionHelper.copyPosition(currentPosition);
                ruleset.makeMove(positionCopy, fromSquare, toSquare).then(function(moveInfo) {
                    currentPosition = moveInfo.position;
                    moveList.push(moveInfo);
                    sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_POSITION_CHANGED, currentPosition);
                    sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_MOVE_LIST_CHANGED, moveList);
                });
            };

            return {
                getSessionId: getSessionId,
                getCurrentPosition: getCurrentPosition,
                loadFromFen: loadFromFen,
                activateSquare: activateSquare,
                deactivateSquares: deactivateSquares,
                makeMove: makeMove
            };
        }

        var createNewSession = function() {
            var newId = getNewSessionId();
            var session = new Session(newId);
            sessions.push(session);
            return $q.when(session);
        };

        var getSession = function(sessionId) {
            return $q.when(sessions[sessionId]);
        };

        return {
            createNewSession: createNewSession,
            getSession: getSession
        };

    }]);

})(angular);