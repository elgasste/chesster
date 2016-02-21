'use strict';

angular.module('chesster.view').directive('chessBoard', ['constants', 'sessionMessenger', function(constants, sessionMessenger) {

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

        scope.squareClicked = function(index) {
            console.log('clicked on square ' + index);
        };

        var sessionUpdateHandler = function(messageId) {
            var codes = constants.messageCodes;
            switch (messageId) {
                case codes.SESSION_POSITION_CHANGED:
                    updatePieces(scope.session.getCurrentPosition().pieces);
                    break;
            }
        };

        sessionMessenger.subscribe(scope.session.getSessionId(), sessionUpdateHandler);

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
