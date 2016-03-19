(function (mainApp) {
    mainApp.controller('mainPageCtrl', ['$scope','$http','toastr',  function ($scope,$http,toastr) {
        "use strict";

        $scope.memeData = null;
        $scope.isAdmin = true;


        var getMeme = function(){
            $http.get('/meme').then(function(res) {
                $scope.memeData = res.data;
            },function(res) {
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


        $scope.init =function() {
            getMeme();
        }();




    }]);
}(angular.module('mainApp')));
