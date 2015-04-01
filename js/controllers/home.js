define(['app'], function (app) {

    app.controller('home', function (siteShell, searchEngineOptimiser) {
        searchEngineOptimiser.setTitle('Home');
        searchEngineOptimiser.setDescription('Sett is all about imagination, take a peak see!');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'Blog', 'getsett']);
        siteShell.setTitle('Home');
    });
});