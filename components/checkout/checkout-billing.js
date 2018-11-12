import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import dividerStyles from '../../styles/components/divider.scss'
import { renderCard, renderAddressFormInputs } from './checkout-base'
import buttonStyles from '../../styles/components/button.scss'

class CheckoutBilling extends React.Component {
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
      differentAddress: true,
      conditions: false,
      communications: false
    }

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
          'Datos de facturación',
          'En esta cuenta bancaria domiciliaremos el pago mensual de la cuota de tu tarifa.',
          this.renderForm()
        )
        }
      </div>
    )
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <div>
          <div className={formStyles.formGroup}>
            <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>Cuenta bancaria</label>
              <input className={formStyles.input} placeholder="ES00-0000-0000-0000-0000-0000" />
            </div>
          </div>
          <p className={styles.inputSubtitle}>Ordenas a la entidad bancaria que a partir de la fecha y hasta nueva orden, atienda con cargo a esta cuenta los pagos a favor de EMBOU.</p>
          <div className={formStyles.checkboxGroup}>
            <div className={formStyles.checkboxContainer}>
              <input type="checkbox" className={formStyles.checkbox} checked={this.state.differentAddress} />
              <span className={formStyles.checkboxLabel}>
                La dirección de facturación es diferente de la de instalación
              </span>
            </div>
          </div>

          { this.state.differentAddress
            ? renderAddressFormInputs()
            : ''
          }

          <div className={dividerStyles.horizontalDivider}></div>

          <h3>Antes de finalizar</h3>
          <p>Revisa todos los datos y acepta las condiciones de contratación antes de continuar.</p>
          <div className={formStyles.checkboxGroup}>
            <div className={formStyles.checkboxContainer}>
              <input type="checkbox" className={formStyles.checkbox} checked={this.state.differentAddress} />
              <span className={formStyles.checkboxLabel}>
                Acepto las Condiciones Generales de Contratación y los Términos de Protección de Datos del servicio. Asimismo, solicito que el servicio esté disponible una vez activado.
              </span>
            </div>
            <div className={formStyles.checkboxContainer}>
              <input type="checkbox" className={formStyles.checkbox} checked={this.state.differentAddress} />
              <span className={formStyles.checkboxLabel}>
                Quiero que mis datos sean utilizados para todas las finalidades especificadas en los Términos de Protección de Datos del servicio
              </span>
            </div>
          </div>
          <div className={formStyles.formGroup}>
              <input type="textarea" className={formStyles.inputArea} placeholder="Si tienes algún comentario que hacernos, déjanos un mensaje." />
          </div>
          <div className={formStyles.formGroup}>
            <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={this.handlerSubmit}>Finalizar contratación</button>
          </div>
        </div>
      )
    }
  }

  renderAddressForm () {
    return (
      <div>
        <div>

        </div>
      </div>
    )
  }
}

export default CheckoutBilling