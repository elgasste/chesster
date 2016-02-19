'use strict';

(function(angular) {

    var chessterConstants = {
        STARTING_POSITION_FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    };

    angular.module('chesster.common').value('constants', chessterConstants);

})(angular);