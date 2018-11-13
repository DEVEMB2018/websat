import React from 'react'
import PropTypes from 'prop-types'

import formStyles from '../../../styles/_forms.scss'

import TextInput from './text-input'

import {
  nameValidator,
  addressValidator,
  postalCodeValidator
} from '../../../helpers/validators'

class AddressForm extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string
  }

  static INITIAL_DATA = {
    address: '',
    postalCode: '',
    city: '',
    province: '',
    gps: ''
  }

  constructor (props) {
    super(props)

    // If name property is provided, this component supports
    // nested property names in Field inputs: eg. 'address.postalCode'
    // https://jaredpalmer.com/formik/docs/guides/arrays
    let prefix = ''

    if (props.name) prefix = props.name + '.'

    this.state = {
      prefix
    }
  }

  render () {
    return (
      <div>
        <div className={formStyles.formGroup}>
          <TextInput name={`${this.state.prefix}address`} text={this.props.title} placeholder="Calle, número, piso, puerta" validate={addressValidator} />
          <TextInput name={`${this.state.prefix}postalCode`} text="Código postal" placeholder="CP" validate={postalCodeValidator} />
        </div>
        <div className={formStyles.formGroup}>
          <TextInput name={`${this.state.prefix}city`} text="Localidad" placeholder="Localidad" validate={nameValidator} />
          <TextInput name={`${this.state.prefix}province`} text="Provincia" placeholder="Selecciona tu provincia" />
        </div>
        <div className={formStyles.formGroup}>
          <TextInput name={`${this.state.prefix}gps`} text="Coordenadas (opcional)" placeholder="Coordenadas geográficas" />
        </div>
      </div>
    )
  }

}

export default AddressForm