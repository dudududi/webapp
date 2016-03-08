(function (APP) {
    "use strict";
    APP.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/home.html"
            });
    }]);
}(angular.module('APP')));
