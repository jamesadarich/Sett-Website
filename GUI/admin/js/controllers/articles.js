﻿define(['app'], function (app) {
    app.controller('articles', function ($scope, $http) {
        $scope.articles = [];

        $http.get(app.apiUrl + '/articles')
        .success(function (articles) {
            $scope.articles = articles;
        });
        /*
        $scope.newArticle = function () {

            window.location.replace('/admin/edit-article.html');
        }
        */
    });
});