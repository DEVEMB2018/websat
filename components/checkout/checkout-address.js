import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Form } from 'formik'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'

import CheckoutCard from './checkout-card'

import { renderAddressFormInputs } from './checkout-base'

class CheckoutAddress extends React.Component {
  static propTypes = {
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number.isRequired
  }

  constructor () {
    super()

    this.handlerSubmit = this.handlerSubmit.bind(this)
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
        {this.renderForm()}
        </CheckoutCard>
        }
      </div>
    )
  }

  renderForm () {
    if (this.props.editing) {
      return (
        <form>
          { renderAddressFormInputs() }
          <button type="button" className={classNames(buttonStyles.primaryButton, styles.submit)} onClick={this.handlerSubmit}>Continuar</button>
        </form>
      )
    }
  }

  handlerSubmit () {
    this.props.onSave()
  }

}

export default CheckoutAddress