const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBVDXrye08NfkH6u6zD5RDDmiIvvs0YtxU",
    authDomain: "icebreaker-101.firebaseapp.com",
    databaseURL: "https://icebreaker-101.firebaseio.com",
    projectId: "icebreaker-101",
    storageBucket: "icebreaker-101.appspot.com",
    messagingSenderId: "823640115718",
    appId: "1:823640115718:web:2728a2a88675dcb20c9187",
    measurementId: "G-3S870S2XJ0"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 
var db = firebase.firestore();


// db.collection("users").doc("123").set({
//     codename: 'codename1',
//     description: 'random random random 1',
//     question_rankings: {
//         q1: 1,
//         q2: 0,
//         q3: 0,
//         q4: 1,
//         q5: 1,
//         q6: 0,
//         q7: 1,
//     }
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });






  const users = {
    u1: {
      id: 'u1',
      codename: 'codename1',
      description: 'random random random 1',
      question_rankings: {
        q1: 1,
        q2: 0,
        q3: 0,
        q4: 1,
        q5: 1,
        q6: 0,
        q7: 1,
      },
    },
    u2: {
      id: 'u1',
      codename: 'codename2',
      description: 'random random random 2',
      question_rankings: {
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 1,
        q6: 1,
        q7: 1,
      },
    },
    u3: {
      id: 'u1',
      codename: 'codename3',
      description: 'random random random 3',
      question_rankings: {
        q1: 0,
        q2: 0,
        q3: 1,
        q4: 1,
        q5: 0,
        q6: 0,
        q7: 1,
      },
    },
    u4: {
      id: 'u4',
      codename: 'codename4',
      description: 'random random random 4',
      question_rankings: {
        q1: 0,
        q2: 1,
        q3: 1,
        q4: 1,
        q5: 1,
        q6: 1,
        q7: 1,
      },
    },
    u4: {
      id: 'u5',
      codename: 'codename5',
      description: 'random random random 5',
      question_rankings: {
        q1: 0,
        q2: 1,
        q3: 0,
        q4: 0,
        q5: 0,
        q6: 0,
        q7: 0,
      },
    },
  };
  

  const matches = {
    'u1-u2': { commonQuestions: ['q5', 'q7'], matchStrength: 0.85 },
    'u1-u3': { commonQuestions: ['q4', 'q7'], matchStrength: 0.1 },
    'u1-u4': { commonQuestions: ['q4', 'q5', 'q7'], matchStrength: 0.75 },
    'u1-u5': { commonQuestions: [], matchStrength: 0 },
    'u2-u3': { commonQuestions: ['q7'], matchStrength: 0.75 },
    'u2-u4': { commonQuestions: ['q5', 'q6', 'q7'], matchStrength: 0.35 },
    'u2-u5': { commonQuestions: [], matchStrength: 0 },
    'u3-u4': { commonQuestions: ['q3', 'q4', 'q7'], matchStrength: 0.65 },
    'u3-u5': { commonQuestions: [], matchStrength: 0 },
    'u4-u5': { commonQuestions: ['q2'], matchStrength: 0.35 },
  };



const add_question_list = () => {
    db.collection("questions").doc("list_1").set({
        q1: {
            questionId: 'q1',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  1',
            topics: ['testTopic1', 'testTopic2'],
          },
          q2: {
            questionId: 'q2',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  2',
            topics: ['testTopic2'],
          },
          q3: {
            questionId: 'q3',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  3',
            topics: ['testTopic4', 'testTopic5'],
          },
          q4: {
            questionId: 'q4',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  4',
            topics: ['testTopic4'],
          },
          q5: {
            questionId: 'q5',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  5',
            topics: ['testTopic5'],
          },
          q6: {
            questionId: 'q6',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  6',
            topics: ['testTopic1'],
          },
          q7: {
            questionId: 'q7',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  7',
            topics: ['testTopic3'],
          },
          q8: {
            questionId: 'q8',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  8',
            topics: ['testTopic3'],
          },
          q9: {
            questionId: 'q9',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  9',
            topics: ['testTopic3'],
          },
          q10: {
            questionId: 'q10',
            prompt:
              'Do you think that people should have the freedom to blah blah blah?  10',
            topics: ['testTopic3'],
          }
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }