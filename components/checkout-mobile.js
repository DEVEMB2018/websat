import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../styles/components/checkout.scss'

class CheckoutMobile extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onSave: PropTypes.func
  }

  render () {
    return (
      <div className={
        classNames({
          [styles.cardActive]: this.props.editing,
          [styles.cardDisabled]: this.props.disabled,
          [styles.cardCompleted]: this.props.completed
        })
      }>
        <h3 className={styles.title}>2. Datos de la línea móvil</h3>
        { this.renderSubtitle() }
        { this.renderForm() }
      </div>
    )
  }

  renderSubtitle () {
    if (!this.props.completed) {
      return (
        <p className={styles.subtitle}>Dinos si quieres un número nuevo o conservar tu número actual, nosotros nos encargaremos de realizar todos los trámites.</p>
      )
    }
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <form>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Dirección</label>
              <input className={formStyles.input} placeholder="Calle, número, piso, puerta"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Código postal</label>
              <input className={formStyles.input} placeholder="CP"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Localidad</label>
              <input className={formStyles.input} placeholder="Localidad"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Provincia</label>
              <input className={formStyles.input} placeholder="Selecciona tu provincia"></input>
            </div>
          </div>
          <button type="button" className={buttonStyles.primaryButton}>Continuar</button>
        </form>
      )
    }
  }

}

export default CheckoutMobile