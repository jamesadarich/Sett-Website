define(['app', 'siteShell'], function (app) {
    app.controller('articles', function ($scope, $http, $mdToast, siteShell) {

        siteShell.setTitle('Articles');

        $scope.articles = [];

        $http.get(app.apiUrl + '/articles')
        .success(function (articles) {
            $scope.articles = articles;
        });

        $scope.deleteArticle = function (article) {
            $http.delete(app.apiUrl + '/articles/' + article.Id,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } })
                .success(function (articles) {
                    $scope.articles.pop(article);
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
        });;
        };
        /*
        $scope.newArticle = function () {

            window.location.replace('/admin/edit-article.html');
        }
        */
    });
});