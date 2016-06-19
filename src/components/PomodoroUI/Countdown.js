import React, { Component, PropTypes as PT } from 'react'
import _ from 'lodash'
import Tock from 'tocktimer'
import moment from 'moment'
import Timebar from './Timebar'

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
    size: PT.number.isRequired,
    theme: PT.shape({
      dialColor: PT.string,
      timeColor: PT.string
    }),
    onStart: PT.func,
    onUpdate: PT.func,
    onEnd: PT.func,
    isPaused: PT.bool,
    formatter: PT.string // http://momentjs.com/docs/#/displaying/format/
  }

  static defaultTimerConfig = {
    countdown: true
  }

  static defaultTheme = {
    dialColor: '#fff',
    timeColor: '#94b0c7'
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
    const isValidFormat = dates.every(date => moment(date).isValid)
    const countdown = this.getTimeDiff()
    if (!isValidFormat) {
      throw new Error(`Invalid start or end time format.`)
    } else if (countdown < 0) {
      throw new Error(`End time shouldn't be earlier then start one.`)
    }    
  }

  checkForPause(nextIsPaused) {
    if (nextIsPaused !== this.props.isPaused || this.props.shouldReset) {
      this.timer.pause()
    }
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

  /*if true -> not startCoundown, but init Timer 

  now: inited and paused
  should be: inited as numbers, started when isPaused 
  */

  startCountdown = () => {
    this.timer.start(this.getTimeDiff())
    this.checkForPause()
    this.setState({
      started: true 
    }, this.props.onStart());
  }

  updateCountdown = () => {
    this.setState({
      countdown: this.timer.lap() 
    }, this.props.onUpdate(this.timer));
  }

  completeCountdown = () => {
    this.setState({
      completed: true 
    });
    this.props.onEnd()
  }

  render() {
    const { countdown, started, completed } = this.state
    const { formatter, size } = this.props
    const time = moment(countdown).format(formatter)
    const theme = _.assign({}, Countdown.defaultTheme, this.props.theme)    
    const textStyles = {
      color: theme.timeColor,
      fontSize: size / 20 + 10
    }

    return (
      <div>
        { started && 
          <div className="va-Countdown">
            <Timebar height={countdown} style={textStyles} />
            {time}
         </div>
        }
      </div>
    )
  }
}

export default Countdown
