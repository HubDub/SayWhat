"use strict";

app.factory("PhraseFactory", function ($q, $http, FirebaseUrl) {

  let getSearchPhrase = function() {
    console.log("PhraseFactory.getSearchPhrase");
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseUrl}/phrases.json`)
        .success( (objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error( (error) => {
          reject(error);
        });
    });
  };



  return {getSearchPhrase};
});
