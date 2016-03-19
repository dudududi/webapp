(function(mainApp) {
    mainApp.controller('addCtrl', ['$scope', '$http','toastr', function($scope, $http,toastr) {
        "use strict";

        $scope.newMeme = {};

        $scope.saveMeme = function(meme) {
            $http.post('/meme', meme).then(function(res) {
                toastr.success('Mem '+meme.title+' dodany');
                $scope.newMeme = {};
            }, function(res) {
                toastr.error('Bład dodawania mema');
                console.log('error' + res);
                $scope.newMeme = {};
            });
        };

    }]);
}(angular.module('mainApp')));
