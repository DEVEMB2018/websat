import React from 'react'
import ReactModal from 'react-modal'
import { withRouter } from 'next/router'

import styles from '../styles/pages/checkout.scss'
import dividerStyles from '../styles/components/divider.scss'

import Head from '../components/head'
import NavCheckout from '../components/nav-checkout'
import Footer from '../components/footer'
import C2cModal from '../components/c2c'

import TARIFFS from '../contexts/tariffs'
import MOBILE_TARIFFS from '../contexts/mobile-tariffs'
import { isClient } from '../helpers/client'

import CheckoutPersonalData from '../components/checkout/checkout-personal-data'
import CheckoutAddress from '../components/checkout/checkout-address'
import CheckoutMobile from '../components/checkout/checkout-mobile'
import CheckoutSummary from '../components/checkout/checkout-summary'
import CheckoutBilling from '../components/checkout/checkout-billing'
import CheckoutPersonalCustomer from '../components/checkout/forms/personal-data-customer'
import CheckoutPersonalBusiness from '../components/checkout/forms/personal-data-business'

// import SelectedTariff from '../contexts/tariff'

class CheckoutPage extends React.Component {

  constructor ({ router }) {
    super()

    const tariffId = router.query.tariff
    const mobileTariffId = router.query.mobile

    if (isClient) {
      window.sessionStorage.setItem('tariffId', tariffId)
      window.sessionStorage.setItem('mobileTariffId', tariffId)
    }

    this.state = {
      isC2cModalOpen: false,
      tariff: TARIFFS.find((tariff) => tariff.id === tariffId),
      mobileTariff: MOBILE_TARIFFS.find((mobile) => mobile.id === mobileTariffId),
      stage: 0,
      data: this.getInitialFormData(tariffId, mobileTariffId)
    }

    this.handlerToggleC2C = this.handlerToggleC2C.bind(this)
    this.handlerContinue = this.handlerContinue.bind(this)

    ReactModal.setAppElement('#main')
  }

  getInitialFormData (tariffId, mobileTariffId) {
    let backedData = {
      personalData: {

      }
    }

    if (isClient) {
      const prevMobileTariffId = window.sessionStorage.getItem('mobileTariffId')

      if (prevMobileTariffId && mobileTariffId || !prevMobileTariffId && !mobileTariffId) {
        backedData = JSON.parse(window.sessionStorage.getItem('check')) || backedData
      } else {
        window.sessionStorage.removeItem('check')
      }

    }

    return {
      personalData: {
        customer: backedData.personalData.customer || CheckoutPersonalCustomer.INITIAL_DATA,
        business: backedData.personalData.business || CheckoutPersonalBusiness.INITIAL_DATA,
        option: parseInt(backedData.personalTarget) || 0
      }
    }
  }

  render () {
    return (
      <div id="main" className={styles.layout}>
        <Head title="Embou, líder en Internet Rural en Aragón. Tecnología Wimax | Embou" />
        <div className={styles.contentContainer}>
          <C2cModal isOpen={this.state.isC2cModalOpen} handleClose={this.handlerToggleC2C} />
          <NavCheckout onClickC2C={this.handlerToggleC2C} />
          <div className={styles.checkoutBody}>
            <h1>Contrata tu tarifa de internet satélite</h1>
            <div className={styles.cardsContainer}>
              <div className={styles.formsContainer}>
                <CheckoutPersonalData stage={0} editing={this.state.stage === 0} completed={this.state.stage > 0} data={this.state.data.personalData} onSave={(data) => this.handlerContinue('personalData', data)} disabled={false} />

                <CheckoutAddress stage={1} editing={this.state.stage === 1} completed={this.state.stage > 1} disabled={this.state.stage < 1} onSave={(data) => this.handlerContinue('address', data)} />

                <div className={dividerStyles.horizontalDivider}></div>

                { this.state.mobileTariff
                  ? (
                    <div>
                      <CheckoutMobile stage={2} editing={this.state.stage === 2} completed={this.state.stage > 2} disabled={this.state.stage < 2} onSave={(data) => this.handlerContinue('mobile', data)} />
                      <div className={dividerStyles.horizontalDivider}></div>
                    </div>
                  )
                  : ''
                }

                <div className={dividerStyles.horizontalDivider}></div>

                <CheckoutBilling stage={3} editing={this.state.stage === 3} completed={this.state.stage > 3} disabled={this.state.stage < 3} onSave={(data) => this.handlerContinue('billing', data)} />
              </div>
              <div className={styles.summaryContainer}>
                <CheckoutSummary tariff={this.state.tariff} mobileTariff={this.state.mobileTariff} />
              </div>
            </div>
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

  renderCheckoutMobile () {
    return (
      <div>
        <CheckoutMobile stage={1} editing={this.state.stage === 1} completed={this.state.stage > 1} disabled={this.state.stage < 1} />
        <div className={dividerStyles.horizontalDivider}></div>
      </div>
    )
  }

  handlerToggleC2C () {
    this.setState({ isC2cModalOpen: !this.state.isC2cModalOpen })
  }

  handlerContinue (key, data) {
    let increment = 1

    if (this.state.stage === 0 && this.mobileTariffId) {
      increment = 2
    }

    this.setState({
      stage: this.state.stage + increment,
      data: {
        ...this.state.data,
        [key]: data
      }
    })

    if (isClient) {
      window.sessionStorage.setItem('check', JSON.stringify(this.state.data))
    }

  }
}

export default withRouter(CheckoutPage)
