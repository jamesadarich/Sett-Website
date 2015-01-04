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


    $scope.addArticle = function (article) {
        $scope.articles.push(article);
        $scope.$apply();
    };

    $scope.deleteArticle = function (article) {
        $.ajax({
            type: 'DELETE',
            url: apiUrl + '/article?id=' + article.Id,
            headers: {
                'Authorization': session.Id
            }
        })
        .success(function (response) {
            var index = $scope.articles.indexOf(article);
            $scope.articles.splice(index, 1);
            $scope.$apply();
        });
    }
});