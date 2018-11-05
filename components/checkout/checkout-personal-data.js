import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'

import { renderCard } from './checkout-base'

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
      option: 0
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
          { this.renderFormInputs() }
          <div className={formStyles.formGroup}>
            <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={this.handlerSubmit}>Continuar</button>
          </div>
        </form>
      )
    }
  }

  renderFormInputs () {
    if (this.state.option === 0) {
      // PARTICULAR
      return (
        <div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Documento de identidad</label>
              <input className={formStyles.input} placeholder="NIF/NIE"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Fecha de nacimiento</label>
              <input className={classNames(formStyles.inlineInput, formStyles.firstInlineInput)} placeholder="DD"></input>
              <input className={formStyles.inlineInput} placeholder="MM"></input>
              <input className={classNames(formStyles.inlineInput, styles.yearInput)} placeholder="AAAA"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Nombre</label>
              <input className={formStyles.input} placeholder="Nombre del titular"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Apellido 1</label>
              <input className={formStyles.input} placeholder="Apellido"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Apellido 2</label>
              <input className={formStyles.input} placeholder="Apellido"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Teléfono de contacto</label>
              <input className={formStyles.input} placeholder="Teléfono"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Email de contacto</label>
              <input className={formStyles.input} placeholder="Email"></input>
            </div>
          </div>
        </div>
      )
    } else if (this.state.option === 1) {
      // EMPRESA
      return (
        <div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Documento de identidad</label>
              <input className={formStyles.input} placeholder="NIF/NIE"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Titular</label>
              <input className={formStyles.input} placeholder="Nombre de la empresa"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Persona de contacto</label>
              <input className={formStyles.input} placeholder="Nombre y apellidos"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Teléfono de contacto</label>
              <input className={formStyles.input} placeholder="Teléfono"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Email de contacto</label>
              <input className={formStyles.input} placeholder="Email"></input>
            </div>
          </div>
        </div>
      )

    }
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