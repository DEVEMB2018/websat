import React from 'react'

import PropTypes from 'prop-types'

import satelliteStyles from '../styles/components/internet-satellite.scss'
import dividerStyles from '../styles/components/divider.scss'

const features = [
  {
    title: 'Navega a Alta Velocidad',
    content: 'Conéctate desde cualquier sitio con nuestros 30 Mb de velocidad de descarga y 6 Mb de subida. ¡Aprovecha la navegación ilimitada!'
  },
  {
    title: 'La mejor oferta',
    content: 'Ofrecemos las mejores tarifas para que puedas navegar sin preocuparte. También tenemos los mejores packs con la telefonía móvil del grupo MásMóvil.'
  },
  {
    title: '¡Alta gratis!',
    content: 'Ahorra más de 150€ de la instalación y 400€ de los equipos con la subvención de Feder y red.es. Nosotros lo gestionamos todo. ¡Aprovecha este ocasión!'
  },
  {
    title: 'Cobertura garantizada',
    content: 'Tenemos la solución a tus problemas de conectividad, estés donde estés. La mayor parte de nuestros clientes se encuentran en zonas dispersas o rurales.'
  }
].map((feature, index) => {
  feature.key = 'feature' + index

  return feature
})

class InternetSatellite extends React.Component {

  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return (
      <div className={satelliteStyles.container} id={this.props.idName}>
        <div className={satelliteStyles.titleContainer}>
          <h1 className={satelliteStyles.title}>¿Por qué elegir internet por satélite?</h1>
          <p className={satelliteStyles.subtitle}>Disfruta de una conexión a Internet de alta velocidad donde no llegan otras tecnologías</p>
        </div>
        <div className={satelliteStyles.mainFeaturueContainer}>
          <div className={satelliteStyles.imageBig}></div>
          <p className={satelliteStyles.imageBigText}>Internet por satélite es la mejor opción para conectarte a Internet en zonas rurales, dispersas y diseminadas donde ni la Fibra Óptica, ADSL u otras tecnologías inalámbricas llegan. Podrás disfrutar de 30 Mb de velocidad con la sencilla instalación de una antena. Si ves el cielo, ¡la mejor conexión a un solo paso!.</p>
        </div>
        <div className={`${dividerStyles.horizontalDivider} ${satelliteStyles.divider}`}></div>
        <div className={satelliteStyles.featuresContainer}>
          {features.map(({ title, content, key }) => (
            <div key={key} className={satelliteStyles.feature}>
              <div className={satelliteStyles.imageSmall}></div>
              <p className={satelliteStyles.featureTitleSmall}>{title}</p>
              <p className={satelliteStyles.imageSmallText}>{content}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default InternetSatellite
