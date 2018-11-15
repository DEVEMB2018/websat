import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik, Field, ErrorMessage } from 'formik'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import dividerStyles from '../../styles/components/divider.scss'
import buttonStyles from '../../styles/components/button.scss'

import CheckoutCard from './checkout-card'
import BankTextInput from './forms/bank-text-input'
import AddressForm from './forms/address'
import { generalConditionsValidator } from '../../helpers/validators'


class CheckoutBilling extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number,
    data: PropTypes.shape({
      bank: PropTypes.string,
      address: PropTypes.object,
      differentAddress: PropTypes.bool,
      generalConditions: PropTypes.bool,
      communications: PropTypes.bool
    })
  }

  static INITIAL_DATA = {
    bank: ''
  }

  constructor (props) {
    super(props)

    this.state = {
      differentAddress: props.data.differentAddress || false,
      generalConditions: props.data.generalConditions || false,
      communications: props.data.communications || false
    }

    // this.validateForm = this.validateForm.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.handlerGeneralConditionsChange = this.handlerGeneralConditionsChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }

  render () {
    return (
      <div>
        <CheckoutCard
          editing={this.props.editing}
          disabled={!this.props.editing && !this.props.completed}
          completed={this.props.completed}
          stage={this.props.stage}
          title={'Datos de facturación'}
          subtitle={'En esta cuenta bancaria domiciliaremos el pago mensual de la cuota de tu tarifa.'}
        >
          <div>
            {
              this.props.editing
              ? (this.renderForm())
              : ('')
            }
          </div>
        </CheckoutCard>
      </div>
    )
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <Formik initialValues={this.props.data ||CheckoutBilling.INITIAL_DATA} onSubmit={this.handlerSubmit} validate={this.validateForm}>
          { ({ handleSubmit, errors }) => (
            <div>
              <div className={formStyles.formGroup}>
                <BankTextInput name="bank" />
              </div>
              <p className={styles.inputSubtitle}>Ordenas a la entidad bancaria que a partir de la fecha y hasta nueva orden, atienda con cargo a esta cuenta los pagos a favor de EMBOU.</p>
              <div className={formStyles.checkboxGroup}>
                <div className={formStyles.checkboxContainer} onClick={() => this.handlerDifferentAddressChange()}>
                  <input type="checkbox" className={formStyles.checkbox} checked={this.state.differentAddress} onChange={() => this.handlerDifferentAddressChange()} />
                  <span className={formStyles.checkboxLabel}>
                    La dirección de facturación es diferente de la de instalación
                  </span>
                </div>
              </div>
              <div>
                { this.state.differentAddress
                  ? (<AddressForm title="Dirección" name="address" />)
                  : ''
                }
              </div>

              <div className={dividerStyles.horizontalDivider}></div>

              <h3>Antes de finalizar</h3>
              <p>Revisa todos los datos y acepta las condiciones de contratación antes de continuar.</p>
              <div className={formStyles.checkboxGroup}>
                <div className={formStyles.checkboxContainer} onClick={() => this.handlerGeneralConditionsChange()}>
                  <Field name="generalConditions" type="checkbox" className={formStyles.checkbox} checked={this.state.generalConditions} onChange={(evt) => this.handlerGeneralConditionsChange(evt)} />
                  <span className={formStyles.checkboxLabel}>
                    Acepto las Condiciones Generales de Contratación y los Términos de Protección de Datos del servicio. Asimismo, solicito que el servicio esté disponible una vez activado.
                  </span>
                </div>
                <div className={formStyles.checkboxContainer} onClick={() => this.handlerCommunicationsChange()}>
                  <input type="checkbox" className={formStyles.checkbox} checked={this.state.communications} value={this.state.communications} onChange={() => this.handlerCommunicationsChange()} />
                  <span className={formStyles.checkboxLabel}>
                    Quiero que mis datos sean utilizados para todas las finalidades especificadas en los Términos de Protección de Datos del servicio
                  </span>
                </div>
              </div>
              <div className={formStyles.formGroup}>
                  <input type="textarea" className={formStyles.inputArea} placeholder="Si tienes algún comentario que hacernos, déjanos un mensaje." onChange={() => this.handlerCommunicationsChange()} />
              </div>
              <div>
                { errors.generalConditions
                  ? <p className={formStyles.errorMessage}>{ errors.generalConditions }</p>
                  : null
                }
              </div>
              <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={handleSubmit}>Finalizar contratación</button>
            </div>
          )}
        </Formik>
      )
    }
  }

  validateForm (values) {
    console.log('validating...')

    if (!this.state.generalConditions) return { generalConditions: 'Tienes que aceptar las condiciones generales de contratación' }
  }

  handlerDifferentAddressChange () {
    this.setState({
      differentAddress: !this.state.differentAddress
    })
  }

  handlerGeneralConditionsChange (event) {
    this.setState({
      generalConditions: !this.state.generalConditions
    })
  }

  handlerCommunicationsChange () {
    this.setState({
      communications: !this.state.communications
    })
  }


  handlerSubmit (values, { setSubmitting }) {
    setSubmitting(false)

    this.props.onSave({
      ...values,
      differentAddress: this.state.differentAddress,
      generalConditions: this.state.generalConditions,
      communications: this.state.communications
    })
  }

  handlerModify () {
    this.props.onEdit(this.props.stage)
  }
}

export default CheckoutBilling