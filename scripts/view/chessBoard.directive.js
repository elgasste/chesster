'use strict';

angular.module('chesster.view').directive('chessBoard', ['constants', 'sessionMessenger', 'actionHandler', 'indexHelper', function(constants, sessionMessenger, actionHandler, indexHelper) {

    function link(scope) {
        scope.rows = [];
        var colors = ['w', 'b'];
        var alternator = 0;
        for (var i = 0; i < 8; i++) {
            scope.rows.push({squares:[]});
            for (var j = 0; j < 8; j++) {
                scope.rows[i].squares.push({});
                scope.rows[i].squares[j].color = colors[j % 2 + alternator];
                scope.rows[i].squares[j].piece = 'dash';
                scope.rows[i].squares[j].index = j + (i * 8);
            }
            alternator = alternator == 0 ? 1 : 0;
        }

        var updatePieces = function(piecesString) {
            if (piecesString.length != 64) {
                console.error('chessBoard.directive: ' + constants.viewErrors.PIECES_STRING_INCORRECT);
                return;
            }
            for(var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    var pieceCode = piecesString[j+(i*8)];
                    if (pieceCode == '-') {
                        scope.rows[i].squares[j].piece = 'dash';
                    } else {
                        var lowerCaseCode = pieceCode.toLowerCase();
                        var colorCode = (lowerCaseCode == pieceCode) ? 'b' : 'w';
                        scope.rows[i].squares[j].piece = colorCode + lowerCaseCode;
                    }
                }
            }
        };

        var updateActiveSquare = function(activityData) {
            var rank = 8 - indexHelper.getRankFromIndex(activityData.square);
            var file = indexHelper.getFileFromIndex(activityData.square);
            scope.rows[rank].squares[file-1].active = true;
            for (var i = 0; i < activityData.possibleMoves.length; i++) {
                rank = 8 - indexHelper.getRankFromIndex(activityData.possibleMoves[i]);
                file = indexHelper.getFileFromIndex(activityData.possibleMoves[i]);
                scope.rows[rank].squares[file-1].possibleMove = true;
            }
        };

        var deactivateSquares = function() {
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    scope.rows[i].squares[j].active = false;
                    scope.rows[i].squares[j].possibleMove = false;
                }
            }
        };

        scope.squareClicked = function(index) {
            actionHandler.squareClicked(scope.session.getSessionId(), index);
        };

        scope.dragStarted = function (event, ui, index) {
            actionHandler.dragStarted(scope.session.getSessionId(), index);
        };

        scope.pieceDropped = function(event, ui, index) {
            actionHandler.pieceDropped(scope.session.getSessionId(), index);
        };

        var sessionUpdateHandler = function(sessionId, messageId, data) {
            if (scope.session.getSessionId() != sessionId) {
                return;
            }
            var codes = constants.messageCodes;
            switch (messageId) {
                case codes.SESSION_POSITION_CHANGED:
                    updatePieces(data.pieces);
                    break;
                case codes.SESSION_SQUARE_ACTIVATED:
                    updateActiveSquare(data);
                    break;
                case codes.SESSION_SQUARES_DEACTIVATED:
                    deactivateSquares();
                    break;
            }
        };

        sessionMessenger.subscribe(sessionUpdateHandler);

        var position = scope.session.getCurrentPosition();
        updatePieces(position.pieces);
    }

    return {
        restrict: 'E',
        link: link,
        scope: {
            session: '='
        },
        templateUrl: 'templates/chess-board.html'
    };
}]);
