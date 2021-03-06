'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('indexHelper', [function () {

        var getRankFromIndex = function(index) {
            return 8 - parseInt(index / 8);
        };

        var getFileFromIndex = function(index) {
            return index - (8 * (parseInt(index / 8))) + 1;
        };

        var getIndexFromRankAndFile = function(rank, file) {
            return (8 * (8 - rank)) + (file - 1);
        };

        return {
            getRankFromIndex: getRankFromIndex,
            getFileFromIndex: getFileFromIndex,
            getIndexFromRankAndFile: getIndexFromRankAndFile
        };

    }]);

})(angular);