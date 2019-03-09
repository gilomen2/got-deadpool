import React, { Component } from 'react'
import Steps from './Steps'

class Home extends Component {
  render () {
    const {
      history
    } = this.props

    return (
      <div>
        <Steps history={history} />
        <h2>How It Works</h2>
        <h4>Login</h4>
        <p>No sign up required. Login with a Google account.</p>
        <h4>Create or Join a Pool</h4>
        <p>If someone gave you a pool id, enter it on the "Pools" page to join. You can join an unlimited number of pools, so join one at work, with your friends, etc.</p>
        <p>You can also create new pools, then copy the id and share it around. Anyone with the pool id can join, so only give yours to those you want to play with. Pools are limited to 50 users.</p>
        <p>You can join pools up until the game starts.</p>
        <p>There are no pool admins. You can't boot someone from a pool or leave a pool once you've joined it. This app was a rush job. It's just asking too much.</p>
        <h4>Fill out Your Bracket</h4>
        <p>It's 1 bracket per user, no matter how many pools you are in. You set your bracket and it will be judged against others in each pool you are in.</p>
        <p>You can edit your bracket up until the game starts. Once the game starts, no changes can be made.</p>
        <p>You have to select an episode in which each character will die, or declare them a "survivor" if you think they will end the series alive.</p>
        <p>Brackets are loosely organized by house affiliation at the end of season 7. I said LOOSELY.</p>
        <h2>These are the Rules, don't @ me</h2>
        <ul>
          <li>"Alive" means the character is walking around (or whatever it is Bran is doing) at the end of the episode OR is unconfirmed dead from injuries sustained at the end of the episode.</li>
          <li>If they die and come back as anything other than a wight, they are alive.</li>
          <li>White Walkers are considered alive.</li>
          <li>If a character wargs into an animal and their human body is killed, but the animal is alive, that character is alive.</li>
          <li>If a character dies in one episode and comes back in a later episode (ahem Jon Snow), points will be recalculated after the episode in which they are resurrected as the character is now alive.</li>
          <li>These people are ALIVE according to these rules (again: don't @ me):</li>
          <ul>
            <li>Jon Snow</li>
            <li>Gregor Clegane</li>
            <li>Beric Dondarrion</li>
            <li>Tormund Giantsbane</li>
          </ul>
          <li>Some characters who are probably alive aren't on the bracket. I just don't really care about Robin Arryn and the likelihood he will play any meaningful role in the final season seems slim to me. He doesn't get to play.</li>
          <li>If somebody who wasn't on the bracket comes back, too bad. They missed the draft. They don't count for anything.</li>
          <li>Any and all questions in regards to the rules will be decided by the game master (me). If you don't like it, you can figure out your own points system/rules amongst your pool.</li>
        </ul>
        <h2>Points</h2>
        <p>Points will be calculated for each member of your pool after each episode.</p>
        <ul>
          <li>Episode death prediction:</li>
          <ul>
            <li>Correct: +200</li>
            <li>Incorrect:</li>
            <ul>
              <li>Off by 1: +100</li>
              <li>Off by 2: +50</li>
              <li>Off by 3: +25</li>
              <li>Off by > 3: 0</li>
              <li>Character survives: -25</li>
            </ul>
          </ul>
          <li>Survivor prediction:</li>
          <ul>
            <li>Correct: +150</li>
            <li>Incorrect: -100</li>
          </ul>
        </ul>
      </div>
    )
  }
}

export default Home
