define(['app', 'siteShell'], function (app) {
    app.controller('dashboard', function ($scope, siteShell) {
        siteShell.setTitle('Dashboard');
    });
});