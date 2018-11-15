import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field, ErrorMessage } from 'formik'

import formStyles from '../../../styles/_forms.scss'

import TextInput from './text-input'

import { PROVINCES } from '../../../contexts/provinces'

import {
  nameValidator,
  addressValidator,
  postalCodeValidator,
  provinceValidator
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

          <div className={formStyles.inputContainer}>
              <label className={formStyles.inputLabel}>
                Provincia
              </label>
              <Field
                className={classNames(formStyles.selectorInput)}
                placeholder="Selecciona tu provincia"
                component="select"
                validate={provinceValidator}
                name={`${this.state.prefix}province`}>
                  <option disabled value="">Selecciona tu provincia</option>
                  { PROVINCES.map((prov) => (
                      <option value={prov} key={prov}>{prov}</option>
                    ))
                  }
              </Field>
              <ErrorMessage name={`${this.state.prefix}province`} component="div" className={formStyles.errorMessage} />
          </div>

        </div>
        <div className={formStyles.formGroup}>
          <TextInput name={`${this.state.prefix}gps`} text="Coordenadas (opcional)" placeholder="Coordenadas geográficas" />
        </div>
      </div>
    )
  }

}

export default AddressForm