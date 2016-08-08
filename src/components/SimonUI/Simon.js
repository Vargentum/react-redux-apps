// @flow

import React, {PropTypes, Component} from 'react'
import _ from 'lodash'
import {GAME_SECTORS} from 'redux/modules/Simon'

const Sector = ({onSectorClick, name}): Object =>
// onSectorClick: Function, name: string
  <div className={`sector test sector--${name}`}>{name}</div>

export const SectorsBoard = ({onSectorClick}) =>
  <div>
    {_.map(GAME_SECTORS, (props, name) =>
      <Sector key={name} name={name} onSectorClick={onSectorClick} {...props} />
    )}
  </div>