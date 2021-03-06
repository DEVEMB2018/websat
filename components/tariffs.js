import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Price from './price'
import Link from 'next/link'

import tariffsStyles from '../styles/components/tariffs.scss'
import buttonStyles from '../styles/components/button.scss'
import dividerStyles from '../styles/components/divider.scss'
import linkStyles from '../styles/components/link.scss'
import TARIFFS from '../contexts/tariffs';

class Tariffs extends React.Component {
  static propTypes = {
    idName: PropTypes.string,
    onSelectTariff: PropTypes.func
  }

  render () {
    return (
      <div className={tariffsStyles.fullWidthContainer} id={this.props.idName}>
        <div className={tariffsStyles.container}>
          <div className={tariffsStyles.titleContainer}>
            <h2 className={tariffsStyles.title}>Nuestras tarifas</h2>
            <p className={tariffsStyles.contentText}>Te ofrecemos las <b>mejores tarifas</b> del mercado de internet por satélite, con 60 GB y 150 GB para que puedas hacer un uso intensivo de tu conexión sin preocupaciones (audio, vídeo, multimedia, navegación y descarga).</p>
          </div>
          <div className={tariffsStyles.tariffsContainer}>
            {TARIFFS.map((tariff, index) => (
              <div key={tariff.id} className={classNames(tariffsStyles.tariffCard, this.getTariffColor(index))}>{
                this.renderTariff(tariff, index)
              }</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  renderTariff (tariff, index) {
    const handlerSelectTariff = function () {
      this.props.onSelectTariff(tariff)
    }.bind(this)

    return (
      <div>
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
        {
          this.renderLink(tariff)
        }
      </div>
    )
  }

  renderLink (tariff) {
    const href = `/checkout?tariff=${tariff.id}`

    return (
      <Link href={href}>
        <a className={`${buttonStyles.primaryButton} ${tariffsStyles.contractButton}`}>Lo quiero</a>
      </Link>
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
