import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect, Field, ErrorMessage } from 'formik'

import { dateValidator } from '../../../helpers/validators'

import formStyles from '../../../styles/_forms.scss'

class DateInput extends React.Component {
  static propTypes = {
    formik: PropTypes.object,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = this.parseDate(props.formik.values[props.name])

    this.renderInputs = this.renderInputs.bind(this)
    this.changeDay = this.changeDay.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.changeYear = this.changeYear.bind(this)
    this.handlerBlur = this.handlerBlur.bind(this)
  }

  render () {
    return (
      <div className={formStyles.inputContainer}>
        <label className={classNames(formStyles.inputLabel, { [formStyles.errorMessage]: this.props.formik.touched[this.props.name] && this.props.formik.errors[this.props.name] })}>Fecha de nacimiento</label>
        <Field name={this.props.name} render={this.renderInputs} validate={dateValidator} />
        <ErrorMessage name={this.props.name} className={formStyles.errorMessage} component="div" />
      </div>
    )
  }

  renderInputs ( { field: { value }, form: { touched, errors } }) {
    const { day, month, year } = this.parseDate(value)

    return (
      <div>
        <input
          className={classNames(formStyles.inlineInput, formStyles.firstInlineInput, { [formStyles.errorInput]: touched[this.props.name] && errors[this.props.name] })}
          onChange={this.changeDay}
          placeholder="DD"
          value={day}
        />
        <input
          className={classNames(formStyles.inlineInput, { [formStyles.errorInput]: touched[this.props.name] && errors[this.props.name] })}
          placeholder="MM"
          onChange={this.changeMonth}
          value={month}
        />
        <input
          className={classNames(formStyles.inlineInput, formStyles.yearInput, { [formStyles.errorInput]: touched[this.props.name] && errors[this.props.name] })}
          placeholder="AAAA"
          onChange={this.changeYear}
          onBlur={this.handlerBlur}
          value={year}
        />
      </div>
    )
  }

  changeDay (e) {
    this.setState({
      day: e.target.value
    }, () => {
      this.set()
    })
  }

  changeMonth (e) {
    this.setState({
      month: e.target.value
    }, () => {
      this.set()
    })
  }

  changeYear (e) {
    this.setState({
      year: e.target.value
    }, () => {
      this.set()
    })
  }

  set () {
    const date = `${this.state.day}/${this.state.month}/${this.state.year}`

    this.props.formik.setFieldValue(this.props.name, date)
  }

  handlerBlur () {
    this.props.formik.setFieldTouched(this.props.name)
  }

  parseDate (date = '') {
    const split = date.split('/')

    return {
      day: split[0] || '',
      month: split[1] || '',
      year: split[2] || ''
    }
  }

}

export default connect(DateInput)