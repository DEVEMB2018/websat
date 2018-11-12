import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect, Formik } from 'formik'

import styles from '../../../styles/components/checkout.scss'
import formStyles from '../../../styles/_forms.scss'
import buttonStyles from '../../../styles/components/button.scss'
import { nameValidator, phoneValidator, emailValidator } from '../../../helpers/validators'
import TextInput from './text-input'

class PersonalDataBusiness extends React.Component {
  static propTypes = {
    formik: PropTypes.object,
    onSave: PropTypes.func,
    data: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      contactName: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  }

  static INITIAL_DATA = {
    firstName: '',
    companyName: '',
    contactName: '',
    phone: '',
    email: ''
  }

  constructor () {
    super()

    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  componentDidMount() {
    this.props.formik.validateForm()
  }

  render () {
      return (
        <Formik initialValues={this.props.data} onSubmit={this.handlerSubmit}>
          { ({ handleSubmit, isValid}) => (
            <div>
              <div className={formStyles.formGroup}>
                <TextInput name="firstName" text="Nombre" placeholder="Nombre del titular" validate={nameValidator} />
              </div>
              <div className={formStyles.formGroup}>
                <TextInput name="companyName" text="Titular" placeholder="Nombre de la empresa" validate={nameValidator} />
                <TextInput name="contactName" text="Persona de contacto" placeholder="Nombre y apellidos" validate={nameValidator} />
              </div>
              <div className={formStyles.formGroup}>
                <TextInput name="phone" text="Teléfono de contacto" placeholder="Número de teléfono" validate={phoneValidator} />
                <TextInput name="email" text="Email de contacto" placeholder="Email" validate={emailValidator} />
              </div>
              <div className={formStyles.formGroup}>
                <button type="submit" className={classNames(buttonStyles.primaryButton, styles.submit)} disabled={!isValid} onClick={handleSubmit}>Continuar</button>
              </div>
            </div>
          )
        }
        </Formik>
      )
  }

  handlerSubmit (values, { setSubmitting }) {
    setSubmitting(false)

    this.props.onSave({
      ...values
    })
  }

}

export default connect(PersonalDataBusiness)