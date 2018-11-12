import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../../styles/components/checkout.scss'
import formStyles from '../../styles/_forms.scss'
import buttonStyles from '../../styles/components/button.scss'

import { Form } from 'formik'
import { renderCard, renderAddressFormInputs } from './checkout-base'

class CheckoutAddress extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
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
        renderCard({
            editing: this.props.editing,
            disabled: this.props.disabled,
            completed: this.props.completed,
            stage: this.props.stage
          },
          'Dirección de instalación',
          'Esta es la dirección donde instalaremos la antena parabólica para que puedas conectarte a Internet.',
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