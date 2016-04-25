(function() {
    'use strict';

    angular
    .module('app')
    .controller('SignupController', ['$scope', '$http',
    function($scope, $http) {

      //add to SignupController
      $scope.signup = function(user) {

        console.log('creating user', user);

        $http.post('/api/users/signup/', user)
            .then(function(response) {
                console.log(response.data);
            }, function(err) {
                console.log(err);
            });
      };

    }]);
}());
