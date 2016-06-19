import React from 'react'
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import {controlButtons} from 'styles/Pomodoro'

const Controls = ({onStartClick, onPauseClick, onResetClick, startDisabled}) =>
  <ButtonGroup bsSize="large" className={controlButtons}>
    <Button onClick={onPauseClick} disabled={!startDisabled}>
      <Glyphicon glyph="pause" />
      {" "}
      Pause
    </Button>
    <Button onClick={onStartClick} disabled={startDisabled}>
      <Glyphicon glyph="play" />
      {" "}
      Start
    </Button>
    <Button onClick={onResetClick} disabled={!startDisabled}>
      <Glyphicon glyph="stop" />
      {" "}
      Reset
    </Button>
  </ButtonGroup>

export default Controls
