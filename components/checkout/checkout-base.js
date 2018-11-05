import React from 'react'
import classNames from 'classnames'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'

export function renderCard ({editing, disabled, completed, stage}, title, subtitle, form) {
  return (
    <div className={
      classNames({
        [styles.cardActive]: editing,
        [styles.cardDisabled]: disabled,
        [styles.cardCompleted]: completed
      })
    }>
      <h3 className={styles.title}>{stage + 1}. {title}</h3>
      { renderSubtitle(completed, subtitle) }
      { form }
    </div>
  )
}

export function renderSubtitle (completed, subtitle) {
  if (!completed) {
    return (
      <p className={styles.subtitle}>{subtitle}</p>
    )
  }
}

export function renderAddressFromInputs () {
  return (
    <div>
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
    </div>
  )
}