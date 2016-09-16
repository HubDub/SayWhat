"use strict";

app.controller("SearchNewCtrl", function($scope, PhraseFactory, $location) {

  $scope.searchExisting = function() {
    let searchedPhrases = [];
    let subjectVal = $scope.subject;
    let measureVal = $scope.measure;
    // console.log("SearchNewCtrl.searchExisting subjectVal: ", subjectVal);
    // console.log("SearchNewCtrl.searchExisting measureval: ", measureVal);

    if (subjectVal === undefined) {
        alert("you must choose a subject");
        //this doesn't work. need to add some type of stop that will force them to choose a subject, unless we want them to pull the whole database?
    } else
    PhraseFactory.getSearchPhrase(subjectVal)
      .then((phraseObjects) => {
        // console.log("after getSearchPhrase: ", phraseObjects);
        for (var phrase in phraseObjects) {
          phraseObjects[phrase].phraseid = phrase;
          // console.log("in for loop: uid = ", phraseObjects[phrase].uid);
          if (phraseObjects[phrase].uid === undefined) {
            // console.log("this phrase uid is undefined");
            if (measureVal === "all" || measureVal === undefined) {
              // console.log("inside measureval = all, undef: ", phraseObjects[phrase].measure);
              searchedPhrases.push(phraseObjects[phrase]);
            } else if (phraseObjects[phrase].measure === measureVal) {
              // console.log("this is in the else if measureval = all, undef so these phrases should have a measure other than that: ", phraseObjects[phrase]);
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