import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../styles/components/checkout-mobile.scss'

class CheckoutMobile extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    editing: PropTypes.bool,
    onSave: PropTypes.func
  }

  render () {
    return (
      <span></span>
    )
  }

}

export default CheckoutMobile