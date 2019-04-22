import { dbRef } from '../../fbConfig'
import { COMPARE_USER_BRACKET_ERROR, COMPARE_USER_BRACKET_REQUEST, COMPARE_USER_BRACKET_SUCCESS } from './consts'
import { selectCompareBracket } from './reducer'

export const getCompareUserBracket = (compareUser) => (dispatch, getState) => {
  const compareBracket = selectCompareBracket(getState(), compareUser)

  if (!compareBracket) {
    const collection = dbRef.collection('users')

    dispatch({
      type: COMPARE_USER_BRACKET_REQUEST
    })

    collection.doc(`${compareUser}`).get().then(snapshot => {
      if (snapshot.data().bracket) {
        dispatch({
          type: COMPARE_USER_BRACKET_SUCCESS,
          payload: {
            [compareUser]: snapshot.data().bracket
          }
        })
      } else {
        throw new Error()
      }
    }).catch(e => {
      dispatch({
        type: COMPARE_USER_BRACKET_ERROR,
        error: `Can't compare brackets. Other user does not exist or does not have a valid bracket.`
      })
    })
  }
}
