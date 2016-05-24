(function (mainApp) {
    "use strict";
    mainApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/main");
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
                url: "/meme/:memeId",
                templateUrl: "templates/meme.html",
                controller: ['$scope', '$stateParams', function ($scope, $stateParams) {
                   $scope.memeId = $stateParams.memeId;
               }]
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

        $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
            return{
                'request': function (config) {
                    config.headers = config.headers || {};
                    if($window.localStorage){
                        config.headers.Authorization = 'Bearer '+$window.localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if(response.status === 401 || response.status === 403){
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);

    }]);


}(angular.module('mainApp')));
