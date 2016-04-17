(function() {
    'use strict';

    angular.
    module('app').factory('Topic', ['$resource', function($resource) {
        return $resource('/api/topics/:id', { id: '@_id' }, {
            update: {
                method: 'PUT' // this method issues a PUT request
            }
        });
    }]);
}());
