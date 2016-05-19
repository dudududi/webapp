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
            var blobBin = atob($scope.canvas.element.toDataURL().split(",")[1]);
            var array = [];
            for (var i = 0; i < blobBin.length; i++){
                array.push(blobBin.charCodeAt(i));
            }
            var file = new File([new Blob([new Uint8Array(array)], {type: 'image/png'})], "file");
            Upload.upload({
                url: 'meme',
                method: 'POST',
                data: {
                    file: file,
                    meme: meme
                }
            }).then(function (resp) {
                toastr.success('Mem ' + meme.title + ' dodany');
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
