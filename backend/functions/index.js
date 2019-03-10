const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.scorePools = functions.https.onRequest(async (request, response) => {
  admin.firestore().collection('game').doc('test1').get().then(gameSnapshot => {
    let game = gameSnapshot.data();

    admin.firestore().collection('test-characters').get().then(charactersSnapshot => {
      let characterData = {}
      charactersSnapshot.docs.forEach(character => {
        characterData[character.id] = character.data()
      })

      admin.firestore().collection('users').get().then(usersSnapshot => {
        let users = {}
        usersSnapshot.docs.forEach(user => {
          users[user.id] = user.data();
        });
  
  
  
        response.send(JSON.stringify({
          game,
          users,
          characterData
        }, null, 3))
      })
    });

    

    // admin.firestore().collection('pools').get().then(poolsSnapshot => {
    //   let pools = poolsSnapshot.docs.map(doc => {
    //     return doc.data().users.forEach(user => {
    //       admin.firestore.collection('users').doc(user).get().then(userSnapshot => {

    //       })
    //     })
    //   })


    //   admin.firestore().collection('users').
    //   response.send(JSON.stringify({
    //     game,
    //     pools
    //   }, null, 3))
    // });
  })

  
});
