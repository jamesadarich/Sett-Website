define(['app', 'textAngular', 'siteShell', 'angularMaterial'], function (app, textAngular) {

    app.controller('edit-article', function ($scope, $http, $mdToast, siteShell) {

        siteShell.setTitle('Edit Article');

        $scope.selectedRevision = {};
        $scope.attemptingSubmit = false;

        $scope.submitRevision = function () {
            $scope.attemptingSubmit = true;
            $http.post(app.apiUrl + '/article/revision',
                        $scope.selectedRevision,
                        { headers: { 'Authorization': app.token.token_type + ' ' + app.token.access_token } }).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.attemptingSubmit = false;
                $mdToast.show(
                    $mdToast.simple()
                    .content(data.Title + ' saved successfully')
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
        }
    });
});