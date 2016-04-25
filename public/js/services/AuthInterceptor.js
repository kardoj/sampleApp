(function() {
    'use strict';

    angular
        .module('app')
        .factory('AuthInterceptor', ['AuthToken', function(AuthToken) {
            return {
                request: function(config) {

                    // add token to every request
                    var token = AuthToken.getToken();
                    if (token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    return config;
                }
            };
        }]);

}());
