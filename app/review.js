"use strict";

// console.log("review.js is on deck");
//first create the angular module variable
var app = angular.module("ReviewPhraseApp", ["ngRoute", "ngToast"])
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
    when("/phrase/:phraseId/save", {
      templateUrl: "partials/phraseForm.html",
      controller: "SavePhraseCtrl",
      resolve: {isAuth},
      loginRequired: true
    }).
    when("/savedPhrases", {
      templateUrl: "partials/userPhrases.html",
      controller: "UserPhrasesCtrl",
      resolve: {isAuth}
    }).
    when("/phrase/:phraseId/edit", {
      templateUrl: "partials/phraseForm.html",
      controller: "EditPhraseCtrl",
      resolve: {isAuth}
    }).
    when("/phrase/new", {
      templateUrl: "partials/phraseForm.html",
      controller: "CreatePhraseCtrl",
      resolve: {isAuth}
    }).
    otherwise("/landing");
});

//this is the config for the ngToast provider to configure the toasts that I use later
app.config(['ngToastProvider', function(ngToast) {
  ngToast.configure({
    verticalPosition: 'top',
    horizontalPosition: 'center'
  });
}]);

app.run( ($location, FBCreds, $rootScope, AuthFactory) => {
  let postLogInRoute;
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
firebase.initializeApp(authConfig);

//this function allows me to capture their route if they are not logged in and then when they do log in send them back on that route.
  $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
    //if login required and you're logged out, capture the current path into the postLogInRoute var
        if (nextRoute.loginRequired && AuthFactory.isAuthenticated() === false) {
          postLogInRoute = $location.path();
          console.log("trying to capture path: ", postLogInRoute);
          $location.path('/login').replace();
        } else if (postLogInRoute && AuthFactory.isAuthenticated()) {
    //once logged in, redirect to the last route and reset it
          console.log("after login postroute: ", postLogInRoute);
          $location.path(postLogInRoute).replace();
          postLogInRoute = null;
        }
    });
});
