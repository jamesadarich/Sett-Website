define(['angularAMD', 'angularRoute', 'angularMaterial'], function (angularAMD) {

    var app = angular.module('sett-site-admin', ['ngRoute', 'ngMaterial']);
    
    app.controller('side-nav-controller', function ($scope, $mdSidenav,) {
        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };
    });
    

    app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPallete('blue')
            .accentPallete('orange');
    });

    app.apiUrl = 'http://api.getsett.net';

    return angularAMD.bootstrap(app);
});