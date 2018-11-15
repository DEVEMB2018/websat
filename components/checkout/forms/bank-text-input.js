import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect, Field, ErrorMessage } from 'formik'

import { IBANValidator } from '../../../helpers/validators'

import formStyles from '../../../styles/_forms.scss'

const CHAR_SEPARATOR = '-'

class BankTextInput extends React.Component {
  static propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.handlerChange = this.handlerChange.bind(this)
  }

  render () {
    return (
      <div className={formStyles.inputContainerBig}>
        <label
          className={classNames(formStyles.inputLabel, { [formStyles.errorMessage]: this.isTouched() && this.hasError() })}>
          Cuenta bancaria
        </label>
        <Field
          className={classNames(formStyles.input, { [formStyles.errorInput]: this.isTouched() && this.hasError() })}
          placeholder="ES00-0000-0000-0000-0000-0000"
          name={this.props.name}
          validate={IBANValidator}
          onChange={this.handlerChange}
        />
        { this.isTouched()
          ? (<ErrorMessage name="bank" component="div" className={formStyles.errorMessage} />)
          : null
        }
      </div>
    )
  }

  handlerChange (evt) {
    let previousVal = this.props.formik.values[this.props.name]
    let val = evt.target.value ? evt.target.value.trim() : ''

    if (previousVal && val === previousVal.slice(0, previousVal.length - 1)) {
      // removing character
      let lastChar = previousVal[previousVal.length - 1] || ''

      if (lastChar === CHAR_SEPARATOR) {
        this.props.formik.setFieldValue(this.props.name, val.slice(0, val.length - 1))

        return
      }
    }

    val = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 24)

    let formatted = ''

    for (let i = 0; i < val.length; i++) {
      formatted = formatted + val[i]

      if (i !== 0 && i + 1 < 24 && (i + 1) % 4 === 0) formatted += CHAR_SEPARATOR
    }

    this.props.formik.setFieldValue(this.props.name, formatted)
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

  getError () {
    return this.props.formik.errors[this.props.name]
  }
}

export default connect(BankTextInput)