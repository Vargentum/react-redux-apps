import React from 'react'
import moment from 'moment'
import {Row, Col, Input} from 'react-bootstrap'
import _ from 'lodash'
import {durationSetup} from 'styles/Pomodoro'

const DurationSetup = ({onChange, durations: {work, rest}}) => {
  // onChange: function, work: number, rest: number
  const handleChange = (type) => ({currentTarget: {value}}) => {
    const ms = moment.duration(parseInt(value), 'm').asMilliseconds()
    onChange(ms, type)
  }
  const calcOffset = (val) => (12 - val * 2) / 2
  const colConfig = {
    lg: 2,
    md: 2,
    sm: 3,
    xs: 5
  }
  const offsetConfig = _.reduce(colConfig, (total, v, k) => ({
    ...total,
    [`${k}Offset`]: calcOffset(v)
  }))

  return (
    <Row className={`${durationSetup}`}>
      <Col {...colConfig} {...offsetConfig}>
        <Input
          label="Pomodoro duration"
          type="number" step="1" min="15" max="75"
          value={moment.duration(work, 'ms').asMinutes()}
          onChange={handleChange('work')} />
      </Col>
      <Col {...colConfig}>
        <Input
          label="Rest duration"
          type="number" step="1" min="1" max="25"
          value={moment.duration(rest, 'ms').asMinutes()}
          onChange={handleChange('rest')} />
      </Col>
    </Row>
  )
}

export default DurationSetup
