define(['app', 'siteShell'], function (app) {
    app.controller('pages', function ($scope, $http, $mdToast, siteShell) {

        siteShell.setTitle('Pages');

        $scope.articles = [];

        $http.get(app.apiUrl + '/pages')
        .success(function (pages) {
            $scope.pages = pages;
        });

        $scope.deletePage = function (page) {
            $http.delete(app.apiUrl + '/pages/' + page.id,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } })
                .success(function (pages) {
                    $scope.pages.pop(page);
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
        };
        /*
        $scope.newArticle = function () {

            window.location.replace('/admin/edit-article.html');
        }
        */
    });
});
