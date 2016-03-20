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
    mainApp.directive('memegenerator', function () {
        return {
            restrict: 'EA',
            template:'<canvas></canvas>',
            replace: true,
            link: function ($scope, el, attrs) {
                $scope.titleSize = 50;
                $scope.descriptionSize = 30;
                var c = el[0];
                c.height = 600;
                c.width = 600;
                var ctx = c.getContext("2d");

                $scope.generateMeme = function () {
                    c.width = c.width;
                    ctx.font = $scope.titleSize + "px  Impact";
                    ctx.fillStyle = 'white';
                    ctx.strokeStyle = 'black';
                    var x1 = c.width / 2;
                    var y1 = c.height / 8;
                    ctx.textAlign = 'center';
                    ctx.fillText($scope.newMeme.title.toUpperCase(), x1, y1);
                    ctx.lineWidth = 2;
                    ctx.strokeText($scope.newMeme.title.toUpperCase(), x1, y1);

                    ctx.font = $scope.descriptionSize + "px  Impact";
                    var x = c.width / 2;
                    var y = c.height - (c.height / 8);
                    ctx.fillText($scope.newMeme.description.toUpperCase(), x, y);
                    ctx.lineWidth = 2;
                    ctx.strokeText($scope.newMeme.description.toUpperCase(), x, y);
                };
            }
        }
    });
}(angular.module('mainApp')));
