"use strict";

app.controller("EditPhraseCtrl", function($scope, PhraseFactory, $routeParams, $location, ngToast) {
  console.log("You are in EditPhraseCtrl");
  $scope.title = "Edit Your Phrase";
  $scope.btnText = "Save";

  PhraseFactory.getOnePhrase($routeParams.phraseId)
    .then( (phraseObj) => {
      console.log("after getOnePhrase then: ", phraseObj);
      $scope.thePhrase = phraseObj;
      console.log("after uid added to obj: ", $scope.thePhrase);
  });

  $scope.saveOnePhrase = function() {
    ngToast.create({
          className: "info",
          content: "You have saved this phrase!"
        });
    let phraseId = $routeParams.phraseId;
    console.log("EditPhraseCtrl.saveOnePhrase, phraseid: ", phraseId);
    console.log("EditPhraseCtrl.saveOnePhrase, phrase: ", $scope.thePhrase);
    PhraseFactory.patchExistingPhrase(phraseId, $scope.thePhrase)
      .then( (response) => {
        $location.url("/savedPhrases");
      });
  };
});