/**
 * Created by Szymon on 19.03.2016.
 */
(function (mainApp) {
    mainApp.controller('loginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Main',
        function ($rootScope, $scope, $location, $window, Main, $mdDialog) {
        "use strict";
        $scope.user={
            login:'',
            password:''
        };

        $scope.reset = function () {
            $scope.user={
                login:'',
                password:''
            };
        };

        $scope.login = function(){
            var formData={
                login: $scope.user.login,
                password: $scope.user.password
            }

            Main.login(formData, function (res) {
                if(res.type == false){
                    alert(res.data)
                } else{
                    $window.localStorage.token = res.data.token;
                    window.location = "/#/main";
                }
            }, function () {
                $rootScope.error = 'Failed to login';
            })
        };

        $scope.logout = function () {
            Main.logout(function () {
                window.location="/";
            }, function(){
                alert("Failed to logout!");
            });
        };

        var organizatorEv;

        this.openMenu = function ($mdOpenMenu, ev) {
            $scope.reset();
            organizatorEv = ev;
            $mdOpenMenu(ev);
        };
        $scope.token = $window.localStorage.token;
    }]);
}(angular.module('mainApp')));