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
    theme: {}
  }

  static defaultState = {
    dateValidError: false,
    countdown: null,
    completed: false,
    started: false
  }

  state = {...Countdown.defaultState}

  componentDidMount () {
    const {start, end} = this.props
    this.createTimer()
    this.validateDates([start, end])
    _.delay(this.startCountdown, this.getTimeDiff({
      start: Date.now(),
      end: start
    }))
  }

  componentWillReceiveProps({start, end}) {
    this.validateDates([start, end])
  }

  componentWillUnmount() {
    this.setState({...Countdown.defaultState}); 
    delete this._timer
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

  startCountdown = () => {
    this._timer.start(this.getTimeDiff())
    this.setState({
      started: true 
    }, this.props.onStart());
  }

  updateCountdown = () => {
    this.setState({
      countdown: this._timer.lap() 
    }, this.props.onUpdate(this.state.countdown));
  }

  completeCountdown = () => {
    this.setState({
      completed: true 
    });
    this.props.onEnd()
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
    this._timer = new Tock(config)
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
         </div>
        }
      </div>
    )
  }
}

export default Countdown
