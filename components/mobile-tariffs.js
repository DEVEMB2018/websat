import React from 'react'


import tariffsStyles from '../styles/components/mobile-tariffs.scss'
import buttonStyles from '../styles/components/button.scss'
import linkStyles from '../styles/components/link.scss'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const tariffs = [
  {
    price: 76,
    satelliteData: 60,
    mobileData: 5
  },
  {
    price: 79,
    satelliteData: 60,
    mobileData: 8
  },
  {
    price: 83,
    satelliteData: 60,
    mobileData: 12
  },
  {
    price: 85,
    satelliteData: 150,
    mobileData: 5
  },
  {
    price: 95,
    satelliteData: 150,
    mobileData: 8
  },
  {
    price: 100,
    satelliteData: 150,
    mobileData: 12
  }
].map((tariff, index) => {
  tariff.key = `tariff-${index}`

  return tariff
})

class MobileTariffs extends React.Component {

  render () {
    return <div className={tariffsStyles.container}>
      <div className={tariffsStyles.titleContainer}>
        <h2 className={tariffsStyles.title}>Traete además tu móvil con nosotros y ahorra dinero</h2>
        <p className={tariffsStyles.contentText}>La mejor oferta de internet + móvil con la telefonía móvil del Grupo MásMóvil.</p>
      </div>
      <Tabs className={tariffsStyles.tabContainer}>
        <TabList className={tariffsStyles.tabList}>
          <Tab className={tariffsStyles.tab} selectedClassName={tariffsStyles.selectedTab}>con tarifa satélite 60 GB</Tab>
          <Tab className={tariffsStyles.tab} selectedClassName={tariffsStyles.selectedTab}>con tarifa satélite 150 GB</Tab>
        </TabList>
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
  }

  renderTariff (tariff) {
    return <div key={tariff.key} className={tariffsStyles.tariffCard}>
      <div className={tariffsStyles.tariffTitleContainer}>
        <p className={tariffsStyles.tariffTitle}>Internet satélite {tariff.satelliteData} GB</p>
        <p className={tariffsStyles.tariffTitle}>+</p>
        <p className={tariffsStyles.tariffTitle}>{tariff.mobileData} de datos</p>
        <p className={tariffsStyles.tariffTitle}>Llamadas ilimitadas</p>
      </div>
      <div className={tariffsStyles.tariffPriceContainer}>
        <p className={tariffsStyles.tariffPrice}>{tariff.price}</p>
        <p>€/mes</p>
        <p>IVA incl.</p>
      </div>
      <button type="button" className={`${buttonStyles.primaryButton} ${tariffsStyles.button}`}>Lo quiero</button>
      <div className={tariffsStyles.linkContainer}>
        <a className={linkStyles.link}>Ver detalles</a>
      </div>
    </div>
  }
}

export default MobileTariffs
