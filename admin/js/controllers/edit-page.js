define(['app', 'siteShell', 'angularMaterial'], function (app, textAngular) {

    app.controller('edit-page', function ($scope, $http, $mdToast, $routeParams, siteShell) {

        siteShell.setTitle('Edit Page');

        $scope.page = {};

        if ($routeParams.id) {
          $http.get(app.apiUrl + '/page/' + $routeParams.id)
          .success(function (page) {
              $scope.page = page;
          });
        }

        $scope.attemptingSubmit = false;

        $scope.submitPage = function () {
            $scope.attemptingSubmit = true;
            var http = $http.post;

            if (page.id) {
              http = $http.put;
            }

            http(app.apiUrl + '/page',
                        $scope.page,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } }).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.attemptingSubmit = false;
                $mdToast.show(
                    $mdToast.simple()
                    .content(data.title + ' saved successfully')
                    .position('top left right')
                    .hideDelay(3000)
                );
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
    });
});
