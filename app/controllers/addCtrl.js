(function (mainApp) {
    mainApp.controller('addCtrl', ['$scope', '$http', 'Upload', 'toastr', function ($scope, $http, Upload ,toastr) {

        $scope.newMeme = {
            title: "",
            description: "",
            author: "",
            imgUrl: ""
        };

        $scope.canvas = {};
        $scope.fileChoosen = false;

        $scope.saveMeme = function (meme) {
            $scope.newMemeForm.$setSubmitted();
            if ($scope.newMemeForm.$invalid) {
                toastr.error('Podane dane są niepoprawne');
                return;
            }
            var image = new Image();
            image.src = $scope.canvas.element.toDataURL();
            //window.myImg = image;
            Upload.upload({
                url: 'meme/upload',
                method: 'POST',
                files: image,
                data: meme
            }).then(function (resp) {
                $timeout(function () {
                    toastr.success('Mem ' + meme.title + ' dodany');
                });
            }, null, function (evt) {
                var progressPercentage = parseInt(100.0 *
                    evt.loaded / evt.total);
                console.log ('progress: ' + progressPercentage +
                    '% ');
            });
        };

        $scope.generateMeme = function () {
            var element = $scope.canvas.element;
            var context = element.getContext('2d');
            var x = element.width / 2;
            var y = element.height / 8;

            element.width = element.width; // a little hacky...

            //setting background image
            if ($scope.fileChoosen){
                context.drawImage($scope.canvas.img, 0, 0, element.width, element.height);
            }

            //generating title
            context.font = $scope.canvas.titleSize + "px  Impact";
            context.fillStyle = 'white';
            context.strokeStyle = 'black';
            context.textAlign = 'center';
            context.fillText($scope.newMeme.title.toUpperCase(), x, y);
            context.lineWidth = 2;
            context.strokeText($scope.newMeme.title.toUpperCase(), x, y);

            //generating description
            context.font = $scope.canvas.descriptionSize + "px  Impact";
            x = element.width / 2;
            y = element.height - (element.height / 8);
            context.fillText($scope.newMeme.description.toUpperCase(), x, y);
            context.lineWidth = 2;
            context.strokeText($scope.newMeme.description.toUpperCase(), x, y);
        };

        $scope.loadImage = function(file){
            var fr = new FileReader();
            fr.onload = function(){
                var img = new Image();
                img.onload = function(){
                    $scope.fileChoosen = true;
                    $scope.canvas.img = img;
                    $scope.generateMeme();
                };
                img.src = fr.result;
            };
            fr.readAsDataURL(file);
        };


        $scope.upload = function () {
            var image = new Image();
            image.src = $scope.canvas.element.toDataURL();
            window.myImg = image;
            return;
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
                $scope.canvas.titleSize = 50;
                $scope.canvas.descriptionSize = 30;
                $scope.canvas.element = el[0];
                $scope.canvas.element.width = 600;
                $scope.canvas.element.height = 450;
            }
        }
    });
}(angular.module('mainApp')));
