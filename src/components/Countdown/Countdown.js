import { pad2 } from '../../utils/pad2'
import React from 'react'
import Countdown from 'react-countdown-now'
import './Countdown.scss'

const Completionist = () => <span />

const CountdownRender = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />
  } else {
    // Render a countdown
    return (
      <div>
        <span key={'counter'} className={'countdown'}>{pad2(days)}:{pad2(hours)}:{pad2(minutes)}:{pad2(seconds)}</span>
      </div>
    )
  }
}

export const CountdownTimer = () => (
  <Countdown renderer={CountdownRender} zeroPadTime={2} date={new Date('2019-04-14')}>
    <Completionist />
  </Countdown>
)
