define(['app'], function (app) {
    app.controller('article', function ($scope, $http, $routeParams, $sce, siteShell, searchEngineOptimiser) {
        $scope.loading = true;
        $scope.article = {};

        $http.get(app.apiUrl + '/articles?where=slug:is:' + $routeParams.slug)
        .success(function (articles) {


            $scope.article = articles[0];

            $scope.article.content = $sce.trustAsHtml($scope.article.content);

            siteShell.setTitle($scope.article.title);
            searchEngineOptimiser.setTitle($scope.article.title);
            searchEngineOptimiser.setDescription($scope.article.summary);

            if ($scope.article.KeyWords) {
                searchEngineOptimiser.setKeyWords($scope.article.keyWords);
            }
            else {
                searchEngineOptimiser.setKeyWords([]);
            }

            $scope.loading = false;
        });
    });
});
