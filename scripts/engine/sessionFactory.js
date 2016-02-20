'use strict';

(function(angular) {

    angular.module('chesster.engine').factory('sessionFactory', ['$q', function ($q) {

        function session () {
            // TODO
        }

        var getNewSession = function() {
            return $q.when(new session());
        };

        return {
            getNewSession: getNewSession
        }

    }]);

})(angular);