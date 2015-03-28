define(['app'], function (app) {
    app.controller('article', function ($scope, $http, $routeParams, siteShell, searchEngineOptimiser) {
        $scope.article = {};

        $http.get(app.apiUrl + '/articles?where=slug:is:' + $routeParams.slug)
        .success(function (articles) {


            $scope.article = articles[0];
            siteShell.setTitle($scope.article.Title);
            searchEngineOptimiser.setTitle($scope.article.Title);
            searchEngineOptimiser.setDescription($scope.article.Summary);
            searchEngineOptimiser.setKeyWords($scope.article.KeyWords);
        });
    });
});