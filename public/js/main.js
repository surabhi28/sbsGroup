'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
var app=angular
  .module('webapp', ['ngRoute']).config(['$routeProvider', function($routeProvider){
                $routeProvider
                
                .when('/index',{templateurl:'/'})
                .when('/buttons',{templateUrl:'views/buttons.html'})
                .when('/charts',{templateUrl:'views/charts.html'})
                .when('/add-service',{templateUrl:'views/add-service.html'})
                .when('/gallery-with-filters',{templateUrl:'views/gallery-with-filters.html' })
                .when('/image-gallery',{templateUrl:'views/image-gallery.html'})
                .when('/notifications',{templateurl:'views/notifications.html'})
                .when('/table',{templateUrl:'views/table.html'})
                .when('/typography',{templateUrl:'views/typography.html'})
                .when('/show-service',{templateUrl:'views/show-service.html'})
                .when('/add-testimonial',{templateUrl:'views/add-testimonial.html'})
                .when('/show-testimonial',{templateUrl:'views/show-testimonial.html'})
                .when('/show-portfolio',{templateUrl:'views/show-portfolio.html'})
                .when('/add-portfolio',{templateUrl:'views/add-portfolio.html'})
                
                .otherwise({redirectTo:'/'});
            }]);
