app.controller("article-controller", function ($scope) {
    $scope.articles = [];

    $.get(apiUrl + '/articles')
    .success(function (articles) {
        $scope.articles = articles;
        $scope.$apply();
    });

    $scope.newArticle = function () {

        window.location.replace('/admin/edit-article.html');
    }
});