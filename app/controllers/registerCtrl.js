/**
 * Created by Szymon on 19.03.2016.
 */
(function (mainApp) {
    mainApp.controller('registerCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function ($rootScope, $scope, $location, $localStorage, Main) {
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
                email: $scope.email,
                password: $scope.password
            }

            Main.save(formData, function (res) {
                if(res.type == false){
                    alert(res.data)
                } else{
                    $localStorage.token = res.data.token;
                    window.location = "/"
                }
            }, function () {
                $rootScope.error = 'Failed to register';
            })
        }
    }]);
}(angular.module('mainApp')));