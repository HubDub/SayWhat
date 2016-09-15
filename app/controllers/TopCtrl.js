"use strict";

app.controller("TopCtrl", function($scope, $location, $window, AuthFactory) {
  $scope.isLoggedIn = false;

let currentUser = null;

  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      currentUser = user.uid;

      $scope.isLoggedIn = true;
      console.log("current user logged in?", user.uid);


    } else {
      currentUser = null;
      $scope.isLoggedIn = false;
      $window.location.href = "#/landing";
    }
    $scope.$apply();
  });

  $scope.getUser = function () {
    return currentUser;
  };

  $scope.logout = function() {
    AuthFactory.logoutUser()
      .then(function(data) {
        console.log("you are logged out", data);
      });
  };
});