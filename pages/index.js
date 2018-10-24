import React from 'react'

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

// import css from 'styles/pages/index.scss'

const Home = () => (
  <div className={styles.layout}>
    <Head title="Embou, líder en Internet Rural en Aragón. Tecnología Wimax | Embou" />
    <Nav idName={'nav'} />
    <Hero idName={'inicio'} />
    <InternetSatellite idName={'internet-satelite'}/>
    <Tariffs idName={'tarifas'}/>
    <MobileTariffs />
    <Faqs idName={'preguntas-frecuentes'}/>
    <Contact idName={'contacto'}/>
    <WhyUs />
    <Footer />
    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        font-size: 16px;
        font-family: Din, Comic Sans;
        font-weight: 100;
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

export default Home
