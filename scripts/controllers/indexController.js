'use strict';

(function(angular) {

    angular.module('chesster.controllers').controller('indexController', ['$scope', 'constants', 'sessionFactory', function ($scope, constants, sessionFactory) {

        $scope.statusMessage = 'Chesster!';

        sessionFactory.getNewSession().then(function(session) {
            $scope.session = session;
            $scope.session.loadFromFen(constants.STARTING_POSITION_FEN).then(function() {
                $scope.statusMessage = 'Session loaded';
                console.log($scope.session.getCurrentPosition());
            });
        })

    }]);

})(angular);