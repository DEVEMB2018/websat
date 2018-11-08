import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik, Field, ErrorMessage } from 'formik'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'

import { renderCard } from './checkout-base'
import { nameValidator, NIFvalidator, phoneValidator, emailValidator } from '../../helpers/validators'

class CheckoutPersonalData extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    editing: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number
  }

  constructor () {
    super()

    this.state = {
      option: 0,
      formData: {
        nif: '',
        firstName: '',
        lastName: '',
        secondLastName: '',
        phone: '',
        email: '',
        companyName: '',
        concactName: ''
      }
    }


    this.handlerOptionChange = this.handlerOptionChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  render () {
    return (
      <div>
        {
        renderCard({
            editing: this.props.editing,
            disabled: this.props.disabled,
            completed: this.props.completed,
            stage: this.props.stage
          },
          'Datos personales y de contacto',
          'Los datos personales serán los del titular del contrato. Los datos de contacto los utilizaremos para ponernos en contacto contigo.',
          this.renderForm()
        )
        }
      </div>
    )
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <Formik initialValues={this.state.formData}>
        { ({errors, touched}) => (
          <form>
            <div className={formStyles.checkboxGroup}>
              <span onClick={() => this.handlerOptionChange(0)}>
                <input type="checkbox" className={formStyles.firstHorizontalCheckbox} checked={this.state.option === 0} onChange={() => this.handlerOptionChange(0)} />
                <span className={formStyles.checkboxLabel}>
                  Particular
                </span>
              </span>
              <span onClick={() => this.handlerOptionChange(1)}>
                <input type="checkbox" className={formStyles.horizontalCheckbox} checked={this.state.option === 1} onChange={() => this.handlerOptionChange(0)} />
                <span className={formStyles.checkboxLabel}>
                  Empresa
                </span>
              </span>
            </div>
            { this.renderFormInputs(errors, touched) }
            <div className={formStyles.formGroup}>
              <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={this.handlerSubmit}>Continuar</button>
            </div>
          </form>
          )
        }
        </Formik>
      )
    }
  }

  renderFormInputs (errors, touched) {
    if (errors.nif) console.log('error: ', errors.nif)
    if (this.state.option === 0) {
      // PARTICULAR

      return (
        <div>
          <div className={formStyles.formGroup}>
            { this.renderTextInput('nif', errors, touched, NIFvalidator, 'Documento de identidad', 'NIF/NIE') }
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Fecha de nacimiento</label>
              <input className={classNames(formStyles.inlineInput, formStyles.firstInlineInput)} placeholder="DD"></input>
              <input className={formStyles.inlineInput} placeholder="MM"></input>
              <input className={classNames(formStyles.inlineInput, styles.yearInput)} placeholder="AAAA"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            { this.renderTextInput('firstName', errors, touched, nameValidator, 'Nombre', 'Nombre del titular') }
            { this.renderTextInput('lastName', errors, touched, nameValidator, 'Apellido 1', 'Apellido') }
            { this.renderTextInput('secondLastName', errors, touched, nameValidator, 'Apellido 2', 'Apellido') }
          </div>
          <div className={formStyles.formGroup}>
            { this.renderTextInput('phone', errors, touched, nameValidator, 'Teléfono de contacto', 'Teléfono') }
            { this.renderTextInput('email', errors, touched, emailValidator, 'Email de contacto', 'Email') }
          </div>
        </div>
      )
    } else if (this.state.option === 1) {
      // EMPRESA
      return (
        <div>
          <div className={formStyles.formGroup}>
            { this.renderTextInput('firstName', errors, touched, nameValidator, 'Nombre', 'Nombre del titular') }
          </div>
          <div className={formStyles.formGroup}>
            { this.renderTextInput('companyName', errors, touched, nameValidator, 'Titular', 'Nombre de la empresa') }
            { this.renderTextInput('concactName', errors, touched, nameValidator, 'Persona de contacto', 'Nombre y apellidos') }
          </div>
          <div className={formStyles.formGroup}>
            { this.renderTextInput('phone', errors, touched, phoneValidator, 'Teléfono de contacto', 'Número de teléfono') }
            { this.renderTextInput('email', errors, touched, emailValidator, 'Email de contacto', 'Email') }
          </div>
        </div>
      )

    }
  }

  renderTextInput (name, errors, touched, validator, text, placeholder) {
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

  renderError (name, expression) {
    if (expression) return (
      <ErrorMessage name={name} component="div" className={formStyles.errorMessage} />
    )
  }

  handlerOptionChange (opt) {
    this.setState({
      option: opt
    })
  }

  handlerSubmit () {
    this.props.onSave()
  }

}

export default CheckoutPersonalData