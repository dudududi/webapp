/**
 * Created by Szymon on 19.03.2016.
 */
(function (mainApp) {
    mainApp.controller('registerCtrl', ['$scope', function ($scope) {
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
    }]);
}(angular.module('mainApp')));