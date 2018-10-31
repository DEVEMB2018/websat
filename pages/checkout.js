import React from 'react'
import ReactModal from 'react-modal'
import { withRouter } from 'next/router'

import styles from '../styles/pages/checkout.scss'

import Head from '../components/head'
import NavCheckout from '../components/nav-checkout'
import Footer from '../components/footer'
import C2cModal from '../components/c2c'

import TARIFFS from '../contexts/tariffs'
import MOBILE_TARIFFS from '../contexts/mobile-tariffs'

// import CheckoutInstallation from '../components/checkout-installation'
// import CheckoutMobile from '../components/checkout-mobile'
// import CheckoutBilling from '../components/checkout-billing'
// import CheckoutPersonalData from '../components/checkout-personal-data'
import CheckoutSummary from '../components/checkout-summary'

// import SelectedTariff from '../contexts/tariff'

class CheckoutPage extends React.Component {

  constructor ({ router }) {
    super()

    const tariffId = router.query.tariff
    const mobileTariffId = router.query.mobile

    this.state = {
      isC2cModalOpen: false,
      tariff: TARIFFS.find((tariff) => tariff.id === tariffId),
      mobileTariff: MOBILE_TARIFFS.find((mobile) => mobile.id === mobileTariffId)
    }

    this.handlerToggleC2C = this.handlerToggleC2C.bind(this)

    ReactModal.setAppElement('#main')
  }

  render () {
    return (
      <div id="main" className={styles.layout}>
        <Head title="Embou, líder en Internet Rural en Aragón. Tecnología Wimax | Embou" />
        <div className={styles.contentContainer}>
          <C2cModal isOpen={this.state.isC2cModalOpen} handleClose={this.handlerToggleC2C} />
          <NavCheckout onClickC2C={this.handlerToggleC2C} />
          <div className={styles.checkoutBody}>
            {/* <CheckoutInstallation />
            <CheckoutMobile />
            <CheckoutPersonalData />
            <CheckoutBilling />*/ }
            <CheckoutSummary tariff={this.state.tariff} mobileTariff={this.state.mobileTariff} />
          </div>
        </div>
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

export default withRouter(CheckoutPage)
