import React from 'react'
import PropTypes from 'prop-types'

import formStyles from '../../styles/_forms.scss'

import CheckoutCard from './checkout-card'
import PersonalDataCustomer from './forms/personal-data-customer'
import PersonalDataBusiness from './forms/personal-data-business'

class CheckoutPersonalData extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    editing: PropTypes.bool,
    onSave: PropTypes.func,
    stage: PropTypes.number,
    data: PropTypes.shape({
      customer: PropTypes.object,
      business: PropTypes.object
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      option: 0
    }

    this.handlerOptionChange = this.handlerOptionChange.bind(this)
    this.handlerSave = this.handlerSave.bind(this)
  }

  componentDidMount() {
    console.log('hol')
  }

  componentWillReceiveProps (props) {
    this.state = {
      option: this.props.data.target === 'empresa' ? 1 : 0
    }
  }

  render () {
    return (
      <div>
        <CheckoutCard
          editing={this.props.editing}
          disabled={this.props.disabled}
          completed={this.props.completed}
          stage={this.props.stage}
          title={'Datos personales y de contacto'}
          subtitle={'Los datos personales serán los del titular del contrato. Los datos de contacto los utilizaremos para ponernos en contacto contigo.'}
          form={this.renderForm()}
        />
      </div>
    )
  }

  renderForm () {
    if (this.props.editing) {
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

}

export default CheckoutPersonalData