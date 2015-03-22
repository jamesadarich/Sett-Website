define(['angularAMD', 'angularRoute', 'angularMaterial'], function (angularAMD) {

    var app = angular.module('sett-site-admin', ['ngRoute', 'ngMaterial']);
    
    app.controller('side-nav', function ($scope, $mdSidenav) {
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
    });

    app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        $routeProvider.when('/admin/', angularAMD.route({
            templateUrl: 'admin/templates/controllers/dashboard.html',
            controller: 'dashboard',
            controllerUrl: 'controllers/dashboard'
        }))
        .when('/admin/articles', angularAMD.route({
            templateUrl: 'admin/templates/controllers/articles.html',
            controller: 'articles',
            controllerUrl: 'controllers/articles'
        }))
        .when('/admin/articles/edit/:id', angularAMD.route({
            templateUrl: 'admin/templates/controllers/edit-article.html',
            controller: 'edit-article',
            controllerUrl: 'controllers/edit-article'
        }));

        $locationProvider.html5Mode(true);
    });

    app.apiUrl = 'http://api.getsett.net';

    app.handleUnauthorized = function() {
        document.location.href = '/admin/login.html';
    };

    app.token = JSON.parse(localStorage.getItem('token'));

    return angularAMD.bootstrap(app);
});