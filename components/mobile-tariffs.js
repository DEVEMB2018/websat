import React from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Price from './price'
import Link from 'next/link'

import MOBILE_TARIFFS from '../contexts/mobile-tariffs'
import tariffsStyles from '../styles/components/mobile-tariffs.scss'
import buttonStyles from '../styles/components/button.scss'
import linkStyles from '../styles/components/link.scss'

MOBILE_TARIFFS.map((tariff, index) => {
  tariff.key = `tariff-${index}`

  return tariff
})

class MobileTariffs extends React.Component {

  static propTypes = {
    idName: PropTypes.string,
    onSelectTariff: PropTypes.func
  }

  render () {
    return (
    <div className={tariffsStyles.fullWidthContainer} id={this.props.idName}>
      <div className={tariffsStyles.container}>
        <div className={tariffsStyles.titleContainer}>
          <h2 className={tariffsStyles.title}>Traete además tu móvil con nosotros y ahorra dinero</h2>
          <p className={tariffsStyles.contentText}>La mejor oferta de internet + móvil con la telefonía móvil del Grupo MásMóvil.</p>
        </div>
        <Tabs className={tariffsStyles.tabContainer}>
          <TabList className={tariffsStyles.tabList}>
            <Tab className={tariffsStyles.tab} selectedClassName={tariffsStyles.selectedTab}>con satélite 30 GB</Tab>
            <Tab className={tariffsStyles.tab} selectedClassName={tariffsStyles.selectedTab}>con satélite 60 GB</Tab>
            <Tab className={tariffsStyles.tab} selectedClassName={tariffsStyles.selectedTab}>con satélite 150 GB</Tab>
          </TabList>
          <TabPanel className={tariffsStyles.tabPanel}>
            {MOBILE_TARIFFS
              .filter((tariff) => tariff.satelliteData === 30)
              .map((tariff) => this.renderTariff(tariff))
            }
          </TabPanel>
          <TabPanel className={tariffsStyles.tabPanel}>
            {MOBILE_TARIFFS
              .filter((tariff) => tariff.satelliteData === 60)
              .map((tariff) => this.renderTariff(tariff))
            }
          </TabPanel>
          <TabPanel className={tariffsStyles.tabPanel}>
            {MOBILE_TARIFFS
              .filter((tariff) => tariff.satelliteData === 150)
              .map((tariff) => this.renderTariff(tariff))
            }
          </TabPanel>
        </Tabs>
      </div>
    </div>
    )
  }

  renderTariff (tariff) {
    const handlerSelectTariff = function () {
      this.props.onSelectTariff(tariff)
    }.bind(this)

    return <div key={tariff.key} className={tariffsStyles.tariffCard}>
      <div className={tariffsStyles.tariffTitleContainer}>
        <h4 className={tariffsStyles.tariffTitle}>
          <p>Internet satélite {tariff.satelliteData} GB</p>
          <p>+</p>
          <p>{tariff.mobileData} de datos</p>
        </h4>
        <p className={tariffsStyles.tariffTitle}>Llamadas ilimitadas</p>
      </div>
      <div className={tariffsStyles.priceContainer}>
        <Price price={tariff.price} currency={'€/mes'} iva={'IVA incl.'} center={true} />
      </div>
      {
        this.renderLink(tariff)
      }
      <div className={tariffsStyles.linkContainer}>
        <a className={linkStyles.link}>Ver detalles</a>
      </div>
    </div>
  }

  renderLink (tariff) {
    const href = `/checkout?tariff=${tariff.tariffId}&mobile=${tariff.id}`

    return (
      <Link href={href}>
        <a className={`${buttonStyles.primaryButton} ${tariffsStyles.button}`}>¡Contrátala ahora!</a>
      </Link>
    )
  }


}

export default MobileTariffs
