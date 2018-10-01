import React from 'react'


import tariffsStyles from '../styles/components/tariffs.scss'
import buttonStyles from '../styles/components/button.scss'
import dividerStyles from '../styles/components/divider.scss'
import linkStyles from '../styles/components/link.scss'

const tariffs = [
  {
    description: 'Tarifa 60 GB',
    price: 67,
    data: 60,
    downloadSpeed: 30,
    uploadSpeed: 6
  },
  {
    description: 'Tarifa 150 GB',
    price: 99,
    data: 150,
    downloadSpeed: 30,
    uploadSpeed: 6
  }
].map((tariff) => {
  tariff.key = tariff.description

  return tariff
})

const Tariffs = () => (
  <div className={tariffsStyles.container}>
    <div className={tariffsStyles.titleContainer}>
      <h2 className={tariffsStyles.title}>Nuestras tarifas</h2>
      <p className={tariffsStyles.contentText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis odio lectus, nec condimentum orci ultricies quis. Vivamus fermentum, libero non interdum dignissim, nulla diam aliquam enim, cursus interdum dolor felis quis arcu. Maecenas nec magna commodo, facilisis turpis sit amet, maximus arcu.</p>
    </div>
    <div className={tariffsStyles.tariffsContainer}>
      {tariffs.map((tariff, index) => (
        <div className={`${tariffsStyles.tariffCard} ${index == 0 ? tariffsStyles.tariffWhite : tariffsStyles.tariffBlack}`} key={tariff.key}>
          <h3 className={tariffsStyles.tariffTitle}>{tariff.description}</h3>
          <div className={tariffsStyles.priceContainer}>
            <div>
              <p className={tariffsStyles.tariffPrice}>{tariff.price}</p>
            </div>
            <div>
              <p>€/mes</p>
              <p>IVA incl.</p>
            </div>
          </div>
          <div className={dividerStyles.horizontalDivider}></div>
          <p><b>{tariff.data} GB</b> de datos</p>
          <p>(Navegación ilimitada de 1 a 6 am)</p>
          <div className={dividerStyles.horizontalDivider}></div>
          <p><b>{tariff.downloadSpeed} Mbps</b> de subida / <b>{tariff.uploadSpeed} Mbps</b> de subida</p>
          <div className={dividerStyles.horizontalDivider}></div>
          <p>Instalación y router WiFi <b>GRATIS</b></p>
          <div className={dividerStyles.horizontalDivider}></div>
          <div className={tariffsStyles.linkContainer}>
            <a className={linkStyles.link}>Ver detalles</a>
          </div>
          <button type="button" className={`${buttonStyles.primaryButton} ${tariffsStyles.contractButton}`}>¡Contrátala ahora!</button>
        </div>
      ))}
    </div>
  </div>
)

export default Tariffs
