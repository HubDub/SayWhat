"use strict";

app.controller("CreatePhraseCtrl", function($scope, $location, PhraseFactory) {
  console.log("You are in CreatePhraseCtrl");
  $scope.title = "Create Your Phrase";
  $scope.btnText = "Save New Phrase";

  $scope.thePhrase = {
    subject: "",
    measure: "",
    phrase: "",
    employee: "",
    uid: $scope.$parent.getUser()
  };

  $scope.saveOnePhrase = function() {
    console.log("CreatePhraseCtrl.addNewUserPhrase");
    PhraseFactory.postNewUserPhrase($scope.thePhrase)
      .then ( (result) => {
        console.log("after postNewUserPhrase");
        $location.url("#/savedPhrases");
      });
  };
});