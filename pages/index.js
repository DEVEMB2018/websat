import React from 'react'
import ReactModal from 'react-modal'

import styles from '../styles/pages/index.scss'

import Head from '../components/head'
import Nav from '../components/nav'
import Hero from '../components/hero'
import InternetSatellite from '../components/internet-satellite'
import Tariffs from '../components/tariffs'
import MobileTariffs from '../components/mobile-tariffs'
import Faqs from '../components/faqs'
import Contact from '../components/contact'
import WhyUs from '../components/why-us'
import Footer from '../components/footer'
import C2cModal from '../components/c2c'

class Home extends React.Component {
  constructor () {
    super()

    this.state = {
      isC2cModalOpen: false,
      selectedTariff: null
    }

    this.handlerToggleC2C = this.handlerToggleC2C.bind(this)

    ReactModal.setAppElement('#main')
  }

  render () {
    return (
      <div id="main" className={styles.layout}>
        <C2cModal isOpen={this.state.isC2cModalOpen} handleClose={this.handlerToggleC2C} />
        <Head title="Embou, líder en Internet Rural en Aragón. Tecnología Wimax | Embou" />
        <Nav idName={'nav'} onClickC2C={this.handlerToggleC2C} />
        <Hero idName={'inicio'} />
        <InternetSatellite idName={'internet-satelite'}/>
        <Tariffs idName={'tarifas'} />
        <MobileTariffs />
        <Faqs idName={'preguntas-frecuentes'}/>
        <Contact idName={'contacto'} onClickC2C={this.handlerToggleC2C} />
        <WhyUs />
        <Footer />
      </div>
    )
  }

  handlerToggleC2C () {
    this.setState({ isC2cModalOpen: !this.state.isC2cModalOpen })
  }

  // handlerSelectTariff (tariff, mobileTariff) {
  //   this.setState({ selectedTariff: tariff })
  //   if (mobileTariff) {
  //     Router.push(`/checkout?tariff=${tariff.id}`)
  //   } else {
  //     Router.push(`/checkout?tariff=${tariff.id}`)
  //   }
  // }
}

export default Home
