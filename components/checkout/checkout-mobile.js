import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'

import CheckoutCard from './checkout-card'
import TextInput from './forms/text-input'
import { phoneValidator, nameValidator, numberValidator } from '../../helpers/validators'

class CheckoutMobile extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number,
    data: PropTypes.shape({
      phone: PropTypes.string,
      operator: PropTypes.string,
      icc: PropTypes.string,
      option: PropTypes.number
    })
  }

  static INITIAL_DATA = {
    phone: '',
    operator: '',
    icc: ''
  }

  constructor () {
    super()

    this.state = {
      option: 0
    }

    this.handlerOptionChange = this.handlerOptionChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.handlerModify = this.handlerModify.bind(this)
  }

  render () {
    return (
      <div>
        <CheckoutCard
          editing={this.props.editing}
          disabled={!this.props.editing && !this.props.completed}
          completed={this.props.completed}
          stage={this.props.stage}
          title={'Datos de la línea móvil'}
          subtitle={'Dinos si quieres un número nuevo o conservar tu número actual, nosotros nos encargaremos de realizar todos los trámites.'}
        >
          <div>
            { this.props.editing
              ? this.renderForm()
              : this.renderSummary()
            }
          </div>
        </CheckoutCard>
      </div>
    )
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <Formik initialValues={this.props.data || CheckoutMobile.INITIAL_DATA} onSubmit={this.handlerSubmit}>
          { ({ handleSubmit }) => (
            <div>
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
                { this.renderInputs() }
              </div>
              <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={handleSubmit}>Continuar</button>
            </div>
          )
        }
        </Formik>
      )
    }
  }

  renderInputs () {
    if (this.state.option === 0) {
      return (
        <div className={formStyles.formGroup}>
          <TextInput name="phone" text="Teléfono" placeholder="Tu número de teléfono actual" validate={phoneValidator} />
          <TextInput name="operator" text="Operador" placeholder="Dinos cual es tu operador" validate={nameValidator} />
        </div>
      )
    }

    if (this.state.option === 1) {
      return (
        <div>
          <div className={formStyles.formGroup}>
            <TextInput name="phone" text="Teléfono" placeholder="Tu número de teléfono actual" validate={phoneValidator} />
            <TextInput name="operator" text="Operador" placeholder="Dinos cual es tu operador" validate={nameValidator} />
          </div>
          <div className={formStyles.formGroup}>
            <TextInput name="icc" text="ICC de la SIM actual" placeholder="Número ICC" validate={numberValidator} />
            <span>El ICC es un número de entre 15 y 19 dígitos escrito en tu tarjeta SIM. Si no lo puedes leer llama a tu operador.</span>
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

  renderSummary () {
    if (!this.props.completed) return

    const modify = (
      <div>
        <button type="button" className={styles.buttonModify} onClick={this.handlerModify}>Modificar</button>
      </div>
    )

    if (this.state.option === 0) {
      return (
        <div>
          <div className={styles.summaryLine}>Tfno: {this.props.data.phone} - Operador: {this.props.data.operator}</div>
          { (modify) }
        </div>
      )
    }

    if (this.state.option === 1) {
      return (
        <div>
          <div className={styles.summaryLine}>Tfno: {this.props.data.phone} - Operador: {this.props.data.operator} - ICC: {this.props.data.icc}</div>
          { (modify) }
        </div>
      )
    }

    if (this.state.option === 2) {
      return (
        <div>
          <div className={styles.summaryLine}>Se te asignará un número de teléfono.</div>
          { (modify) }
        </div>
      )
    }
  }

  handlerOptionChange (index) {
    this.setState({
      option: index
    })
  }

  handlerSubmit (values, { setSubmitting }) {
    setSubmitting(false)

    this.props.onSave({
      ...values,
      option: this.state.option
    })
  }

  handlerModify () {
    this.props.onEdit(this.props.stage)
  }

}

export default CheckoutMobile