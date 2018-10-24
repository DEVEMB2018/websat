import React from 'react'

import PropTypes from 'prop-types'

import whyStyles from '../styles/components/why-us.scss'

class WhyUs extends React.Component {
  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return (
      <div className={whyStyles.fullWidthContainer} id={this.props.idName}>
        <div className={whyStyles.container}>
          <div className={whyStyles.titleContainer}>
            <h2 className={whyStyles.title}>¿Por qué elegirnos?</h2>
            <p className={whyStyles.titleText}>Ofrecemos conexiones de internet a velocidades reales de ciudad, pero en sitios que no imaginas. Con transparencia, honestidad y sin sorpresas en las facturas.</p>
          </div>
          <div className={whyStyles.contentContainer}>
            <div className={whyStyles.logosContainer}>
              <img className={whyStyles.imageLogo} src='/static/images/logo-negativo.svg'></img>
              <img className={`${whyStyles.imageLogo} ${whyStyles.imageLogo2}`} src='/static/images/logo-masmovil.svg'></img>
            </div>
            <div className={whyStyles.textContainer}>
              <p className={`${whyStyles.contentText} ${whyStyles.contentBoldText}`}>Embou es una filial del Grupo MÁSMÓVIL especializada desde hace más de 15 años en servicios inalámbricos de conectividad a internet.</p>
              <p className={whyStyles.contentText}>El Grupo MásMóvil es uno de los operadores de telecomunicaciones más consolidados de España, que ofrece servicios de telefonía fija, móvil, e internet, a clientes residenciales, empresas y operadores, a través de sus principales marcas, Yoigo, MásMóvil, Pepephone y Lllamaya. El Grupo cuenta con infraestructuras propias de red fija de fibra, ADSL y móvil 3G y 4G, Grupo MÁSMÓVIL alcanza con su red fija 18 millones de hogares y más de 10 millones con fibra óptica.  Su red móvil 4G cubre el 85% de la población española. Además, ha alcanzado acuerdos con otros operadores de telecomunicaciones en España con los que completa su cobertura de red fija y móvil, convirtiéndose en uno de los operadores con mejor cobertura de red de España, El grupo cuenta con más de 6 millones de clientes.</p>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default WhyUs
