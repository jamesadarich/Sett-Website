if (apiUrl === undefined) {
    var apiUrl = 'http://api.getsett.net';
}

if (app === undefined) {
    var app = angular.module('get-sett-admin', ['ngMaterial']);
}

function handleUnauthorized() {
    document.location.href = '/admin/login.html';
}