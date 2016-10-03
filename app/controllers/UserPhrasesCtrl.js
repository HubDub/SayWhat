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

  // function for the suggested conversations modal
  $scope.suggestions = function (subject) {
    let subjectSuggestion = {};
    console.log("in suggestions:", subject);
    PhraseFactory.getSuggestion(subject)
      .then((savedSuggestion) => {
        //this will check to see if the object we pulled from FB is empty or not (if they created a new subject then it will be). if so, I create a new one to inject the text into the modal
        if (Object.keys(savedSuggestion).length === 0 && savedSuggestion.constructor === Object) {
          // console.log("suggestion is undefined");
          $scope.subjectSuggestion = {
            question : "Decide what question best suits the specific subject you are considering. Ask open ended question about how they would perceive their performance from your's or a customer's perspective. Encourage honest reflection.",
            convo : "Once they've considered their own performance, agree upon realistic and clear goals that will help them achieve performance improvement."
          };
          // console.log("when no object: ", subjectSuggestion);

        } else {
          for (var suggestion in savedSuggestion) {
          }
          // console.log("saved suggestion: ", savedSuggestion);
          $scope.subjectSuggestion = savedSuggestion[suggestion];
        }
      })
  };

});