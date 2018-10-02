import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/components/price.scss'

class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    iva: PropTypes.string
  }

  render () {
    return (
      <div className={styles.priceContainer}>
          <div className={styles.price}>{this.props.price}</div>
          <div className={styles.textContainer}>
            <div className={styles.currency}>{this.props.currency}</div>
            { this.renderIva() }
          </div>
      </div>
    )
  }


  renderIva () {
    if(this.props.iva) {
      return (
        <div className={styles.iva}>{this.props.iva}</div>
      )
    }
  }
}

export default Price