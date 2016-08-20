import React, {PropTypes, Component} from 'react'
import {Input as RBInput} from 'react-bootstrap'
import * as style from 'styles/Markdown.styl'

export const Input = ({onUpdate, value, ...props}) =>
  <div className={style.InputWrap}>
    <RBInput
      className={style.Input}
      value={value}
      onChange={onUpdate}
      type="textarea"
      placeholder="Add some markdown..."
      {...props} />
  </div>

export const Output = ({children, ...props}) =>
  <div className={style.Output} {...props}>{children}</div>
