import React, { Component, PropTypes as PT } from 'react'
import _ from 'lodash'
import Tock from 'tocktimer'
import moment from 'moment'
import Timebar from './Timebar'
import {countdownString} from 'styles/Pomodoro.styl'

class Countdown extends Component {
  static propTypes = {
    start: PT.oneOfType([
      PT.string,
      PT.number,
      PT.array,  // see moment.js docs for proper format
      PT.object  // see moment.js docs for proper format
    ]),
    end: PT.oneOfType([
      PT.string,
      PT.number,
      PT.array,
      PT.object
    ]).isRequired,
    theme: PT.string,
    onStart: PT.func,
    onUpdate: PT.func,
    onEnd: PT.func,
    isPaused: PT.bool,
    formatter: PT.string // http://momentjs.com/docs/#/displaying/format/
  }

  static defaultTimerConfig = {
    countdown: true
  }

  static defaultProps = {
    start: moment(),
    onStart: () => {},
    onUpdate: () => {},
    onEnd: () => {},
    formatter: 'mm:ss',
    frequency: 100, // updates 10 times per second
    theme: {},
    isPaused: false
  }

  static defaultState = {
    dateValidError: false,
    countdown: null,
    initCountdown: null,
    completed: false,
    started: false
  }

  state = {...Countdown.defaultState}

  componentDidMount () {
    this.startTimer()
  }

  componentWillReceiveProps({start, end, isPaused, shouldReset}) {
    this.validateDates([start, end])
    this.checkForPause(isPaused)
    if (shouldReset) this.reloadTimer()
  }

  componentWillUnmount() {
    this.setState({...Countdown.defaultState})
    this.destroyTimer()
  }

  validateDates(dates) {
    const isValidFormat = dates.every((date) => moment(date).isValid)
    const countdown = this.getTimeDiff()
    if (!isValidFormat) {
      throw new Error(`Invalid start or end time format.`)
    } else if (countdown < 0) {
      throw new Error(`End time shouldn't be earlier then start one.`)
    }
  }

  checkForPause(nextIsPaused) {
    if (nextIsPaused !== this.props.isPaused) this.timer.pause()
  }

  getTimeDiff({end, start} = this.props) {
    return moment(end) - moment(start)
  }

  createTimer() {
    const config = _.assign({},
      Countdown.defaultTimerConfig,
      {
        complete: this.completeCountdown,
        callback: this.updateCountdown,
        frequency: this.props.frequency
      }
    )
    this.timer = new Tock(config)
  }

  startTimer() {
    const {start, end} = this.props
    this.createTimer()
    this.validateDates([start, end])
    _.delay(this.startCountdown, this.getTimeDiff({
      start: Date.now(),
      end: start
    }))
  }

  reloadTimer() {
    this.destroyTimer()
    this.startTimer()
  }

  destroyTimer() {
    this.timer.stop()
    delete this.timer
  }

  startCountdown = () => {
    const initCountdown = this.getTimeDiff()
    this.timer.start(initCountdown)
    if (this.props.isPaused) this.timer.pause()
    this.setState({
      started: true,
      initCountdown: initCountdown
    }, this.props.onStart())
  }

  updateCountdown = () => {
    this.setState({
      countdown: this.timer.lap()
    }, this.props.onUpdate(this.timer))
  }

  completeCountdown = () => {
    this.setState({
      completed: true
    })
    this.props.onEnd()
  }

  render() {
    const { countdown, started } = this.state
    const { formatter, theme } = this.props
    const time = moment(countdown).format(formatter)

    return (
      <div>
        {started &&
          <div>
            <Timebar {...this.state} theme={theme} />
            <div className={countdownString}>{time}</div>
         </div>
        }
      </div>
    )
  }
}

export default Countdown
