"use strict";

app.controller("UserPhrasesCtrl", function(PhraseFactory, $scope, $location, SearchTermData, ngToast) {
  console.log("you are in the UserPhrasesCtrl");
  $scope.searchText = SearchTermData;
  //need to grab userId.
  let userId = $scope.$parent.getUser();
  // console.log("UserPhraseCtrl userId: ", userId);


  PhraseFactory.getUserSavedPhrases(userId)
    .then((savedUserObjects) => {
      let userSavedPhrases = [];
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
    ngToast.create({
          className: "success",
          // horizontalPosition: "left",
          content: "You have deleted this phrase from your saved phrases!"
        });
    // console.log("UserPhraseCtrl.removeUserPhraseFb-phraseId: ", phraseId);
    PhraseFactory.deleteUserPhrase(phraseId)
      .then( (response) => {
        PhraseFactory.getUserSavedPhrases(userId)
          .then((savedUserObjects) => {
            // console.log("removeUserPhraseFb after get list again", savedUserObjects);
            let userSavedPhrases = [];
            // console.log("after delete userSavedPhrases should be empty: ", userSavedPhrases);
            for (var phrase in savedUserObjects) {
              savedUserObjects[phrase].phraseid = phrase;
              userSavedPhrases.push(savedUserObjects[phrase]);
            }
            // console.log("after delete, after getUserSavedPhrases, should be array of objects w/out deleted phrase: ", userSavedPhrases);
            $scope.userSavedPhrases = userSavedPhrases;
          });
      });
  };
});