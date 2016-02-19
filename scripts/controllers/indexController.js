'use strict';

(function(angular) {

    angular.module('chesster.controllers').controller('indexController', ['$scope', 'constants', 'fenHelper', function ($scope, constants, fenHelper) {

        $scope.statusMessage = 'Chesster!';

        fenHelper.getPositionFromFenString(constants.STARTING_POSITION_FEN).then(function(position) {
            console.log(position);
        }).catch(function(error) {
            console.error(error);
        });

    }]);

})(angular);