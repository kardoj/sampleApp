(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', ['$scope', '$http', 'AuthToken', '$location',
            function($scope, $http, AuthToken, $location) {

                //add to LoginController
                $scope.login = function(user) {

                    console.log('logging in user', user);

                    $http.post('/api/users/login/', user)
                        .then(function(response) {
                            console.log(response.data);

                            if (response.data.token) {
                                console.log('token updated');
                                AuthToken.setToken(response.data.token);
                                $location.path('/');
                            }

                        }, function(err) {
                            console.log(err);
                        });
                };

            }
        ]);
}());
