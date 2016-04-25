(function() {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngResource', 'ngMaterial'])
        .config(['$routeProvider', '$locationProvider', '$resourceProvider', '$httpProvider',
            function($routeProvider, $locationProvider, $resourceProvider, $httpProvider) {

                $httpProvider.interceptors.push('AuthInterceptor');

                $routeProvider
                    .when('/', {
                        templateUrl: '/js/home/home.html',
                        controller: 'HomeController',
                        resolve: {
                            data: ['RouteInterceptor', function(RouteInterceptor) {
                                return RouteInterceptor.checkAuth({
                                    error_location: '/login'
                                });
                            }]
                        }
                    })
                    .when('/create', {
                        templateUrl: '/js/create/create.html',
                        controller: 'CreateController',
                        resolve: {
                            data: ['RouteInterceptor', function(RouteInterceptor) {
                                return RouteInterceptor.checkAuth({
                                    error_location: '/login'
                                });
                            }]
                        }
                    })
                    .when('/topic/:id', {
                        templateUrl: '/js/topic/topic.html',
                        controller: 'TopicController',
                        resolve: {
                            data: ['RouteInterceptor', function(RouteInterceptor) {
                                return RouteInterceptor.checkAuth({
                                    error_location: '/login'
                                });
                            }]
                        }
                    })
                    .when('/topic/:id/edit', {
                        templateUrl: '/js/edit/edit.html',
                        controller: 'EditController',
                        resolve: {
                            data: ['RouteInterceptor', function(RouteInterceptor) {
                                return RouteInterceptor.checkAuth({
                                    error_location: '/login'
                                });
                            }]
                        }
                    })
                    .when('/login', {
                        templateUrl: '/js/login/login.html',
                        controller: 'LoginController',
                        resolve: {
                            data: ['RouteInterceptor', function(RouteInterceptor) {
                                return RouteInterceptor.checkAuth({
                                    success_location: '/'
                                });
                            }]
                        }
                    })
                    .when('/signup', {
                        templateUrl: '/js/signup/signup.html',
                        controller: 'SignupController',
                        resolve: {
                            data: ['RouteInterceptor', function(RouteInterceptor) {
                                return RouteInterceptor.checkAuth({
                                    success_location: '/'
                                });
                            }]
                        }
                    })
                    .otherwise({
                        redirectTo: '/'
                    });

            }
        ]);
}());
