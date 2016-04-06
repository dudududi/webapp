/**
 * Created by Szymon on 19.03.2016.
 */
(function (mainApp) {
    mainApp.controller('loginCtrl', ['$scope', function ($scope, $mdDialog) {
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

        var organizatorEv;

        this.openMenu = function ($mdOpenMenu, ev) {
            $scope.reset();
            organizatorEv = ev;
            $mdOpenMenu(ev);
        };
    }]);
}(angular.module('mainApp')));