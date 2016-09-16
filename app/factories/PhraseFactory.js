"use strict";

app.factory("PhraseFactory", function ($q, $http, FirebaseUrl) {
  console.log("you are in PhraseFactory");

  let getSearchPhrase = function(subjectVal) {
    console.log("PhraseFactory.getSearchPhrase");
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/phrases.json?orderBy="subject"&equalTo="${subjectVal}"`)
        .success( (objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error( (error) => {
          reject(error);
        });
    });
  };

  let getOnePhrase = function(phraseId) {
    // console.log("PhraseFactory.getOnePhrase - phraseId: ", phraseId);
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/phrases/${phraseId}.json`)
      .success( (FbPhraseObj) => {
        resolve(FbPhraseObj);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let saveExistingPhrase = function(phraseToSave) {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseUrl}/phrases.json`, JSON.stringify(phraseToSave))
        .success( (response) => {
          resolve(response);
        })
        .error( (error) => {
          reject(error);
        });
    });
  };


  let getUserSavedPhrases = function(userId) {
    return $q( (resolve, reject) => {
      console.log("PhraseFactory.getUserSavedPhrases userId: ", userId);
      $http.get(`${FirebaseUrl}/phrases.json?orderBy="uid"&equalTo="${userId}"`)
      .success( (FbSavedObjects) => {
        resolve(FbSavedObjects);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let patchExistingPhrase = function(phraseId, phraseObject) {
    return $q( (resolve, reject) => {
      console.log("PhraseFactory.patchExistingPhrase");
      $http.patch(`${FirebaseUrl}/phrases/${phraseId}.json`, JSON.stringify(phraseObject))
      .success( (FbSavedObjects) => {
        resolve(FbSavedObjects);
    })
      .error( (error) => {
        reject(error);
      });
    });
  };


  return {getSearchPhrase, getOnePhrase, saveExistingPhrase, getUserSavedPhrases, patchExistingPhrase};
});
