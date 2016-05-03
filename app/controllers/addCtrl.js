(function (mainApp) {
    mainApp.controller('addCtrl', ['$scope', '$http', 'Upload', 'toastr', function ($scope, $http, Upload ,toastr) {

        $scope.newMeme = {
            title: "",
            description: "",
            author: "",
            imgUrl: ""
        };

        $scope.saveMeme = function (meme) {
            $scope.newMemeForm.$setSubmitted();
            if ($scope.newMemeForm.$invalid) {
                toastr.error('Podane dane są niepoprawne');
                return;
            }
            $http.post('/meme', meme).then(function (res) {
                toastr.success('Mem ' + meme.title + ' dodany');
                $scope.newMeme = {};
            }).catch(function (res) {
                toastr.error('Bład dodawania mema');
                console.log('error' + res);
                $scope.newMeme = {};
            });
        };

        $scope.fileChoosen = false;
        $scope.canvasContext = undefined;

        $scope.loadImage = function(file){
            alert(file);
            console.log(file);
            window.myFile = file;
            var fr = new FileReader();
            fr.onload = function(){
                alert("file loaded");
                var img = new Image();
                img.onload = function(){
                    $scope.fileChoosen = true;
                    alert("image loaded");
                    $scope.canvasContext.drawImage(img, 0,0);
                };
                img.src = fr.result;
            };
            fr.readAsDataURL(file);
        };
        var upload = function (file) {
            var file = files[i];
            if (!file.$error) {
                Upload.upload({
                    url: 'meme/upload',
                    method: 'POST',
                    file: file,
                    data: {
                        username: $scope.username,
                        file: file
                    }
                }).then(function (resp) {
                    $timeout(function () {
                        $scope.log = 'file: ' +
                            resp.config.data.file.name +
                            ', Response: ' + JSON.stringify(resp.data) +
                            '\n' + $scope.log;
                    });
                }, null, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                        evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage +
                        '% ' + evt.config.data.file.name + '\n' +
                        $scope.log;
                });
            }
        }

    }]);
    mainApp.directive('memegenerator', function () {
        return {
            restrict: 'EA',
            template: '<canvas></canvas>',
            replace: true,
            link: function ($scope, el, attrs) {
                $scope.titleSize = 50;
                $scope.descriptionSize = 30;
                var c = el[0];
                c.height = 600;
                c.width = 600;
                $scope.canvasContext = c.getContext("2d");

                $scope.generateMeme = function () {
                    c.width = c.width;
                    $scope.canvasContext.font = $scope.titleSize + "px  Impact";
                    $scope.canvasContext.fillStyle = 'white';
                    $scope.canvasContext.strokeStyle = 'black';
                    var x1 = c.width / 2;
                    var y1 = c.height / 8;
                    $scope.canvasContext.textAlign = 'center';
                    $scope.canvasContext.fillText($scope.newMeme.title.toUpperCase(), x1, y1);
                    $scope.canvasContext.lineWidth = 2;
                    $scope.canvasContext.strokeText($scope.newMeme.title.toUpperCase(), x1, y1);

                    $scope.canvasContext.font = $scope.descriptionSize + "px  Impact";
                    var x = c.width / 2;
                    var y = c.height - (c.height / 8);
                    $scope.canvasContext.fillText($scope.newMeme.description.toUpperCase(), x, y);
                    $scope.canvasContext.lineWidth = 2;
                    $scope.canvasContext.strokeText($scope.newMeme.description.toUpperCase(), x, y);
                };
            }
        }
    });
}(angular.module('mainApp')));
