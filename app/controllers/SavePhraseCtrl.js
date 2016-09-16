"use strict";

app.controller("SavePhraseCtrl", function ($scope, PhraseFactory, $routeParams, $location) {
  console.log("You are in SavePhraseCtrl");
  $scope.title = "Save Phrase in Your Saved Phrases";
  $scope.btnText = "Save";
  $scope.thePhrase = {};

  PhraseFactory.getOnePhrase($routeParams.phraseId)
    .then( (phraseObj) => {
      // console.log("after getOnePhrase then: ", phraseObj);
      $scope.thePhrase = phraseObj;
      // console.log("after uid added to obj: ", $scope.thePhrase);
    });

  $scope.saveOnePhrase = function() {
    // console.log("SavePhraseCtrl.saveOnePhrase, phrase: ", $scope.thePhrase);
    let userId = $scope.$parent.getUser();
    // console.log("SavePhraseCtrl.saveOnePhrase: userId: ", userId);
    $scope.thePhrase.uid = userId;
    PhraseFactory.saveExistingPhrase($scope.thePhrase)
      .then( (response) => {
        $location.url("/landing");
      });
  };

});