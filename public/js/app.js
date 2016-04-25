(function() {
    'use strict';

    angular
    .module('app', ['ngRoute','ngResource', 'ngMaterial'])
    .config(['$routeProvider','$locationProvider','$resourceProvider',
    function($routeProvider,$locationProvider,$resourceProvider) {

        $routeProvider
        .when('/', {
            templateUrl: '/js/home/home.html',
            controller: 'HomeController'
        })
        .when('/create', {
            templateUrl: '/js/create/create.html',
            controller: 'CreateController'
        })
        .when('/topic/:id', {
            templateUrl: '/js/topic/topic.html',
            controller: 'TopicController'
        })
        .when('/topic/:id/edit', {
            templateUrl: '/js/edit/edit.html',
            controller: 'EditController'
        })
        .when('/login', {
            templateUrl: '/js/login/login.html',
            controller: 'LoginController',
        })
        .when('/signup', {
            templateUrl: '/js/signup/signup.html',
            controller: 'SignupController',
        })
        .otherwise({redirectTo: '/'});

    }]);
}());
