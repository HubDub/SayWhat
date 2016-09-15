"use strict";

// console.log("review.js is on deck");
//first create the angular module variable
var app = angular.module("ReviewPhraseApp", ["ngRoute"])
  .constant("FirebaseUrl", "https://review-phrases.firebaseio.com");

let isAuth = (AuthFactory) => new Promise( (resolve, reject) => {
  if (AuthFactory.isAuthenticated()) {
    console.log("authenticated user");
    resolve();
  } else {
    console.log("not authenticated user");
    reject();
  }
});

app.config(function($routeProvider) {
  console.log("we are inside app.config");
  $routeProvider.
    when("/landing", {
      templateUrl: "partials/Landing.html",
      controller: "LandingPageCtrl"
    }).
    when("/", {
      templateUrl: "partials/Landing.html",
      controller: "LandingPageCtrl"
    }).
    when("/search", {
      templateUrl: "partials/searchNew.html",
      controller: "SearchNewCtrl"
    }).
    when("/login", {
      templateUrl: "partials/login.html",
      controller: "LoginCtrl"
    }).
    otherwise("/landing");
});

app.run( ($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);
});