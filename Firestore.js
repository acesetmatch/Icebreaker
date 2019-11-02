const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
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

// database firestore instance..
const db = firebase.firestore();

/**
 * Function add_user
 *  accepts two args
 *  1) room_id is the room id
 *  2) userInfo is a user object contains user info ---> id, codeName, and description
 *  */ 
const add_user = (room_id, userInfo) => {
  db.collection("rooms").doc(room_id).update({
    [`users.${userInfo.id}`]: {
        userId: userInfo.id,
        codeName: userInfo.codeName,
        description: userInfo.description,
        questionRankings: userInfo.questionRankings
    }
  }).then(function(docRef) {
    console.log("Document written with ID: ", room_id, userInfo);
    return true
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      return false
  });
};
/** 
 * example to add user
 * /
// add_user("room_2", 
//       {
//         id: "user_3", 
//         codeName: "bla", 
//         description: "description",
//         questionRankings: {
//           q1: 'like',
//           q2: 'dislike',
//           q3: 'dislike',
//           q4: 'like',
//           q5: 'like',
//           q6: 'dislike',
//           q7: 'like',
//         }
//       }
// );

/**
 * get_user fucntion
 * @param {String} room_id 
 * @param {String} user_id 
 */
const get_user = (room_id, user_id) => {
  let users = db.collection("rooms").doc(room_id).get()
    .then(doc => {
      if (!doc.exists) {
         console.log('No such document!');
         return false;
      }

        console.log(doc.data().users[user_id]);
        return doc.data().users[user_id];
    })
    .catch(err => {
      console.log('Error getting document', err);
      return false;
    });
};

/**
 *  example to get a user
 * */
// get_user("room_2", "user_3");


/**
 * Function add_room
 *  accepts 1 args
 *  1) room_id is the room id
 *  */ 
const add_room = (room_id, room_name) => {
    db.collection("rooms").doc(room_id).set({
        roomId: room_id,
        roomName: room_name,
        users: {
            
        }
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", room_id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
/**
 * example add room
 */
// add_room("room_1", "First room");

/**
 * get_room fucntion
 * @param {String} room_id 
 */
const get_room = (room_id) => {
  db.collection("rooms").doc(room_id)
    .get()
    .then(doc => {
      if (!doc.exists) {
         console.log('No such document!');
         return false;
      }

        console.log(doc.data());
        return doc.data();
    })
    .catch(err => {
      console.log('Error getting document', err);
      return false;
    });
}
/**
 *  example to get a room
 * */
// get_room("room_2");



/**
 * get_questions fucntion
 * @param {String} room_id 
 */
const get_question_list = (list_id) => {
  db.collection("questions").doc(list_id)
    .get()
    .then(doc => {
      if (!doc.exists) {
         console.log('No such document!');
         return false;
      }

        console.log(doc.data());
        return doc.data();
    })
    .catch(err => {
      console.log('Error getting document', err);
      return false;
    });
}
/**
 *  example to get a questions
 * */
// get_questions("list_1");

/**
 * Function add_questions_list
 *  accepts 1 args
 *  1) question_id is the question id
 *  */ 
const add_question_list = (questions_id) => {
    db.collection("questions").doc(questions_id).set({
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
        console.log("Document written with ID: ", questions_id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }


  module.exports = {add_room, get_room, add_user, get_user, add_question_list, get_question_list};

// not used
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
