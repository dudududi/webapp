(function () {
    angular.module('mainApp', ['ui.router','ngMaterial','angular-loading-bar','toastr', 'ngMaterial', 'ngMessages', 'ngFileUpload']).config(function(toastrConfig) {
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
      });
}());
