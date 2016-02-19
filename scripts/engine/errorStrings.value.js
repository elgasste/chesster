'use strict';

(function(angular) {

    var errorStrings = {
        FEN_SECTIONS_INCORRECT: 'The FEN string has missing or extra sections',
        FEN_ACTIVE_INCORRECT: 'The FEN string has a bad value for active piece'
    };

    angular.module('chesster.engine').value('errorStrings', errorStrings);

})(angular);