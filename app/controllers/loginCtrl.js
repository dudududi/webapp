/**
 * Created by Szymon on 19.03.2016.
 */
(function (mainApp) {
    mainApp.controller('loginCtrl', ['$scope', function ($scope, $mdDialog) {
        "use strict";

        var organizatorEv;

        this.openMenu = function ($mdOpenMenu, ev) {
            organizatorEv = ev;
            $mdOpenMenu(ev);
        };
    }]);
}(angular.module('mainApp')));