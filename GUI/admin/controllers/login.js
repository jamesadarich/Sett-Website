if (app === undefined) {
    var app = angular.module('get-sett-admin', ['ngMaterial']);
}

app.apiUrl = 'http://api.getsett.net';

function handleUnauthorized() {
    document.location.href = '/admin/login.html';
}

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryColor('indigo')
      .accentColor('lime');
});

app.controller('login-controller', function ($scope, $http, $mdToast) {
    $scope.usename = null;
    $scope.password = null;
    $scope.attemptingLogin = false;

    $scope.login = function () {
        $scope.attemptingLogin = true;
        var data = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
        $http.post('http://api.getsett.net/token',
                    data,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .success(function (data, status, headers, config) {
            localStorage.setItem('token', JSON.stringify(data));
            window.location.replace('/admin');
        })
        .error(function (data, status, headers, config) {
            $scope.attemptingLogin = false;
            $mdToast.show(
                $mdToast.simple()
                .content(data.error_description)
                .position('top left right')
                .hideDelay(3000)
            );
        });

    }
});