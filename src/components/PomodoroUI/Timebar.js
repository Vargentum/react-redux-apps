import React, {Component, PropTypes} from 'react'
import {timebar} from 'styles/Pomodoro.styl'
import classNames from 'classNames'


class Timebar extends Component {
  static propTypes = {}

  static themeColors = {
    work: '#BD1550',
    rest: '#8A9B0F'
  }

  render() {
    const { theme, initCountdown, countdown} = this.props
    const diff = countdown / initCountdown * 100
    const attrs = {
      style: { 
        transform: `translateY(${100 - diff}%)`,
        backgroundColor: Timebar.themeColors[theme]
      },
      className: timebar
    }
    return (
      <div {...attrs} />
    )
  }
}

export default Timebar
