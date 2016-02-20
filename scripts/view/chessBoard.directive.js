'use strict';

angular.module('chesster.view').directive('chessBoard', function() {

    function link(scope) {
        console.log(scope.session.getCurrentPosition());
    }

    return {
        restrict: 'E',
        link: link,
        scope: {
            session: '='
        },
        templateUrl: 'templates/chess-board.html'
    };
});
