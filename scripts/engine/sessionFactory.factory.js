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
                var possibleMoves = [];
                // TODO: actually build a list of possible moves
                if (possibleMoves.length > 0) {
                    sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_SQUARE_ACTIVATED, {square: square, possibleMoves: possibleMoves});
                }
            };

            var movePiece = function(fromSquare, toSquare) {
                var pieceFrom = currentPosition.pieces[fromSquare];
                if (pieceFrom == '-') {
                    return;
                }
                var pieceTo =  currentPosition.pieces[toSquare];
                currentPosition.pieces = currentPosition.pieces.substr(0, toSquare) + currentPosition.pieces[fromSquare] + currentPosition.pieces.substr(toSquare+1);
                currentPosition.pieces = currentPosition.pieces.substr(0, fromSquare) + '-' + currentPosition.pieces.substr(fromSquare+1);
                // TODO: update active, castling, passant, fullmove, and halfmove
                sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_POSITION_CHANGED);
                if (pieceTo != '-') {
                    sessionMessenger.broadcast(sessionId, constants.messageCodes.SESSION_PIECE_CAPTURED, pieceTo);
                }
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