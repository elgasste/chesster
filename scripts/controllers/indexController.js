'use strict';

(function(angular) {

    angular.module('chesster.controllers').controller('indexController', ['$scope', 'sessionFactory', function ($scope, sessionFactory) {

        $scope.statusMessage = 'Chesster!';

        sessionFactory.getNewSession().then(function(session) {
            $scope.session = session;
        })

    }]);

})(angular);