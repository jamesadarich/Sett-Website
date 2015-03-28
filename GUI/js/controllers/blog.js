define(['app'], function (app) {
    app.controller('blog', function ($scope, $http, siteShell, searchEngineOptimiser) {

        searchEngineOptimiser.setTitle('Blog');
        searchEngineOptimiser.setDescription('The random mumblings of that guy in the corner, yes that guy...');
        searchEngineOptimiser.setKeyWords(['Sett', 'software', 'Get Sett', 'Blog', 'getsett']);

        siteShell.setTitle('Blog');

        $scope.articles = [];

        $http.get(app.apiUrl + '/articles')
        .success(function (articles) {
            $scope.articles = articles;
        });
    });
});