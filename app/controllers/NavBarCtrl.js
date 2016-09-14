"use strict";


app.controller("NavBarCtrl", function($scope, $location) {
  // $scope.searchText = SearchTermData;
  //not doing search in navbar.
  console.log("navbarcontroller is here");
  $scope.navItems = [
    {url: "#/logout", name: "Logout", showState: "$parent.isLoggedIn"},
    {url: "#/login", name: "Login", showState: "!$parent.isLoggedIn"}
    // {url: "#/items/list", name: "All Items", showState: "$parent.isLoggedIn"},
    // {url: "#/items/new", name: "New Items", showState: "$parent.isLoggedIn"}
  ];

  $scope.isActive = (viewLocation) => viewLocation === $location.path();

});
