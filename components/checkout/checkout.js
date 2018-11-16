import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'

import styles from '../../styles/pages/checkout.scss'
import dividerStyles from '../../styles/components/divider.scss'

import CheckoutPersonalData from './checkout-personal-data'
import CheckoutAddress from './checkout-address'
import CheckoutMobile from './checkout-mobile'
import CheckoutSummary from './checkout-summary'
import CheckoutBilling from './checkout-billing'
import CheckoutPersonalCustomer from './forms/personal-data-customer'
import CheckoutPersonalBusiness from './forms/personal-data-business'
import AddressForm from './forms/address';

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
  },
  mobile: {
    option: 0,
    ...CheckoutMobile.INITIAL_DATA
  },
  bank: {
    bank: '',
    address: {},
    differentAddress: false,
    generalConditions: false,
    communications: false
  }
}

class Checkout extends React.Component {

  static propTypes = {
    tariff: PropTypes.object.isRequired,
    mobileTariff: PropTypes.object
  }

  constructor (props) {
    super(props)

    const samePrevious = this.checkSamePrevious(props.mobileTariff)

    if (!samePrevious) this.removeAllStorage()

    window.sessionStorage.setItem(CHECKOUT_TARIFF_KEY, props.tariff.id)
    if (props.mobileTariff) {
      window.sessionStorage.setItem(CHECKOUT_MOBILE_TARIFF_KEY, props.mobileTariff.id)
    }

    this.state = {
      tariff: props.tariff,
      mobileTariff: props.mobileTariff,
      stage: this.getInitialStage(samePrevious),
      completed: this.getInitialCompleted(samePrevious),
      data: this.getInitialFormData(samePrevious)
    }

    this.handlerContinue = this.handlerContinue.bind(this)
    this.handlerEdit = this.handlerEdit.bind(this)

    ReactModal.setAppElement('#main')
  }

  render () {
    return (
      <div className={styles.checkoutContent}>
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
                  onEdit={(stage) => this.handlerEdit(stage)}
                  data={this.state.data.mobile}
                />
                  <div className={dividerStyles.horizontalDivider}></div>
                </div>
              )
              : ''
            }

            <div className={dividerStyles.horizontalDivider}></div>

            <CheckoutBilling
              stage={this.state.mobileTariff ? 3 : 2}
              editing={this.state.mobileTariff ? this.state.stage === 3 : this.state.stage === 2}
              completed={this.state.mobileTariff ? this.state.completed >= 3 : this.state.completed >= 2}
              onSave={(data) => this.handlerContinue('billing', data)}
              onEdit={(stage) => this.handlerEdit(stage)}
              data={this.state.data.bank}
            />
          </div>
          <div className={styles.summaryContainer}>
            <CheckoutSummary tariff={this.state.tariff} mobileTariff={this.state.mobileTariff} />
          </div>
        </div>
      </div>
    )
  }

  getInitialStage (samePrevious) {
    if (samePrevious) {
      return parseInt(window.sessionStorage.getItem(CHECKOUT_STAGE_LOCAL_KEY)) || 0
    }

    return 0
  }

  getInitialCompleted (samePrevious) {
    const defaultComp = -1

    if (samePrevious) {
      const prevComp = parseInt(window.sessionStorage.getItem(CHECKOUT_COMPLETED_LOCAL_KEY))
      return prevComp || prevComp === 0 ? prevComp : defaultComp
    }

    return defaultComp
  }

  getInitialFormData (samePrevious) {
    let defaultFormData = DEFAULT_CHECKOUT_DATA

    if (samePrevious) {
      return JSON.parse(window.sessionStorage.getItem(CHECKOUT_LOCAL_KEY)) || defaultFormData
    }

    return defaultFormData
  }

  removeAllStorage () {
    window.sessionStorage.removeItem(CHECKOUT_LOCAL_KEY)
    window.sessionStorage.removeItem(CHECKOUT_TARIFF_KEY)
    window.sessionStorage.removeItem(CHECKOUT_MOBILE_TARIFF_KEY)
    window.sessionStorage.removeItem(CHECKOUT_STAGE_LOCAL_KEY)
    window.sessionStorage.removeItem(CHECKOUT_COMPLETED_LOCAL_KEY)
  }

  checkSamePrevious (mobileTariff) {
    const prevMobileTariffId = window.sessionStorage.getItem(CHECKOUT_MOBILE_TARIFF_KEY)

    return prevMobileTariffId && mobileTariff || !prevMobileTariffId && !mobileTariff
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

    window.sessionStorage.setItem(CHECKOUT_LOCAL_KEY, JSON.stringify(this.state.data))
    window.sessionStorage.setItem(CHECKOUT_STAGE_LOCAL_KEY, this.state.stage)
    window.sessionStorage.setItem(CHECKOUT_COMPLETED_LOCAL_KEY, this.state.completed)
  }
}

export default Checkout
