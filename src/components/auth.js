import React from "react";
const firebase = require("firebase");

let token = "";
let user = "";

function auth() {
  var config = {
    apiKey: "AIzaSyAvseDYqXG0taM58YAg0VbbFGY2RVZ5XlA",
    authDomain: "github-issues-thousif-6ccea.firebaseapp.com",
    databaseURL: "https://github-issues-thousif-6ccea.firebaseio.com",
    projectId: "github-issues-thousif-6ccea",
    storageBucket: "github-issues-thousif-6ccea.appspot.com",
    messagingSenderId: "202518005810"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GithubAuthProvider();
  provider.addScope("repo");

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      token = result.credential.accessToken;
      //  token = '2b10731d3ae05309d922bbf103b359b89cd72f39'
      // The signed-in user info.
      user = result.user;
      sessionStorage.setItem("data", token);
      sessionStorage.setItem("name", user.email);
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
    })
    .catch(function(error) {
      // An error happened.
    });
};

export { auth, signOut };
