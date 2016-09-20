"use strict";

app.controller("LoginCtrl", function($scope, $window, AuthFactory ) {
  $scope.account = {
    email: "",
    password: ""
  };

  $scope.register = () => {
    console.log("you clicked register");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then( (userData) => {
      console.log("newUser", userData.uid );
      $scope.login();  //this logs them in so they don't have to login after creating a log in
    }, (error) => {
      console.log(`Error creating user: ${error}`);
    });
  };

  $scope.login = () => {
    console.log("you clicked login");
    AuthFactory.loginUser($scope.account)
      .then( (data) => {
        console.log("logged in user: ", data.uid);
        if (data) {
        $window.location.href = "#/savedPhrases";
        } else {
          $window.location.href = "#/login";
        }
        console.log("data from login ", data);
      }, (error) => {
      console.log("Error logging in", error);
      });
    };
});