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

// import css from 'styles/pages/index.scss'
class Home extends React.Component {
  constructor () {
    super()

    this.state = {
      isC2cModalOpen: false
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
        <Tariffs idName={'tarifas'}/>
        <MobileTariffs />
        <Faqs idName={'preguntas-frecuentes'}/>
        <Contact idName={'contacto'} onClickC2C={this.handlerToggleC2C}/>
        <WhyUs />
        <Footer />
        <style jsx global>{`
          body {
            padding: 0;
            margin: 0;
            font-size: 16px;
            font-family: Lato, Din, Comic Sans;
            font-weight: 100;
          }

          @font-face {
            font-family: Lato;
            font-weight: 300;
            src: url('/static/fonts/lato/lato-light.ttf') format('truetype');
          }

          @font-face {
            font-family: Lato;
            font-weight: 500;
            src: url('/static/fonts/lato/lato-regular.ttf') format('truetype');
          }

          @font-face {
            font-family: Lato;
            font-weight: 700;
            src: url('/static/fonts/lato/lato-bold.ttf') format('truetype');
          }

          @font-face {
            font-family: Lato;
            font-weight: 900;
            src: url('/static/fonts/lato/lato-black.ttf') format('truetype');
          }

          @font-face {
            font-family: Din;
            font-weight: 100;
            src: url('/static/fonts/din/din-light.eot?#iefix') format('embedded-opentype'),
              url('/static/fonts/din/din-light.woff') format('woff'),
              url('/static/fonts/din/din-light.ttf') format('truetype');
          }

          @font-face {
            font-family: Din;
            font-weight: 300;
            src: url('/static/fonts/din/din-regular.eot?#iefix') format('embedded-opentype'),
              url('/static/fonts/din/din-regular.woff') format('woff'),
              url('/static/fonts/din/din-regular.ttf') format('truetype');
          }

          @font-face {
            font-family: Din;
            font-weight: 500;
            src: url('/static/fonts/din/din-medium.eot?#iefix') format('embedded-opentype'),
              url('/static/fonts/din/din-medium.woff') format('woff'),
              url('/static/fonts/din/din-medium.ttf') format('truetype');
          }

          @font-face {
            font-family: Din;
            font-weight: 700;
            src: url('/static/fonts/din/din-bold.eot?#iefix') format('embedded-opentype'),
              url('/static/fonts/din/din-bold.woff') format('woff'),
              url('/static/fonts/din/din-bold.ttf') format('truetype');
          }
        `}</style>
      </div>
    )
  }

  handlerToggleC2C () {
    this.setState({ isC2cModalOpen: !this.state.isC2cModalOpen })
  }
}

export default Home
