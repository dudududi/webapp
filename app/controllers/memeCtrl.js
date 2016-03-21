(function(mainApp) {
    mainApp.controller('memeCtrl', ['$scope', '$stateParams', '$state', '$http', 'toastr', function($scope, $stateParams, $state, $http, toastr) {
        "use strict";

        $scope.memeData = null;
        $scope.edited = false;
        $scope.editedMeme = null;

        var getMeme = function() {
            $scope.edited = false;
            $scope.editedMeme = null;
            $http.get('/meme/' + $stateParams.memeId).then(function(res) {
                if (res.data.name === "CastError") {
                    toastr.error('Błąd pobierania mema');
                } else {
                    $scope.memeData = res.data;
                    $scope.editedMeme = angular.copy($scope.memeData);
                }
            }, function(res) {
                console.log('error' + res.data);
                toastr.error('Błąd pobierania mema');
            });
        };

        $scope.editMeme = function() {
            if ($scope.edited)
                $scope.edited = false;
            else
                $scope.edited = true;
        };

        $scope.saveMeme = function(meme) {
            updateMeme(meme);
        };

        var updateMeme = function(meme, isLike) {
            $http.put('/meme/', meme).then(function(res) {
                if (isLike !== undefined) {
                    if (isLike === true) {
                        toastr.success('Lubisz mema ' + meme.title);
                    } else {
                        toastr.success('Nie lubisz mema ' + meme.title);
                    }
                }
                else{
                    toastr.success('Zaktualizowano mema ' + meme.title);
                }
                getMeme();
            }, function(res) {
                console.log('error' + res.data);
                toastr.error('Błąd aktualizacji mema');
            });
        };

        $scope.removeMeme = function(meme) {
            $http.delete('/meme/' + meme._id).then(function(res) {
                toastr.success('Mem ' + meme.title + ' usunięty');
                $state.go('main');
            }, function(res) {
                toastr.error('Bład usuwania mema');
                console.log('error' + res.data);
            });
        };

        $scope.likeMeme = function(meme) {
            meme.like++;
            updateMeme(meme, true);
        };

        $scope.unlikeMeme = function(meme) {
            meme.like--;
            updateMeme(meme, false);
        };


        $scope.init = function() {
            getMeme();
        }();

    }]);
}(angular.module('mainApp')));
