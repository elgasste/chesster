'use strict';

(function(angular) {

    angular.module('chesster.controllers').controller('indexController', ['$scope', 'constants', 'sessionFactory', function ($scope, constants, sessionFactory) {
        sessionFactory.createNewSession().then(function(session) {
            $scope.session = session;
            $scope.session.loadFromFen(constants.STARTING_POSITION_FEN).then(function() {
                // TODO: show status?
            });
        });

    }]);

})(angular);