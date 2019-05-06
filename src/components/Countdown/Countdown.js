import React from 'react'
import Countdown from 'react-countdown-now'
import './Countdown.scss'

const Completionist = () => <span />

const CountdownRender = ({ days, hours, minutes, seconds, completed }) => {
  return (
    <div className={'countdown-container'}>
        Week 5 Scores Available Now!
    </div>
  )
}

export const CountdownTimer = () => (
  <div className={'countdown-container'}>
    Week 5 Scores Available Now!
  </div>
)
