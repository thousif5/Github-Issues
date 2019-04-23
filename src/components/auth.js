import React from "react";
const firebase = require("firebase");

let token = "";
let user = "";

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
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      sessionStorage.setItem("data", token);
      sessionStorage.setItem("name", user.email);
      localStorage.setItem("signed", 'sign out');
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredent.catch(err => console.log(err)).catch(err => console.log(err))ial type that was used.
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
      localStorage.setItem('signed', 'sign in');
      sessionStorage.removeItem('data');
      sessionStorage.removeItem('name');
    })
    .catch(function(error) {
      // An error happened.
      console.log(error)
    });
};

export { auth, signOut };
