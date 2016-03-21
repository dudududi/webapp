(function(mainApp) {
  mainApp.controller('appCtrl',['$scope','$mdDialog',  function($scope,$mdDialog) {
    "use strict";
    $scope.userLogin = "user_name";
    $scope.isAdmin = true;  //TODO change to user roles 

    $scope.menuTabs = [{
      url: "main",
      name: "Głowna",
      hidden: false
    }, {
      url: "waiting",
      name: "Oczekujące",
      hidden: false
    }, {
      url: "random",
      name: "Losuj",
      hidden: false
    }, {
      url: "add",
      name: "Dodaj",
      hidden: false
    }, {
      url: "register",
      name: "Rejestracja",
      hidden: false
    }];

    var originatorEv;
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.logOut = function () {
      $mdDialog.show(
        $mdDialog.alert()
          .targetEvent(originatorEv)
          .clickOutsideToClose(true)
          .parent('body')
          .title('Wylogowywanie')
          .textContent('Czy napewno chcesz się wylogować?')
          .ok('Tak')
      );
      originatorEv = null;
    };

    $scope.go = function (path) {
      $state.go(path);
    };

  }]);
}(angular.module('mainApp')));
