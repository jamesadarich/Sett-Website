define(['app'], function (app) {
    app.controller('article', function ($scope, $http, $routeParams, $sce, siteShell, searchEngineOptimiser) {
        $scope.loading = true;
        $scope.article = {};

        $http.get(app.apiUrl + '/articles?where=slug:is:' + $routeParams.slug)
        .success(function (articles) {


            $scope.article = articles[0];

            $scope.article.Content = $sce.trustAsHtml($scope.article.Content);

            siteShell.setTitle($scope.article.Title);
            searchEngineOptimiser.setTitle($scope.article.Title);
            searchEngineOptimiser.setDescription($scope.article.Summary);

            if ($scope.article.KeyWords) {
                searchEngineOptimiser.setKeyWords($scope.article.KeyWords);
            }
            else {
                searchEngineOptimiser.setKeyWords([]);
            }

            $scope.loading = false;
        });
    });
});