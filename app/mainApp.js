(function () {
    angular.module('mainApp', ['ui.router','ngMaterial','angular-loading-bar','toastr', 'ngMaterial', 'ngMessages']).config(function(toastrConfig) {
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
          });

        $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
            return{
                'request': function (config) {
                    config.headers = config.headers || {};
                    if(window.localStorage){
                        config.headers.Authorization = 'Bearer '+window.localStorage.token;
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
      });
}());
