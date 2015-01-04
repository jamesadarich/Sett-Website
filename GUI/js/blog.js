var app = angular.module('sett-site', ['ngMaterial']);
app.controller('blog-controller', function ($scope) {
    $scope.articles = [];

    $.get('/api/articles')
    .success(function (articles) {
        $scope.articles = articles;
        $scope.$apply();
    });
});

