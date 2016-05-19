(function(mainApp) {
    mainApp.controller('memeCtrl', ['$scope', '$stateParams', '$state', '$http', 'toastr', '$location', '$anchorScroll',
        function($scope, $stateParams, $state, $http, toastr, $location, $anchorScroll) {
            "use strict";

            $scope.memeData = null;
            $scope.edition = false;
            $scope.editedMeme = null;
            $scope.commentBody = '';

            //############### API functions ###################
            var getMeme = function() {
                $scope.edition = false;
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

            var addComment = function(memeId, comment) {
                $http.put('/meme/' + memeId + '/comment', comment).then(function(res) {
                    toastr.success('Dodano komentarz');
                    $scope.commentBody = '';
                    getMeme();
                }, function(res) {
                    console.log('error' + res.data);
                    toastr.error('Błąd dodawania komentarza');
                });
            };

            var removeComment = function(memeId, comment) {
                $http.delete('/meme/' + memeId + '/comment/' + comment._id).then(function(res) {
                    toastr.success('Usunięto komentarz');
                    getMeme();
                }, function(res) {
                    console.log('error' + res.data);
                    toastr.error('Błąd usuwania komentarza');
                });
            };

            var updateComment = function(memeId, comment) {
                $http.put('/meme/' + memeId + '/comment/' + comment._id, comment).then(function(res) {
                    toastr.success('Zaktualizowano komentarz');
                    getMeme();
                }, function(res) {
                    console.log('error' + res.data);
                    toastr.error('Błąd aktualizowania komentarza');
                });
            };

            var updateMeme = function(meme, isLike) {
                delete meme.image; //request cannot be too large!
                $http.put('/meme/', meme).then(function(res) {
                    if (isLike !== undefined) {
                        if (isLike === true) {
                            toastr.success('Lubisz mema ' + meme.title);
                        } else {
                            toastr.success('Nie lubisz mema ' + meme.title);
                        }
                    } else {
                        toastr.success('Zaktualizowano mema ' + meme.title);
                    }
                    getMeme();
                }, function(res) {
                    console.log('error' + res.data);
                    toastr.error('Błąd aktualizacji mema');
                });
            };

            var removeMeme = function(meme) {
                $http.delete('/meme/' + meme._id).then(function(res) {
                    toastr.success('Mem ' + meme.title + ' usunięty');
                    $state.go('main');
                }, function(res) {
                    toastr.error('Bład usuwania mema');
                    console.log('error' + res.data);
                });
            };


            //############### View functions ###################
            $scope.editMeme = function() {
                if ($scope.edition)
                    $scope.edition = false;
                else
                    $scope.edition = true;
            };

            $scope.addComment = function(commentBody) {
                //TODO replace author data
                var comment = {
                    body: commentBody,
                    author: {
                        avatar: '../resources/img/avatar_default.png',
                        name: 'luke',
                        id: 0
                    },
                    like: 0
                };
                addComment($scope.memeData._id, comment);
            };

            $scope.updateComment = function(comment) {
                updateComment($scope.memeData._id, comment);
            };

            $scope.removeComment = function(comment) {
                removeComment($scope.memeData._id, comment);
            };

            $scope.updateMeme = function(meme) {
                updateMeme(meme);
            };

            $scope.removeMeme = function(meme) {
                removeMeme(meme);
            };

            $scope.likeMeme = function(meme) {
                meme.like++;
                updateMeme(meme, true);
            };

            $scope.unlikeMeme = function(meme) {
                meme.like--;
                updateMeme(meme, false);
            };

            $scope.editComment = function(comment) {
                if (comment.Edition) {
                    comment.Edition = false;
                } else {
                    comment.Edition = true;
                }
            };

            $scope.scrollTo = function(id) {
                $location.hash(id);
                $anchorScroll();
                document.getElementById("commentBody").focus();
            };

            $scope.init = function() {
                getMeme();
            }();

        }
    ]);
}(angular.module('mainApp')));
