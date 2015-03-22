define(['app'], function (app) {
    app.controller('blog', function ($scope, $http) {
        $scope.articles = [];

        $http.get(app.apiUrl + '/articles')
        .success(function (articles) {
            $scope.articles = articles;
        });
    });
});