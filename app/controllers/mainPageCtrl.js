(function (mainApp) {
    mainApp.controller('mainPageCtrl', ['$scope','$http','toastr','$stateParams','$state',  function ($scope,$http,toastr,$stateParams,$state) {
        "use strict";

        $scope.memeData = null;
        $scope.currentPage = 1;
        $scope.allPages = {};

        var getMeme = function(currentPage){
            $http.get('/meme/page/'+currentPage).then(function(res) {
                $scope.memeData = res.data;
            },function(res) {
                toastr.error('Bład pobierania danych'+ res.data);
                console.log('error' + res.data);
            });

        };

        var getMemeCount = function(currentPage){
            $http.get('/meme').then(function(res) {
                $scope.allPages = res.data;

            },function(res) {
                toastr.error('Bład pobierania danych'+ res.data);
                console.log('error' + res.data);
            });
        };

        $scope.removeMeme = function(meme){
            $http.delete('/meme/'+meme._id).then(function(res) {
                toastr.success('Mem '+meme.title+' usunięty');
            },function(res) {
                toastr.error('Bład usuwania mema');
                console.log('error' + res.data);
            });

            getMeme();
        };

        var updateMeme = function(meme,isLike) {
            $http.put('/meme/',meme).then(function(res) {
                if(isLike){
                    toastr.success('Lubisz mema '+meme.title);
                }
                else {
                    toastr.success('Nie lubisz mema '+meme.title);
                }
                getMeme();
            },function(res) {
                console.log('error' + res.data);
                toastr.error('Błąd aktualizacji mema');
            });
        };

        $scope.likeMeme = function(meme){
            meme.like++;
            updateMeme(meme,true);
        };

        $scope.unlikeMeme = function(meme){
            meme.like--;
            updateMeme(meme,false);
        };

        $scope.nextPage = function(){
            $scope.currentPage++;
            $state.go('waiting',{page:$scope.currentPage});
        };

        $scope.previousPage = function(){
            $scope.currentPage--;
            $state.go('waiting',{page:$scope.currentPage});
        };

        $scope.init =function() {
            getMeme($scope.currentPage);
            getMemeCount();
        }();
    }]);
}(angular.module('mainApp')));
