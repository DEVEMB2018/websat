import React from 'react'
import PropTypes from 'prop-types'

import Price from './price'

import tariffsStyles from '../styles/components/tariffs.scss'
import buttonStyles from '../styles/components/button.scss'
import dividerStyles from '../styles/components/divider.scss'
import linkStyles from '../styles/components/link.scss'

const tariffs = [
  {
    description: 'Tarifa 30 GB',
    price: 34.90,
    data: 30,
    downloadSpeed: 30,
    uploadSpeed: 6
  },
  {
    description: 'Tarifa 60 GB',
    price: 54.90,
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

class Tariffs extends React.Component {
  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return (
      <div className={tariffsStyles.fullWidthContainer} id={this.props.idName}>
        <div className={tariffsStyles.container}>
          <div className={tariffsStyles.titleContainer}>
            <h2 className={tariffsStyles.title}>Nuestras tarifas</h2>
            <p className={tariffsStyles.contentText}>Te ofrecemos las <b>mejores tarifas</b> del mercado de internet por satélite, con 60 GB y 150 GB para que puedas hacer un uso intensivo de tu conexión sin preocupaciones (audio, vídeo, multimedia, navegación y descarga).</p>
          </div>
        {tariffs.map((tariff, index) => (
          <div className={`${tariffsStyles.tariffCard} ${this.getTariffColor(index)}`} key={tariff.key}>
            <h3 className={tariffsStyles.tariffTitle}>{tariff.description}</h3>
            <div className={tariffsStyles.tariffPriceContainer}>
              <Price price={tariff.price} currency={'€/mes'} iva={'IVA incl.'} center={true} />
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
  }

  getTariffColor (index) {
      switch (index) {
        case 0:
          return tariffsStyles.tariffWhite
        case 1:
          return tariffsStyles.tariffGrey
        case 2:
          return tariffsStyles.tariffBlack
      }
  }
}

export default Tariffs
