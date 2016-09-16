"use strict";

app.controller("UserPhrasesCtrl", function(PhraseFactory, $scope, $location, SearchTermData) {
  console.log("you are in the UserPhrasesCtrl");
  $scope.searchText = SearchTermData;
  //need to grab userId.
  let userId = $scope.$parent.getUser();
  // console.log("UserPhraseCtrl userId: ", userId);

  let userSavedPhrases = [];

  PhraseFactory.getUserSavedPhrases(userId)
    .then((savedUserObjects) => {
      // console.log("UserPhraseCtrl after getUserSavedPhrases: objs: ", savedUserObjects);
      for (var phrase in savedUserObjects) {
        // console.log("phrase id: ", phrase)
        savedUserObjects[phrase].phraseid = phrase;
        // console.log("phrase: ", savedUserObjects[phrase]);
        userSavedPhrases.push(savedUserObjects[phrase]);
      }
      console.log("after getUserSavedPhrases- userSavedPhrases array: ", userSavedPhrases);
      $scope.userSavedPhrases = userSavedPhrases;
    });

  $scope.removeUserPhraseFb = function(phraseId) {
    console.log("UserPhraseCtrl.removeUserPhraseFb-phraseId: ", phraseId);
    PhraseFactory.deleteUserPhrase(phraseId)
      .then( (response) => {
        console.log("removeUserPhraseFb after deleteUserPhrase - phrase should be deleted from FB");
        $location.url("/savedPhrases");
      });
  };
});