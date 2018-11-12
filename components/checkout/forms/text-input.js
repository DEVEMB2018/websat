import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect, Field, ErrorMessage } from 'formik'

import formStyles from '../../../styles/_forms.scss'

class TextInput extends React.Component {
  static propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string.isRequired,
    validate: PropTypes.func.isRequired,
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
          ? <ErrorMessage name={this.props.name} component="div" className={formStyles.errorMessage} />
          : null
        }
      </div>
    )
  }

  isTouched () {
    return this.props.formik.touched[this.props.name]
  }

  hasError () {
    return this.props.formik.errors[this.props.name]
  }

}

export default connect(TextInput)