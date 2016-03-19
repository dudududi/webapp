(function (mainApp) {
    "use strict";
    mainApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('main', {
                url: "/main",
                templateUrl: "templates/mainPage.html"
            })
            .state('random', {
                url: "/random",
                templateUrl: "templates/random.html"
            })
            .state('meme', {
                url: "/meme/{id}",
                templateUrl: "templates/meme.html"
            })
            .state('waiting', {
                url: "/waiting",
                templateUrl: "templates/waiting.html"
            })
            .state('add', {
                url: "/add",
                templateUrl: "templates/add.html"
            })
            .state('register', {
                url: "/register",
                templateUrl: "templates/register.html"
            });

    }]);
}(angular.module('mainApp')));
