import React from 'react'
import PropTypes from 'prop-types'

import Price from './price'

import heroStyles from '../styles/components/hero.scss'
import buttonStyles from '../styles/components/button.scss'

class Hero extends React.Component {

  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return (
      <div className={heroStyles.fullWidthContainer} id={this.props.idName}>
        <div className={heroStyles.container}>
            <div className={heroStyles.titleListContainer}>
              <h2 className={heroStyles.title}>Llevamos internet donde ni siquiera llega el ADSL</h2>
              <ul className={heroStyles.list}>
                <li className={heroStyles.listItem}>30 Mb de velocidad de descarga</li>
                <li className={heroStyles.listItem}>Alta, instalación y router WiFi GRATIS</li>
                <li className={heroStyles.listItem}>¡Cobertura garantizada!</li>
              </ul>
            <div className={heroStyles.content}>
              <span className={heroStyles.smallLabel}>Desde</span>
              <Price price={34.90} currency={'€/mes'} iva={'IVA incl.'} />
              <button type="button" className={buttonStyles.secondaryButton}>VER TARIFAS</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
