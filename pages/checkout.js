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
import AddressForm from '../components/checkout/forms/address';

const CHECKOUT_LOCAL_KEY = 'check'
const CHECKOUT_MOBILE_TARIFF_KEY = 'mobileTariffId'
const CHECKOUT_TARIFF_KEY = 'tariffId'
const CHECKOUT_STAGE_LOCAL_KEY = 'checkStage'
const CHECKOUT_COMPLETED_LOCAL_KEY = 'checkCompleted'

const DEFAULT_CHECKOUT_DATA = {
  personalData: {
    customer: CheckoutPersonalCustomer.INITIAL_DATA,
    business:  CheckoutPersonalBusiness.INITIAL_DATA,
    option: 0
  },
  address: {
    installation: AddressForm.INITIAL_DATA,
    delivery: AddressForm.INITIAL_DATA,
    differentAddress: false
  }
}

class CheckoutPage extends React.Component {

  constructor ({ router }) {
    super()

    const tariffId = router.query.tariff
    const mobileTariffId = router.query.mobile

    this.state = {
      isC2cModalOpen: false,
      tariff: TARIFFS.find((tariff) => tariff.id === tariffId),
      mobileTariff: MOBILE_TARIFFS.find((mobile) => mobile.id === mobileTariffId),
      stage: 0,
      completed: -1,
      data: DEFAULT_CHECKOUT_DATA
    }

    this.handlerToggleC2C = this.handlerToggleC2C.bind(this)
    this.handlerContinue = this.handlerContinue.bind(this)
    this.handlerEdit = this.handlerEdit.bind(this)

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
            <h1>Contrata tu tarifa de internet satélite</h1>
            <div className={styles.cardsContainer}>
              <div className={styles.formsContainer}>
                <CheckoutPersonalData
                  stage={0}
                  editing={this.state.stage === 0}
                  completed={this.state.completed >= 0}
                  data={this.state.data.personalData}
                  onSave={(data) => this.handlerContinue('personalData', data)}
                  onEdit={(stage) => this.handlerEdit(stage)}
                />

                 <CheckoutAddress
                  stage={1}
                  editing={this.state.stage === 1}
                  completed={this.state.completed >= 1}
                  data={this.state.data.address}
                  onSave={(data) => this.handlerContinue('address', data)}
                  onEdit={(stage) => this.handlerEdit(stage)}
                />

                <div className={dividerStyles.horizontalDivider}></div>

                { this.state.mobileTariff
                  ? (
                    <div>
                      <CheckoutMobile
                      stage={2}
                      editing={this.state.stage === 2}
                      completed={this.state.completed >= 2}
                      onSave={(data) => this.handlerContinue('mobile', data)}
                    />
                      <div className={dividerStyles.horizontalDivider}></div>
                    </div>
                  )
                  : ''
                }

                <div className={dividerStyles.horizontalDivider}></div>

                <CheckoutBilling
                  stage={3}
                  editing={this.state.stage === 3}
                  completed={this.state.completed >= 3}
                  onSave={(data) => this.handlerContinue('billing', data)}
                />
              </div>
              <div className={styles.summaryContainer}>
                <CheckoutSummary tariff={this.state.tariff} mobileTariff={this.state.mobileTariff} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  componentDidMount () {
    if (isClient) {
      window.sessionStorage.setItem(CHECKOUT_TARIFF_KEY, this.state.tariff.id)
      window.sessionStorage.setItem(CHECKOUT_MOBILE_TARIFF_KEY, this.state.mobileTariff.id)
    }

    const samePrevious = this.checkSamePrevious(this.state.tariff.id, this.state.mobileTariff.id)

    if (!samePrevious) this.removePreviousStorage()

    this.setState({
      stage: this.getInitialStage(samePrevious),
      completed: this.getInitialCompleted(samePrevious),
      data: this.getInitialFormData(samePrevious)
    })

  }

  getInitialStage (samePrevious) {
    if (isClient && samePrevious) {
      return parseInt(window.sessionStorage.getItem(CHECKOUT_STAGE_LOCAL_KEY)) || 0
    }

    return 0
  }

  getInitialCompleted (samePrevious) {
    const defaultComp = -1

    if (isClient && samePrevious) {
      const prevComp = parseInt(window.sessionStorage.getItem(CHECKOUT_COMPLETED_LOCAL_KEY))
      return prevComp || prevComp === 0 ? prevComp : defaultComp
    }

    return defaultComp
  }

  getInitialFormData (samePrevious) {
    let defaultFormData = DEFAULT_CHECKOUT_DATA

    if (isClient && samePrevious) {
      return JSON.parse(window.sessionStorage.getItem(CHECKOUT_LOCAL_KEY)) || defaultFormData
    }

    return defaultFormData
  }

  removePreviousStorage () {
    if (isClient) {
      window.sessionStorage.removeItem(CHECKOUT_LOCAL_KEY)
      window.sessionStorage.removeItem(CHECKOUT_STAGE_LOCAL_KEY)
      window.sessionStorage.removeItem(CHECKOUT_COMPLETED_LOCAL_KEY)
    }
  }

  checkSamePrevious (mobileTariffId) {
    if (!isClient) return false

    const prevMobileTariffId = window.sessionStorage.getItem(CHECKOUT_MOBILE_TARIFF_KEY)

    if (isClient) {
      return prevMobileTariffId && mobileTariffId || !prevMobileTariffId && !mobileTariffId
    }
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

  handlerEdit (stage) {
    this.setState({
      stage
    })
  }

  handlerContinue (key, data) {
    let increment = 1

    if (this.state.stage === 0 && this.mobileTariffId) {
      increment = 2
    }

    const completed = this.state.stage <= this.state.completed ? this.state.completed : this.state.completed + increment

    this.setState({
      completed,
      stage: completed + increment,
      data: {
        ...this.state.data,
        [key]: data
      }
    })

    if (isClient) {
      window.sessionStorage.setItem(CHECKOUT_LOCAL_KEY, JSON.stringify(this.state.data))
      window.sessionStorage.setItem(CHECKOUT_STAGE_LOCAL_KEY, this.state.stage)
      window.sessionStorage.setItem(CHECKOUT_COMPLETED_LOCAL_KEY, this.state.completed)
    }

  }
}

export default withRouter(CheckoutPage)
