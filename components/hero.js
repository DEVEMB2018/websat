import React from 'react'

import heroStyles from '../styles/components/hero.scss'
import buttonStyles from '../styles/components/button.scss'

const Hero = () => (
  <div className={heroStyles.container}>
    <p className={heroStyles.title}>Llevamos internet donde <span className={heroStyles.breakTitle}>ni siquiera llega el ADSL</span></p>
    <p className={heroStyles.content}>
      <span className={heroStyles.smallLabel}>Desde</span>
      <div className={heroStyles.priceLabelContainer}>
        <span className={heroStyles.bigLabel}>67</span>
        <div>
          <span className={heroStyles.mediumLabel}>€/mes</span>
          <span className={heroStyles.mediumLabel}>IVA incl.</span>
        </div>
      </div>
      <button type="button" className={buttonStyles.secondaryButton}>VER TARIFAS</button>
    </p>
  </div>
)

export default Hero
