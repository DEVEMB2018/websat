import React from 'react'
import PropTypes from 'prop-types'

import formStyles from '../../styles/_forms.scss'
import checkoutStyles from '../../styles/components/checkout.scss'

import CheckoutCard from './checkout-card'
import PersonalDataCustomer from './forms/personal-data-customer'
import PersonalDataBusiness from './forms/personal-data-business'

class CheckoutPersonalData extends React.Component {
  static propTypes = {
    editing: PropTypes.bool,
    completed: PropTypes.bool,
    onSave: PropTypes.func,
    onEdit: PropTypes.func,
    stage: PropTypes.number,
    data: PropTypes.shape({
      customer: PropTypes.object,
      business: PropTypes.object,
      target: PropTypes.string
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      option: props.data.target === 'empresa' ? 1 : 0
    }

    this.handlerOptionChange = this.handlerOptionChange.bind(this)
    this.handlerSave = this.handlerSave.bind(this)
    this.handlerModify = this.handlerModify.bind(this)
  }

  render () {
    return (
      <div>
        <CheckoutCard
          editing={this.props.editing}
          disabled={!this.props.editing && !this.props.completed}
          completed={this.props.completed}
          stage={this.props.stage}
          title={'Datos personales y de contacto'}
          subtitle={'Los datos personales serán los del titular del contrato. Los datos de contacto los utilizaremos para ponernos en contacto contigo.'}
        >
          <div>
            { this.props.editing
              ? this.renderForm()
              : this.renderSummary()
            }
          </div>
        </CheckoutCard>
      </div>
    )
  }

  renderForm () {
    return (
      <div>
        <div className={formStyles.checkboxGroup}>
          <span onClick={() => this.handlerOptionChange(0)}>
            <input type="checkbox" className={formStyles.firstHorizontalCheckbox} checked={this.state.option === 0} onChange={() => this.handlerOptionChange(0)} />
            <span className={formStyles.checkboxLabel}>
              Particular
            </span>
          </span>
          <span onClick={() => this.handlerOptionChange(1)}>
            <input type="checkbox" className={formStyles.horizontalCheckbox} checked={this.state.option === 1} onChange={() => this.handlerOptionChange(0)} />
            <span className={formStyles.checkboxLabel}>
              Empresa
            </span>
          </span>
        </div>
        { this.state.option === 0
          ? (<PersonalDataCustomer data={this.props.data.customer} onSave={this.handlerSave} />)
          : (<PersonalDataBusiness data={this.props.data.business} onSave={this.handlerSave} />)
        }
      </div>
    )
  }

  renderSummary () {
    if (!this.props.completed) return

    if (this.props.data.target === 'particular') {
      const data = this.props.data.customer

      return (
        <div>
          <div className={checkoutStyles.summaryLine}>{data.firstName} {data.lastName} {data.secondLastName}</div>
          <div className={checkoutStyles.summaryLine}>{data.nif} - {data.birthDate}</div>
          <div className={checkoutStyles.summaryLine}>Tfno: {data.phone} - Email: {data.email}</div>
          <button type="button" className={checkoutStyles.buttonModify} onClick={this.handlerModify}>Modificar</button>
        </div>
      )
    } else if (this.props.data.target === 'empresa') {
      const data = this.props.data.business

      return (
        <div>
          <div className={checkoutStyles.summaryLine}>{data.companyName} {data.contactName}</div>
          <div className={checkoutStyles.summaryLine}>Tfno: {data.phone} - Email: {data.email}</div>
          <button type="button" className={checkoutStyles.buttonModify} onClick={this.handlerModify}>Modificar</button>
        </div>
      )
    }
  }

  handlerOptionChange (opt) {
    this.setState({
      option: opt
    })
  }

  handlerSave (formData) {
    const target = this.state.option === 0 ? 'particular' : 'empresa'

    let data = {}

    if (target === 'particular') {
      data.customer = formData
    } else {
      data.business = formData
    }

    this.props.onSave({
      ...data,
      target: this.state.option === 0 ? 'particular' : 'empresa'
    })
  }

  handlerModify () {
    this.props.onEdit(this.props.stage)
  }

}

export default CheckoutPersonalData