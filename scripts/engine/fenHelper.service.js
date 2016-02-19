'use strict';
(function(angular) {

    angular.module('chesster.engine').factory('fenHelper', [function () {

        var getPositionFromFenString = function(fenString) {
            return {'hey': 'hi!'};
        };

        return {
            getPositionFromFenString: getPositionFromFenString
        };

    }]);

})(angular);