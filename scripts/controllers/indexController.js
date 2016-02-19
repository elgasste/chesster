'use strict';

(function(angular) {

    angular.module('chesster.controllers').controller('indexController', ['$scope', 'constants', 'fenHelper', function ($scope, constants, fenHelper) {

        $scope.statusMessage = 'Chesster!';

        //var testFen = constants.STARTING_POSITION_FEN
        //var testFen = 'r1bqkbnr/pppp1p1p/2n5/4p3/2B1P1pP/5N2/PPPPQPP1/RNB1K2R b KQkq h3 0 5';
        var testFen = '2kr3r/pp3q1p/2p1b3/2b5/1P6/2P3Pp/P2N2P1/R4R1K w - - 1 19';

        fenHelper.getPositionFromFenString(testFen).then(function(position) {
            console.log(position);
            fenHelper.getFenStringFromPosition(position).then(function(fenString) {
                console.log(fenString);
            });
        }).catch(function(error) {
            console.error(error);
        });

    }]);

})(angular);