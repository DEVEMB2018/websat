import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Formik } from 'formik'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'
import checkoutStyles from '../../styles/components/checkout.scss'

import CheckoutCard from './checkout-card'
import AddressForm from './forms/address'


class CheckoutAddress extends React.Component {
  static propTypes = {
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number.isRequired,
    data: PropTypes.shape({
      installation: PropTypes.object,
      delivery: PropTypes.object,
      differentAddress: PropTypes.boolean
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      differentAddress: props.data.differentAddress || false
    }

    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.handlerOptionChange = this.handlerOptionChange.bind(this)
    this.handlerModify = this.handlerModify.bind(this)
  }

  componentDidMount () {
    this.setState({
      differentAddress: this.props.data.differentAddress
    })
  }

  render () {
    return (
      <div>
        {
        <CheckoutCard
          editing={this.props.editing}
          disabled={!this.props.editing && !this.props.completed}
          completed={this.props.completed}
          stage={this.props.stage}
          title={'Dirección de instalación'}
          subtitle={'Esta es la dirección donde instalaremos la antena parabólica para que puedas conectarte a Internet.'}
        >
        { this.props.editing
          ? this.renderForm()
          : this.renderSummary()
        }
        </CheckoutCard>
        }
      </div>
    )
  }

  renderForm () {
    const defaultValues = this.state.differentAddress
      ? { installation: AddressForm.INITIAL_DATA }
      : { installation: AddressForm.INITIAL_DATA, delivery: AddressForm.INITIAL_DATA}

    return (
      <Formik initialValues={this.props.data || defaultValues} onSubmit={this.handlerSubmit}>
          { ({ handleSubmit }) => (
            <div>
              <AddressForm name="installation" title="Dirección de instalación"></AddressForm>

              <div onClick={() => this.handlerOptionChange(1)}>
                <input type="checkbox" className={formStyles.verticalCheckbox} checked={this.state.differentAddress} onChange={() => this.handlerOptionChange()} />
                <span className={formStyles.checkboxLabel}>
                  La dirección de envío es diferente de la de instalación
                </span>
              </div>

            { this.state.differentAddress
              ? (<AddressForm name="delivery" title="Dirección de envío"></AddressForm>)
              : ('')
            }
            <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={handleSubmit}>Continuar</button>
           </div>
        )}
      </Formik>
    )
  }

  renderSummary () {
    if (this.props.completed) {
      return (
        <div>
          {
            this.props.data.differentAddress
            ? (<div className={checkoutStyles.summaryLineTitle}>Dirección de instalación:</div>)
            : ''
          }
          <div className={checkoutStyles.summaryLine}>{this.props.data.installation.address}, {this.props.data.installation.postalCode} - {this.props.data.installation.city}, {this.props.data.installation.province}</div>
          {
            this.props.data.differentAddress
            ? (
              <div>
                <div className={checkoutStyles.summaryLineTitle}>Dirección de envío:</div>
                <div className={checkoutStyles.summaryLine}>{this.props.data.delivery.address}, {this.props.data.delivery.postalCode} - {this.props.data.delivery.city}, {this.props.data.delivery.province}</div>
              </div>
            )
            : ('')
          }
          <button type="button" className={checkoutStyles.buttonModify} onClick={this.handlerModify}>Modificar</button>
        </div>
      )
    }
  }

  handlerOptionChange () {
    this.setState({
      differentAddress: !this.state.differentAddress
    })
  }

  handlerSubmit (values, { setSubmitting }) {
    setSubmitting(false)

    this.props.onSave({
      ...values,
      differentAddress: this.state.differentAddress
    })
  }

  handlerModify () {
    this.props.onEdit(this.props.stage)
  }


}

export default CheckoutAddress