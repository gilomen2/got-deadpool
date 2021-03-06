import sortBy from 'lodash/sortBy'

export const rankPlayers = (poolPlayers) => {
  let noBracketPlayers = poolPlayers.filter(player => !player.score)
  let bracketPlayers = poolPlayers.filter(player => player.score)

  let sorted = sortBy(bracketPlayers, ['score']).reverse()

  let rank = 1

  for (let i = 0; i < sorted.length; i++) {
    // increase rank only if current score less than previous
    if (i > 0 && sorted[i].score < sorted[i - 1].score) {
      rank++
    }
    sorted[i].rank = rank
  }

  return [...sorted, ...noBracketPlayers]
}
