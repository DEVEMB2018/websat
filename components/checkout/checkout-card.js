import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import styles from '../../styles/components/checkout.scss'

class CheckoutCard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    // form: PropTypes.node.isRequired,
    editing: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    stage: PropTypes.number.isRequired
  }

  render () {
    const classes = classNames({
      [styles.cardActive]: this.props.editing,
      [styles.cardDisabled]: this.props.disabled,
      [styles.cardCompleted]: this.props.completed
    })

    return (
      <div className={classes}>
        <h3 className={styles.title}>{this.props.stage + 1}. {this.props.title}</h3>
        { !this.props.completed
          ? (<p className={styles.subtitle}>{this.props.subtitle}</p>)
          : null
        }
        { this.props.children }
      </div>
    )
  }

}

export default CheckoutCard