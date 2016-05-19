(function (mainApp) {
    mainApp.controller('waitingCtrl', ['$scope','$http','toastr','$stateParams','$state', function ($scope,$http,toastr,$stateParams,$state ) {
        "use strict";

        $scope.memeData = null;
        $scope.currentPage = parseInt($stateParams.page);
        $scope.allPages = {};

        var getWaitingMeme = function (currentPage) {
            $http.get('/waitingmeme/page/' + currentPage).then(function (res) {
                $scope.memeData = res.data;
                getWaitingMemeCount();
            }, function (res) {
                toastr.error('Bład pobierania danych' + res.data);
                console.log('error' + res.data);
            });

        };

        var getWaitingMemeCount = function (currentPage) {
            $http.get('/waitingmeme').then(function (res) {
                $scope.allPages = res.data;

            }, function (res) {
                toastr.error('Bład pobierania danych' + res.data);
                console.log('error' + res.data);
            });
        };

        $scope.removeMeme = function (meme) {
            $http.delete('/meme/' + meme._id).then(function (res) {
                toastr.success('Mem ' + meme.title + ' usunięty');
            }, function (res) {
                toastr.error('Bład usuwania mema');
                console.log('error' + res.data);
            });

            getWaitingMeme();
        };

        var updateMeme = function (meme, isLike) {
            delete meme.image; //request cannot be too large!
            $http.put('/meme/', meme).then(function (res) {
                if (isLike) {
                    toastr.success('Lubisz mema ' + meme.title);
                }
                else {
                    toastr.success('Nie lubisz mema ' + meme.title);
                }
                getWaitingMeme();
            }, function (res) {
                console.log('error' + res.data);
                toastr.error('Błąd aktualizacji mema');
            });
        };

        $scope.likeMeme = function (meme) {
            meme.like++;
            if(meme.like > 5)
                meme.moved_to_main_at = new Date();
            updateMeme(meme, true);
        };

        $scope.unlikeMeme = function (meme) {
            meme.like--;
            updateMeme(meme, false);
        };

        $scope.nextPage = function () {
            $scope.currentPage++;
            $state.go('waiting',{page:$scope.currentPage});
        };

        $scope.previousPage = function () {
            $scope.currentPage--;
            $state.go('waiting',{page:$scope.currentPage});
        };

       

        $scope.init = function () {
            getWaitingMeme($scope.currentPage);
        }();
    }]);
}(angular.module('mainApp')));

