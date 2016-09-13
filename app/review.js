"strict use";

console.log("review.js is on deck");
//first create the angular module variable
var app = angular.module("ReviewPhraseApp", [ngRoute]);

app.config(function($routeProvider) {
  console.log("we are inside app.config");
  $routeProvider.
    when("/landing", {
      templateUrl: "partials/Landing.html",
      controller: "LandingPageCtrl"
    });
});
