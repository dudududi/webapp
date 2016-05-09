(function (mainApp) {
    "use strict";
    mainApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/main");
        $stateProvider
            .state('main', {
                url: "/main/page/:page",
                templateUrl: "templates/mainPage.html",
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                    $scope.page = $stateParams.page;
                }]
            })
            .state('random', {
                url: "/random",
                templateUrl: "templates/random.html"
            })
            .state('meme', {
                url: "/meme/:memeId",
                templateUrl: "templates/meme.html",
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                   $scope.memeId = $stateParams.memeId;
               }]
            })
            .state('waiting', {
                url: "/waiting/page/:page",
                templateUrl: "templates/waiting.html",
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                    $scope.page = $stateParams.page;
                }]
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
