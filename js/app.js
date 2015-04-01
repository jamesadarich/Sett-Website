﻿define(['angularAMD', 'angularMaterial', 'angularRoute'], function (angularAMD) {

    var app = angular.module('sett-site', ['ngMaterial', 'ngRoute']);

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

    app.controller('body', function ($scope, $mdSidenav, siteShell) {

        $scope.title = siteShell.getTitle();
        $scope.$watch(siteShell.getTitle, function () {
            $scope.title = siteShell.getTitle();
        });

        $scope.openLeftMenu = function () {
            $mdSidenav('left').toggle();
        };

        $scope.isLoaded = true;
    });

    app.controller('head', function ($scope, $mdSidenav, searchEngineOptimiser) {
        $scope.title = searchEngineOptimiser.getTitle();
        $scope.$watch(searchEngineOptimiser.getTitle, function () {
            $scope.title = searchEngineOptimiser.getTitle();
        });

        $scope.description = searchEngineOptimiser.getDescription();
        $scope.$watch(searchEngineOptimiser.getDescription, function () {
            $scope.description = searchEngineOptimiser.getDescription();
        });

        $scope.keyWords = searchEngineOptimiser.getKeyWords();
        $scope.$watch(searchEngineOptimiser.getKeyWords, function () {
            $scope.keyWords = searchEngineOptimiser.getKeyWords();
        });
    });

    app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {

        $routeProvider.when("/", angularAMD.route({
            templateUrl: 'templates/controllers/home.html',
            controller: 'home',
            controllerUrl: 'controllers/home'
        }))
        .when("/blog", angularAMD.route({
            templateUrl: 'templates/controllers/blog.html',
            controller: 'blog',
            controllerUrl: 'controllers/blog'
        }))
        .when("/article/:slug", angularAMD.route({
            templateUrl: 'templates/controllers/article.html',
            controller: 'article',
            controllerUrl: 'controllers/article'
        }))
        .otherwise(angularAMD.route({
            templateUrl: 'templates/controllers/file-not-found.html',
            controller: 'file-not-found',
            controllerUrl: 'controllers/file-not-found'
        }));


        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('orange');

        $locationProvider.html5Mode(true);
    });

    var bootstrappedApp = angularAMD.bootstrap(app);
    bootstrappedApp.apiUrl = 'http://api.getsett.net';

    return bootstrappedApp;
});