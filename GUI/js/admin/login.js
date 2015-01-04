$(document)
.ready(function () {

    $('.alert').hide();
});

var loginScope;

var app = angular.module('login', ['ngMaterial']);

app.controller('error-controller', function ($scope) {
    $scope.errors = [];
    loginScope = $scope;

    $scope.showError = function (error) {
        $scope.errors.push(error);
        $scope.$apply();
    };
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryColor('blue')
      .accentColor('orange');
});

app.controller('login-controller', function ($scope, $mdToast) {
    $scope.user = {
        Username: null,
        Password: null
    };

    $scope.login = function () {
        var loginString = apiUrl + '/login?username=';
        loginString = loginString + $scope.user.Username;
        loginString = loginString + '&password=' + $scope.user.Password;

        $.ajax(loginString)
        .success(function (newSession) {
            localStorage.setItem('session', JSON.stringify(newSession));
            session = newSession;
            window.location.replace('/admin/dashboard.html');
        })
        .error(function (error) {
            $mdToast.show({
                controller: 'ToastCtrl',
                templateUrl: '/templates/error-alert.html',
                hideDelay: 6000,
                position: 'bottom right left',
                locals: {errorString: JSON.stringify(error)}
            });
            //loginScope.showError(error);
        });

    }
});

app.controller('ToastCtrl', function ($scope, $mdToast, errorString) {

    $scope.error = JSON.parse(errorString);

    $scope.closeToast = function () {
        $mdToast.hide();
    };
});