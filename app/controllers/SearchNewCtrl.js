"use strict";

app.controller("SearchNewCtrl", function($scope, PhraseFactory, $location) {
  let searchedPhrases = [];

  $scope.searchExisting = function(subject) {
    console.log("SearchNewCtrl.searchExisting subject chosen: ", subject);
    PhraseFactory.getSearchPhrase()
      .then((phraseObjects) => {
        // console.log("after promise in searchExisting:", phraseObjects);
        //got the object back. now I want to assign their FB id as the phraseid property on each object and put them in an array so I can display them.

        for (var phrase in phraseObjects) {
          // console.log(phrase);
          phraseObjects[phrase].phraseid = phrase;
          searchedPhrases.push(phraseObjects[phrase]);
        }
      console.log("SearchNewCtrl.searchExisting put in array:", searchedPhrases);
      $scope.searchedPhrases = searchedPhrases;
      });
  }

  $scope.removePhraseFromList = function(index) {
    console.log("removePhraseFromList: ", index);
    $scope.searchedPhrases.splice(index, 1);
    console.log(searchedPhrases);
  }
});