(function (mainApp) {
    mainApp.controller('mainPageCtrl', ['$scope','$http','toastr',  function ($scope,$http,toastr) {
        "use strict";

        $scope.memeData = null;

        var getMeme = function(){
            $http.get('/meme').then(function(res) {
                $scope.memeData = res.data;
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

        $scope.init =function() {
            getMeme();
        }();




    }]);
}(angular.module('mainApp')));
