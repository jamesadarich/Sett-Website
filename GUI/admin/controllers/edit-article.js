var app = angular.module('get-sett-admin', ['ngMaterial', 'textAngular']);

app.controller('edit-article-controller', function ($scope, $http, $mdToast) {

    $scope.selectedRevision = {};
    $scope.attemptingSubmit = false;

    $scope.submitRevision = function () {
        $scope.attemptingSubmit = true;
        $http.post('http://api.getsett.net/article/revision',
                    $scope.selectedRevision,
                    { headers: { 'Authorization': token.token_type + ' ' + token.access_token } }).
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
                handleUnauthorized();
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