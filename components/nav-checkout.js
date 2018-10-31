import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Scroll = require('react-scroll')

import styles from '../styles/components/nav-checkout.scss'
import buttonStyles from '../styles/components/button.scss'


class NavCheckout extends React.Component {

  static propTypes = {
    idName: PropTypes.string,
    showBackToTop: PropTypes.bool,
    onClickC2C: PropTypes.func
  }

  render () {
    return (
    <nav className={styles.nav} id={this.props.idName}>
      <div className={styles.mainMenuContainer}>
        <div>
          <img className={styles.logo} src="/static/images/logo-embou-sat.svg" />
        </div>
        <div className={styles.listContainer}>
          <span>¿Tienes dudas? Llámanos al <strong>900 696 897</strong></span>
          <ul className={classNames(styles.menu)}>
            <li className={styles.listItem}>
              <button type="button" className={classNames(buttonStyles.primaryButton, styles.callMeButton)} onClick={this.props.onClickC2C}>
                Te llamamos gratis
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }

}

export default NavCheckout
