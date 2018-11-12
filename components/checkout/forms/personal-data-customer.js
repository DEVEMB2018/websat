import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik, ErrorMessage } from 'formik'

import styles from '../../../styles/components/checkout.scss'
import formStyles from '../../../styles/_forms.scss'
import buttonStyles from '../../../styles/components/button.scss'

import TextInput from './text-input'
import DateInput from './date-input'

import {
  nameValidator,
  NIFvalidator,
  phoneValidator,
  emailValidator,
  dayValidator,
  monthValidator,
  yearValidator
} from '../../../helpers/validators'

class PersonalDataCustomer extends React.Component {
  static propTypes = {
    onSave: PropTypes.func,
    data: PropTypes.shape({
      nif: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      birthDate: PropTypes.string.isRequired,
      secondLastName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      options: PropTypes.string.isRequired
    })
  }

  static INITIAL_DATA = {
    nif: '',
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    email: '',
    birthDate: '',
    options: 'particular'
  }

  constructor (props) {
    super(props)

    this.state = {
      data: props.data || PersonalDataCustomer.INITIAL_DATA
    }

    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  render () {
      return (
        <Formik initialValues={this.props.data} onSubmit={this.handlerSubmit}>
          { ({ handleSubmit, isValid }) => (
            <div>
              <div className={formStyles.formGroup}>
                <TextInput name="nif" text="Documento de identidad" placeholder="NIF/NIE" validate={NIFvalidator} />
                <DateInput name="birthDate" text="Fecha de nacimiento" />
              </div>
              <div className={formStyles.formGroup}>
                <TextInput name="firstName" text="Nombre" placeholder="Nombre del titular" validate={nameValidator} />
                <TextInput name="lastName" text="Apellido" placeholder="Apellido" validate={nameValidator} />
                <TextInput name="secondLastName" text="Apellido" placeholder="Apellido" validate={nameValidator} />
              </div>
              <div className={formStyles.formGroup}>
                <TextInput name="phone" text="Teléfono de contacto" placeholder="Teléfono" validate={phoneValidator} />
                <TextInput name="email" text="Email de contacto" placeholder="Email" validate={emailValidator} />
              </div>
              <div className={formStyles.formGroup}>
                <button type="submit" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={handleSubmit}>Continuar</button>
              </div>
            </div>
          )
        }
        </Formik>
      )
  }

  renderDateError (errors, touched) {
    if (errors.birthDay) return (<ErrorMessage name="birthDay" className={formStyles.errorMessage} />)
    if (errors.birthMonth) return (<ErrorMessage name="birthMonth" className={formStyles.errorMessage} />)
    if (errors.yearMonth) return (<ErrorMessage name="yearMonth" className={formStyles.errorMessage} />)
  }

  handlerSubmit (values, { setSubmitting }) {
    setSubmitting(false)

    this.props.onSave({
      ...values
    })
  }

}

export default PersonalDataCustomer