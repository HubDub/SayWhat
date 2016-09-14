"use strict";

app.factory("PhraseFactory", function ($q, $http, FirebaseUrl) {

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



  return {getSearchPhrase};
});
