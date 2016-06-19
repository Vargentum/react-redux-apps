import React, {PropTypes, Component} from 'react'
import Countdown from './Countdown'
import moment from 'moment'
import _ from 'lodash'

/*TODO: add flow */

const Pomodoro = ({active, inProgress, isInit, duration, onEnd, theme}) =>
  active 
    ? <Countdown 
        isPaused={!inProgress} 
        theme={theme}
        shouldReset={isInit} 
        size={200} 
        formatter="mm:ss" 
        start={0} 
        end={duration} onEnd={onEnd} />
    : <noscript/>


export default Pomodoro