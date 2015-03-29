define(['app'], function (app) {

    app.controller('file-not-found', function ($scope, siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('404 - File Not Found');
        searchEngineOptimiser.setDescription('Looks like you tottered into the wrong place!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'getsett']);
        siteShell.setTitle('What the Hell?!');

        $scope.message = 'You should really know better being a fancy content managing user, tut tut! Get back to work!!!';
    });
});