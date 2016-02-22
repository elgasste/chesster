'use strict';

(function(angular) {

    angular.module('chesster.engine').factory('sessionFactory', ['$q', 'constants', 'sessionMessenger', 'positionHelper', 'fenHelper', function ($q, constants, sessionMessenger, positionHelper, fenHelper) {

        var sessions = [];
        var sessionCounter = 0;

        var getNewSessionId = function() {
            return sessionCounter++;
        };

        function Session (id) {
            var sessionId = id;
            var currentPosition = {};

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
                // TODO
                var possibleMoves = [];
                return $q.when(possibleMoves);
            };

            var movePiece = function(fromSquare, toSquare) {
                // TODO
            };

            return {
                getSessionId: getSessionId,
                getCurrentPosition: getCurrentPosition,
                loadFromFen: loadFromFen,
                activateSquare: activateSquare,
                movePiece: movePiece
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