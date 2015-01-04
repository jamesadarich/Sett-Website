var app = angular.module('sett-site-admin', ['ngMaterial', 'textAngular']);

app.controller('article-revision-controller', function ($scope) {

    $scope.articleRevision = {};

    $.ajax({
        type: 'GET',
        url: apiUrl + '/article?id=' + queryString.parameter('id')
    })
    .success(function (article) {
        $scope.articleRevision = article.Revisions[article.Revisions.length - 1];
        $scope.$apply();
    });

    $scope.newRevision = function () {
        $.ajax(
                    {
                        type: 'POST',
                        headers: {
                            'Authorization': session.Id
                        },
                        url: apiUrl + '/article-revision',
                        data: JSON.stringify($scope.articleRevision),
                        contentType: 'application/json'
                    })
        .success(function (newArticleRevision) {
            articleRevision = newArticleRevision;
        })
        .error(function (error) {
            window.location.replace("/admin/login.html");
        });
    };


});

$(document).ready(function () {

    $('#image-upload').click(function () {
        var formData = new FormData($('form')[0]);
        $.ajax({
            url: '/api/image/upload',  //Server script to process data
            type: 'POST',
            headers: {
                'Authorization': session.Id
            },
            xhr: function () {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { // Check if upload property exists
                    myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            //Ajax events
            //beforeSend: beforeSendHandler,
            //success: completeHandler,
            //error: errorHandler,
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        })
        .success(function (image) {
            articleRevision.FeaturedImage = image;
        });
    });
});

function progressHandlingFunction(e){
    if (e.lengthComputable) {
        console.log("Loaded: " + e.loaded + ", Total: " + e.total);
        //$('progress').attr({value:e.loaded,max:e.total});
    }
}