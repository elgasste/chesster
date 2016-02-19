'use strict';

(function(angular) {

    angular.module('chesster.controllers').controller('indexController', ['$scope', 'constants', 'fenHelper', function ($scope, constants, fenHelper) {

        $scope.statusMessage = 'Chesster!';

        var position = fenHelper.getPositionFromFenString(constants.STARTING_POSITION_FEN);
        console.log(position);

    }]);

})(angular);