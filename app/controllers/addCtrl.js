(function(mainApp) {
    mainApp.controller('addCtrl', ['$scope', '$http','toastr', function($scope, $http, toastr) {
        "use strict";

        $scope.newMeme = {
            title: "",
            description: "",
            author: "",
            imgUrl: ""
        };

        $scope.saveMeme = function(meme) {
            $scope.newMemeForm.$setSubmitted();
            if ($scope.newMemeForm.$invalid){
                toastr.error('Podane dane są niepoprawne');
                return;
            }
            $http.post('/meme', meme).then(function(res) {
                toastr.success('Mem '+meme.title+' dodany');
                $scope.newMeme = {};
            }).catch(function(res) {
                toastr.error('Bład dodawania mema');
                console.log('error' + res);
                $scope.newMeme = {};
            });
        };

    }]);
}(angular.module('mainApp')));
