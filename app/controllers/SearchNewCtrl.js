"use strict";

app.controller("SearchNewCtrl", function($scope, PhraseFactory, $location) {
  let searchedPhrases = [];

  $scope.searchExisting = function() {
    let subjectVal = $scope.subject;
    let measureVal = $scope.measure;
    console.log("SearchNewCtrl.searchExisting subject chosen: ", subjectVal);
    console.log("SearchNewCtrl.searchExisting measure chosen: ", measureVal);
    if (subjectVal === "undefined") {
        // alert("you must choose a subject")
        //this doesn't work. need to add some type of stop that will force them to choose a subject, unless we want them to pull the whole database?
    } else
    PhraseFactory.getSearchPhrase(subjectVal)
      .then((phraseObjects) => {
        console.log("after getSearchPhrase: ", phraseObjects);
        //got the object back. now I want to assign their FB id as the phraseid property on each object and put them in an array so I can display them.
        for (var phrase in phraseObjects) {
          phraseObjects[phrase].phraseid = phrase;
          console.log("in for loop: uid = ", phraseObjects[phrase].uid)
          if (phraseObjects[phrase].uid === undefined) {
            console.log("this phrase uid is undefined");
            if (measureVal === "all" || "undefined") {
            searchedPhrases.push(phraseObjects[phrase]);
            } else if (phraseObjects[phrase].measure === measureVal) {
              searchedPhrases.push(phraseObjects[phrase]);
              }
          }
        }
      $scope.searchedPhrases = searchedPhrases;
      console.log(searchedPhrases);
      });
  };

  $scope.removePhraseFromList = function(index) {
    // console.log("removePhraseFromList: ", index);
    $scope.searchedPhrases.splice(index, 1);
    // console.log(searchedPhrases);
  };

  // $scope.getPhraseId = function(phraseId) {
  //   console.log("SearchNewCtrl.getPhraseId: ", phraseId);
  //   $location.url("/phrase/:phraseid/save");
  // }
});