import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../styles/components/price.scss'

class Price extends React.Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    iva: PropTypes.string,
    center: PropTypes.bool
  }

  render () {
    return (
      <div className={classNames(styles.priceContainer, { [styles.priceContainerCenter]: this.props.center })}>
          <div className={styles.price}>{this.getIntPrice(this.props.price)}</div>
          <div className={styles.textContainer}>
            { this.renderCommaPrice(this.props.price) }
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

  renderCommaPrice (price) {
    const commaPrice = this.getCommaPrice(price)

    if (commaPrice > 0) {
      return (<div className={styles.commaPrice}>'{commaPrice + 1}</div>)
    }
  }

  getIntPrice (price) {
    return Math.trunc(price)
  }

  getCommaPrice (price) {
    return Math.trunc((price % 1) * 100)
  }

}

export default Price