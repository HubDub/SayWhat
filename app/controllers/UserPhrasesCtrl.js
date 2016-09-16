"use strict";

app.controller("UserPhrasesCtrl", function(PhraseFactory, $scope) {
  console.log("you are in the UserPhrasesCtrl");

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
});