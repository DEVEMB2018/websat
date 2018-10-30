import React from 'react'
import PropTypes from 'prop-types'

import Price from './price'

import tariffsStyles from '../styles/components/mobile-tariffs.scss'
import buttonStyles from '../styles/components/button.scss'
import linkStyles from '../styles/components/link.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const tariffs = [
  {
    price: 56.80,
    satelliteData: 30,
    mobileData: 5
  },
  {
    price: 59.80,
    satelliteData: 30,
    mobileData: 8
  },
  {
    price: 63.80,
    satelliteData: 30,
    mobileData: 12
  },
  {
    price: 70.75,
    satelliteData: 60,
    mobileData: 5
  },
  {
    price: 73.75,
    satelliteData: 60,
    mobileData: 8
  },
  {
    price: 77.75,
    satelliteData: 60,
    mobileData: 12
  },
  {
    price: 108.80,
    satelliteData: 150,
    mobileData: 5
  },
  {
    price: 111.80,
    satelliteData: 150,
    mobileData: 8
  },
  {
    price: 115.80,
    satelliteData: 150,
    mobileData: 12
  }
].map((tariff, index) => {
  tariff.key = `tariff-${index}`

  return tariff
})

class MobileTariffs extends React.Component {

  static propTypes = {
    idName: PropTypes.string
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
            {tariffs
              .filter((tariff) => tariff.satelliteData === 30)
              .map((tariff) => this.renderTariff(tariff))
            }
          </TabPanel>
          <TabPanel className={tariffsStyles.tabPanel}>
            {tariffs
              .filter((tariff) => tariff.satelliteData === 60)
              .map((tariff) => this.renderTariff(tariff))
            }
          </TabPanel>
          <TabPanel className={tariffsStyles.tabPanel}>
            {tariffs
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
      <button type="button" className={`${buttonStyles.primaryButton} ${tariffsStyles.button}`}>Lo quiero</button>
      <div className={tariffsStyles.linkContainer}>
        <a className={linkStyles.link}>Ver detalles</a>
      </div>
    </div>
  }
}

export default MobileTariffs
