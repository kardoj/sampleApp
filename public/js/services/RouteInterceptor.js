(function() {
    'use strict';

    angular
        .module('app')
        .factory('RouteInterceptor', ['$q', '$rootScope', '$http', '$location', 'AuthToken', function($q, $rootScope, $http, $location, AuthToken) {
            return {
                checkAuth: checkAuth
            };

            function checkAuth(option) {

                var deferred = $q.defer();
                var hasToken = false;

                // if there is no saved token, restrict access if neccesery
                if (!AuthToken.isAuthenticated()) {

                    console.warn('No authorization without token!');
                    if (option && option.error_location) {
                        console.log('redirected to ' + option.error_location);
                        $location.path(option.error_location);
                    } else {
                        deferred.resolve();
                    }

                } else {

                    console.log('validate token');
                    $http.get('/api/users/me/')
                        .then(function(response) {


                            // if token updated
                            var data = response.data;
                            if (data.token) {
                                console.log('token updated');
                                AuthToken.setToken(data.token);
                            }

                            if (!$rootScope.user) {
                                console.log('rootscope null, saved to rootscope');
                                $rootScope.user = data.user;
                            }

                            // check if user has changed
                            if ($rootScope.user._id != data.user._id) {
                                console.warn('user changed');
                                // rewrite with new user data.user
                                $rootScope.user = data.user;
                            }

                            if (option && option.success_location) {
                                console.log('redirected to ' + option.success_location);
                                $location.path(option.success_location);
                            } else {
                                deferred.resolve();
                            }
                        }, function(err) {

                            // token not valid
                            $rootScope.user = undefined;
                            AuthToken.clearToken();

                            if (option && option.error_location) {
                                console.log('redirected to ' + option.error_location);
                                $location.path(option.error_location);
                            } else {
                                deferred.resolve();
                            }
                        });

                }

                return deferred.promise;

            }

        }]);

}());
