import React from 'react'

import Price from './price'

import heroStyles from '../styles/components/hero.scss'
import buttonStyles from '../styles/components/button.scss'

const Hero = () => (
  <div className={heroStyles.container}>
    <div className={heroStyles.titleListContainer}>
      <p className={heroStyles.title}>Llevamos internet donde ni siquiera llega el ADSL</p>
      <ul className={heroStyles.list}>
        <li className={heroStyles.listItem}>30 Mb de velocidad de descarga</li>
        <li className={heroStyles.listItem}>Alta, instalación y router WiFi GRATIS</li>
        <li className={heroStyles.listItem}>¡Cobertura garantizada!</li>
      </ul>
    </div>
    <div className={heroStyles.content}>
      <span className={heroStyles.smallLabel}>Desde</span>
      <Price price={67} currency={'€/mes'} iva={'IVA incl.'} />
      <button type="button" className={buttonStyles.secondaryButton}>VER TARIFAS</button>
    </div>
  </div>
)

export default Hero
