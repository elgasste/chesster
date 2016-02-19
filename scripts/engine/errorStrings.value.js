'use strict';

(function(angular) {

    var errorStrings = {
        FEN_SECTIONS_INCORRECT: 'The FEN string has missing or extra sections'
    };

    angular.module('chesster.engine').value('errorStrings', errorStrings);

})(angular);