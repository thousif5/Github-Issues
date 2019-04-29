// import React from "react";
const firebase = require("firebase");

let token = "";

var config = {
  apiKey: "AIzaSyAvseDYqXG0taM58YAg0VbbFGY2RVZ5XlA",
  authDomain: "github-issues-thousif-6ccea.firebaseapp.com",
  databaseURL: "https://github-issues-thousif-6ccea.firebaseio.com",
  projectId: "github-issues-thousif-6ccea",
  storageBucket: "github-issues-thousif-6ccea.appspot.com",
  messagingSenderId: "202518005810"
};
firebase.initializeApp(config);

const auth = () => {
  var provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      console.log(result);
      token = result.credential.accessToken;
      sessionStorage.setItem("data", token);
      sessionStorage.setItem("name", result.additionalUserInfo.username);
      sessionStorage.setItem("signed", "sign out");
    })
    .catch(function(error) {
      console.log(error);
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredent.catch(err => console.log(err)).catch(err => console.log(err))ial type that was used.
      // var credential = error.credential;
      // ...
    });
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      sessionStorage.setItem("signed", "sign in");
      sessionStorage.removeItem("data");
      sessionStorage.removeItem("name");
    })
    .catch(function(error) {
      console.log(error);
    });
};

export { auth, signOut };
