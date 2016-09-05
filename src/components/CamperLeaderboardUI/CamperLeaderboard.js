import React, { Component, PropTypes as PT } from 'react'
import _ from 'lodash'
import cls from 'classnames'
import * as rb from 'react-bootstrap'

export function CamperEntry ({username, img, alltime, recent, ...rest}) {
  return <tr>
    <td>
      <rb.Image src={img} circle />
      <h3>{username}</h3>
    </td>
    <td> {alltime} </td>
    <td> {recent} </td>
  </tr>
}

export function TriggerableHeading ({onTrigger, label, ...props}) {
  return <div {...props}>

  </div>
}
