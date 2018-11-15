import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect, Field, ErrorMessage } from 'formik'

import formStyles from '../../../styles/_forms.scss'

class TextInput extends React.Component {
  static propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string.isRequired,
    validate: PropTypes.func,
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  }

  constructor () {
    super()
  }

  render () {
    return (
      <div className={formStyles.inputContainer}>
        <label
          className={classNames(formStyles.inputLabel, { [formStyles.errorMessage]: this.isTouched() && this.hasError() })}>
          { this.props.text }
        </label>
        <Field
          className={classNames(formStyles.input, { [formStyles.errorInput]: this.isTouched() && this.hasError() })}
          placeholder={this.props.placeholder}
          name={this.props.name}
          validate={this.props.validate}>
        </Field>
        { this.isTouched()
          ? (<ErrorMessage name={this.props.name} component="div" className={formStyles.errorMessage} />)
          : null
        }
      </div>
    )
  }

  // This check supports nested names: e.g address.cp
  // https://jaredpalmer.com/formik/docs/guides/arrays
  isTouched () {
    const path = this.props.name.split('.')
    let value = this.props.formik.touched

    for (let level of path) {
      value = value[level]

      if (!value) return value
    }

    return value
  }

  // This check supports nested names: e.g address.cp
  // https://jaredpalmer.com/formik/docs/guides/arrays
  hasError () {
    const path = this.props.name.split('.')
    let value = this.props.formik.errors

    for (let level of path) {
      value = value[level]

      if (!value) return value
    }

    return value
  }

}

export default connect(TextInput)