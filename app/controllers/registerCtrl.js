/**
 * Created by Szymon on 19.03.2016.
 */
(function (mainApp) {
    mainApp.controller('registerCtrl', ['$rootScope', '$scope', '$location', '$window', 'Main',
        function ($rootScope, $scope, $location, $window, Main) {
        "use strict";
        $scope.user={
            login:'',
            email:'',
            password:''
        };

        $scope.clearForm = function () {
            $scope.user ={
                login:'',
                email:'',
                password:''
            };
        };

        $scope.register = function () {
            var formData={
                login: $scope.user.login,
                email: $scope.user.email,
                password: $scope.user.password
            }

            Main.save(formData, function (res) {
                if(res.type == false){
                    alert(res.data)
                } else{
                    $window.localStorage.token = res.data.token;
                    $window.location = "/main"
                }
            }, function () {
                $rootScope.error = 'Failed to register';
            })
        }
    }]);
}(angular.module('mainApp')));