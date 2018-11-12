import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'

import { renderCard } from './checkout-base'
import { phoneValidator } from '../../helpers/validators'

class CheckoutMobile extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number
  }

  constructor () {
    super()

    this.state = {
      option: 0,
      formData: {
        phone: '',
        operator: '',
        icc: ''
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
          'Datos de la línea móvil',
          'Dinos si quieres un número nuevo o conservar tu número actual, nosotros nos encargaremos de realizar todos los trámites.',
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
          { (data) => (
            <Form
            onSubmit={(values, { setSubmitting }) => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }}>
              <div className={formStyles.checkboxGroup} onClick={() => this.handlerOptionChange(0)}>
                <div className={formStyles.checkboxContainer}>
                  <input type="checkbox" className={formStyles.checkbox} checked={this.state.option === 0} onChange={() => this.handlerOptionChange(0)} />
                  <span className={formStyles.checkboxLabel}>
                    Quiero mantener mi número y ahora tengo una línea de contrato
                  </span>
                </div>
              </div>
              <div className={formStyles.checkboxGroup} onClick={() => this.handlerOptionChange(1)}>
                <div className={formStyles.checkboxContainer}>
                  <input type="checkbox" className={formStyles.checkbox} checked={this.state.option === 1} onChange={() => this.handlerOptionChange(1)} />
                  <span className={formStyles.checkboxLabel}>
                    Quiero mantener mi número y ahora tengo una línea de prepago
                  </span>
                </div>
              </div>
              <div className={formStyles.checkboxGroup} onClick={() => this.handlerOptionChange(2)}>
                <div className={formStyles.checkboxContainer}>
                  <input type="checkbox" className={formStyles.checkbox} checked={this.state.option === 2} onChange={() => this.handlerOptionChange(2)} />
                  <span className={formStyles.checkboxLabel}>
                    Quiero un número nuevo
                  </span>
                </div>
              </div>
              <div className={styles.textInputsContainer}>
                {
                  this.renderMobileInfo(data.errors)
                }
              </div>
              <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={this.handlerSubmit}>Continuar</button>
            </Form>
          )
        }
        </Formik>
      )
    }
  }

  renderMobileInfo (errors) {
    if (this.state.option === 0) {
      return (
        <div className={formStyles.formGroup}>
          <div className={formStyles.inputContainer}>
            <label className={formStyles.inputLabel}>Teléfono</label>
            <Field name="phone" className={formStyles.input} placeholder="Tu número de teléfono actual" validate={phoneValidator}></Field>
            <ErrorMessage name="phone" component="div" className={formStyles.errorMessage} />
          </div>
          <div className={formStyles.inputContainer}>
            <label className={formStyles.inputLabel}>Operador</label>
            <Field name="operator" className={formStyles.input} placeholder="Selecciona tu operador"></Field>
            <ErrorMessage name="operator" component="div" />
          </div>
        </div>
      )
    }

    if (this.state.option === 1) {
      return(
        <div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Teléfono</label>
              <Field name="phone" className={classNames(formStyles.input, {[formStyles.errorInput]: errors.phone }) } placeholder="Tu número de teléfono actual"></Field>
              <ErrorMessage name="phone" component="div" />
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Operador</label>
              <Field name="operator" className={formStyles.input} placeholder="Selecciona tu operador"></Field>
              <ErrorMessage name="operator" component="div" />
            </div>
          </div>
          <div className={formStyles.formGroup}>
              <div className={formStyles.inputContainer}>
                <label className={formStyles.inputLabel}>ICC de la SIM actual</label>
                <Field name="icc" className={formStyles.input} placeholder="Número ICC"></Field>
                <ErrorMessage name="icc" component="div" />
              </div>
          </div>
       </div>
      )
    }

    if (this.state.option === 2) {
      return (
        <div>
          Se te asignará un número de teléfono durante el proceso.
        </div>
      )
    }
  }

  handlerOptionChange (index) {
    this.setState({
      option: index
    })
  }

  handlerSubmit () {
    this.props.onSave()
  }

}

export default CheckoutMobile