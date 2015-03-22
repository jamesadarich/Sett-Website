define(['angularAMD', 'angularRoute', 'angularMaterial'], function (angularAMD) {

    var app = angular.module('sett-site-admin', ['ngRoute', 'ngMaterial']);
    
    app.controller('side-nav', function ($scope, $mdSidenav) {
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
    });

    app.config(function ($routeProvider, $locationProvider/*, $mdThemingProvider*/) {

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

        /*
        $mdThemingProvider.theme('default')
            .primaryPallete('blue')
            .accentPallete('orange');
            */

        $locationProvider.html5Mode(true);
    });

    
    /*
    app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPallete('blue')
            .accentPallete('orange');
    });
    */

    app.apiUrl = 'http://api.getsett.net';

    app.handleUnauthorized = function() {
        document.location.href = '/admin/login.html';
    };

    app.token = JSON.parse(localStorage.getItem('token'));

    return angularAMD.bootstrap(app);
});