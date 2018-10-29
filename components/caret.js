import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../styles/components/caret.scss'

class Caret extends React.Component {
  static propTypes = {
    up: PropTypes.bool
  }

  render () {
    const classes = classNames({
      [styles.caretDown]: !this.props.up,
      [styles.caretUp]: this.props.up
    })

    return (
      <span className={classes}></span>
    )
  }

}

export default Caret