define(['app'], function (app) {
    app.controller('article', function ($scope, $http, $routeParams) {
        $scope.article = {};

        $http.get(app.apiUrl + '/articles?where=slug:is:' + $routeParams.slug)
        .success(function (articles) {
            $scope.article = articles[0];
        });
    });
});