import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../styles/components/checkout.scss'
import formStyles from '../styles/_forms.scss'
import buttonStyles from '../styles/components/button.scss'

class CheckoutAddress extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
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
        <h3 className={styles.title}>1. Dirección de instalación</h3>
        { this.renderSubtitle() }
        { this.renderForm() }
      </div>
    )
  }

  renderSubtitle () {
    if (this.props.editing) {
      return (
        <p className={styles.subtitle}>Esta es la dirección donde instalaremos la antena parabólica para que puedas conectarte a Internet.</p>
      )
    }
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <form>
          <div className={formStyles.formGroup}>
            <div className={classNames(formStyles.inputContainer, styles.addressInputContainer)}>
              <label className={formStyles.inputLabel}>Dirección</label>
              <input className={formStyles.input} placeholder="Calle, número, piso, puerta"></input>
            </div>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Código postal</label>
              <input className={formStyles.input} placeholder="CP"></input>
            </div>
          </div>
          <div className={formStyles.formGroup}>
            <div className={classNames(formStyles.inputContainer, styles.cityInputContainer)}>
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

export default CheckoutAddress