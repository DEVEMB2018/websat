import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect, Field, ErrorMessage } from 'formik'

import { bankValidator } from '../../../helpers/validators'

import formStyles from '../../../styles/_forms.scss'

class BankTextInput extends React.Component {
  static propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string.isRequired
  }

  constructor () {
    super()

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
          // validate={bankValidator}
          onChange={this.handlerChange}
          >
        </Field>
        { this.isTouched()
          ? <ErrorMessage name={this.props.name} component="div" className={formStyles.errorMessage} />
          : null
        }
      </div>
    )
  }

  handlerChange (evt) {
    let previousVal = this.props.formik.values[this.props.name]
    let val = evt.target.value
    // let val = evt.target.value ? evt.target.value.trim() : ''

    if (previousVal && val === previousVal.slice(0, previousVal.length - 1)) {
      // removing character
      let lastChar = previousVal[previousVal.length - 1] || ''

      if (lastChar === '-') {
        this.props.formik.setFieldValue(this.props.name, val.slice(0, val.length - 1))

        return
      }
    }

    //   if (lastChar === '-') {
    //     this.props.formik.setFieldValue(this.props.name, val.slice(0, val.length - 1))
    //   } else {
    //     this.props.formik.setFieldValue(this.props.name, val)
    //   }
    // } else {
    //   // adding character
    //   let lastChar = val[val.length - 1] || ''

    //   if (!lastChar.match(/[A-z]|[0-9]/) && lastChar) return

    //   const withoutSlash = val.replace('-', '')

    //   if (withoutSlash.length && withoutSlash.length % 4 === 0) {
    //     val = val + '-'
    //   }

    //   this.props.formik.setFieldValue(this.props.name, val)
    // }


    val = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 24)

    let formatted = ''

    for (let i = 0; i < val.length; i++) {
      formatted = formatted + val[i]

      if (i !== 0 && i + 1 < 24 && (i + 1) % 4 === 0) formatted += '-'
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

}

export default connect(BankTextInput)