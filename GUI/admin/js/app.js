define(['angularAMD', 'angularRoute', 'angularMaterial', 'textAngular', 'toolbar'], function (angularAMD) {

    var app = angular.module('sett-site-admin', ['ngRoute', 'ngMaterial', 'textAngular']);

    app.service('siteShell', function () {
        var pageTitle = '';

        var getTitle = function () {
            return pageTitle;
        }

        var setTitle = function (title) {
            pageTitle = title;
        }

        return {
            getTitle: getTitle,
            setTitle: setTitle
        };

    });

    app.controller('toolbar', function ($scope, siteShell) {

        $scope.title = siteShell.getTitle();
        $scope.$watch(siteShell.getTitle, function () {
            $scope.title = siteShell.getTitle();
        })
    });

    app.controller('body', function ($scope, $http, $mdSidenav, siteShell) {

        if (!app.token) {
            app.handleUnauthorized();
        }

        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        $scope.logout = function () {
            localStorage.removeItem('token');
            document.location.href = '/login/';
        };

        $scope.user = {};

        $http.get(app.apiUrl + '/users/current',
                    { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } }).
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.user = data;
        })
        .error(function (data, status, headers, config) {

            $scope.attemptingSubmit = false;
            if (status === 401) {
                app.handleUnauthorized();
            }

            $mdToast.show(
                $mdToast.simple()
                .content(JSON.stringify(data))
                .position('top left right')
                .hideDelay(3000)
            );
        });

        $scope.pageLoaded = true;
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
        }))
        .otherwise(angularAMD.route({
            templateUrl: 'admin/templates/controllers/file-not-found.html',
            controller: 'file-not-found',
            controllerUrl: 'controllers/file-not-found'
        }));

        $locationProvider.html5Mode(true);
    });
    app.service('searchEngineOptimiser', function () {
        var metaTitle = '';
        var metaDescription = '';
        var metaKeyWords = [];

        var getTitle = function () {
            return metaTitle;
        }

        var setTitle = function (title) {
            metaTitle = title;
        }

        var getDescription = function () {
            return metaDescription;
        }

        var setDescription = function (description) {
            metaDescription = description;
        }

        var getKeyWords = function () {
            return metaKeyWords.join(', ');
        }

        var setKeyWords = function (keyWords) {
            metaKeyWords = keyWords;
        }

        return {
            getTitle: getTitle,
            setTitle: setTitle,
            getDescription: getDescription,
            setDescription: setDescription,
            getKeyWords: getKeyWords,
            setKeyWords: setKeyWords
        };

    });

    app.apiUrl = 'http://api.getsett.net';

    app.handleUnauthorized = function() {
        document.location.href = '/login/';
    };

    app.token = JSON.parse(localStorage.getItem('token'));

    return angularAMD.bootstrap(app);
});