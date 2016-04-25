(function() {
    'use strict';

    angular
    .module('app')
    .controller('LoginController', ['$scope', '$http',
    function($scope, $http) {

      //add to LoginController
      $scope.login = function(user) {

        console.log('logging in user', user);

        $http.post('/api/users/login/', user)
            .then(function(response) {
                console.log(response.data);
            }, function(err) {
                console.log(err);
            });
      };

    }]);
}());
