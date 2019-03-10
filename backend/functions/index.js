const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.scorePools = functions.https.onRequest(async function (request, response) {
  admin.firestore().collection('game').doc('master').get().then(function (gameSnapshot) {
    let game = gameSnapshot.data()

    admin.firestore().collection('characters').get().then(function (charactersSnapshot) {
      let characterData = {}
      charactersSnapshot.docs.forEach(character => {
        characterData[character.id] = character.data()
      })

      admin.firestore().collection('users').get().then(function (usersSnapshot) {
        let users = {}
        usersSnapshot.docs.forEach(function (user) {
          const userData = user.data()
          users[user.id] = userData
          users[user.id].score = scoreBracket(userData.bracket, game, characterData)
        })

        admin.firestore().collection('pools').get().then(function (poolsSnapshot) {
          let promises = poolsSnapshot.docs.map(function (pool) {
            const poolData = pool.data()
            const poolPlayers = poolData.users ? poolData.users.map(function (userId) {
              return users[userId]
            }) : []
            return admin.firestore().collection('pools').doc(pool.id).set({ players: poolPlayers }, { merge: true }).then(function (res) {
              return res
            }).catch(function (e) {
              return e
            })
          })

          Promise.all(promises).then(function (res) {
            response.send(JSON.stringify({
              game,
              users,
              characterData
            }, null, 3))
          }).catch(function (e) {
            response.send(e)
          })
        })
      })
    })
  })
})

function scoreBracket (bracket, game, characterData) {
  const { scoring: gameScoring } = game
  let score = 0
  if (bracket) {
    Object.keys(bracket).forEach(function (characterName) {
      let characterStatus = characterData[characterName]

      let characterPrediction = bracket[characterName]
      if (characterStatus && characterStatus.lastEpisodeAlive) {
        const diff = Math.abs(characterStatus.lastEpisodeAlive - characterPrediction)
        if (characterStatus.lastEpisodeAlive === 0) {
          if (characterPrediction === 0) {
            score += gameScoring.survivor.correct
          } else {
            score += gameScoring.episodeDeath.survives
          }
        } else {
          if (diff > 3) {
            score += gameScoring.episodeDeath.offByMore
          } else if (diff === 3) {
            score += gameScoring.episodeDeath.offBy3
          } else if (diff === 2) {
            score += gameScoring.episodeDeath.offBy2
          } else if (diff === 1) {
            score += gameScoring.episodeDeath.offBy1
          } else if (diff === 0) {
            score += gameScoring.episodeDeath.correct
          }
        }
      }
    })
  }
  return score
}

exports.copyPools = functions.https.onRequest(async function (request, response) {
  admin.firestore().collection('pools').get().then(poolsSnapshot => {
    let copyOfPoolsData = {}
    poolsSnapshot.docs.forEach(function (pool) {
      copyOfPoolsData[pool.id] = pool.data()
    })

    const promises = Object.keys(copyOfPoolsData).map(function (poolId) {
      console.log(poolId)
      return admin.firestore().collection('test-pools').add(copyOfPoolsData[poolId])
    })

    Promise.all(promises).then(function (ps) {
      return response.send('OK')
    }).catch(function (e) {
      return response.send('Nope')
    })
  })
})
