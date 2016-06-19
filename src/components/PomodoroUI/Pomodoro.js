import React, {PropTypes, Component} from 'react'
import Countdown from './Countdown'
import moment from 'moment'

/*TODO: add flow */

const Pomodoro = ({active, inProgress, isInit, duration, onEnd}) =>
  active 
    ? <Countdown 
        isPaused={!inProgress} 
        shouldReset={isInit} 
        size={200} 
        formatter="mm:ss" 
        start={0} 
        end={duration} onEnd={onEnd} />
    : <noscript/>


export default Pomodoro