import React from 'react'
import classNames from 'classnames'
import { Field, ErrorMessage } from 'formik'

import formStyles from '../styles/_forms.scss'


export function renderTextInput (name, errors, touched, validator, text, placeholder) {
  return (
    <div className={formStyles.inputContainer}>
      <label className={classNames(formStyles.inputLabel, { [formStyles.errorMessage]: touched[name] && errors[name] })}>{text}</label>
      <Field className={classNames(formStyles.input, { [formStyles.errorInput]: touched[name] && errors[name] })} placeholder={placeholder} name={name} validate={validator}></Field>
      { touched[name]
        ? <ErrorMessage name={name} component="div" className={formStyles.errorMessage} />
        : null
      }
    </div>
  )
}