import React from 'react'
import Collapsible from 'react-collapsible'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import faqsStyles from '../styles/components/faqs.scss'
import caretStyles from '../styles/components/caret.scss'

const faqs = [
  {
    title: '¿Qué necesito para tener internet por satélite?',
    content: 'El servicio Internet Satélite requiere de una parabólica y un modem. Embou se encarga de proveer, instalar y orientar ambos equipos en tu hogar para que tú no tengas que preocuparte de nada. La parabólica se instala en el exterior de tu hogar y se conecta por cable al router wifi, que se instalará en el interior de tu hogar. Estos equipos se proporcionarán en modalidad de alquiler.'
  },
  {
    title: '¿Hasta cuando dura la promoción de alta gratis?',
    content: 'Actualmente el <b>alta gratis</b> está subvencionada por Red.es y Feder de manera que dependemos de la partida ministerial destinada a ello y seremos nosotros los que realicemos todas las gestiones necesarias. Por nuestra parte además, tendrás el alta, la instalación y el router wifi gratis con una <b>permanencia de 18 meses</b>.'
  },
  {
    title: '¿Puedes disponer de telefonía fija?',
    content: 'Actualmente no ofrecemos servicio de telédono fijo a través de Internet por satélite. Sin embargo, te ofrecemos contratar telefonía móvil con las mejores tarifas a través del servicio del Grupo MÁSMÓVIL.'
  },
  {
    title: '¿Puedo consultar el consumo de mi conexión?',
    content: 'Puedes consultar tu consumo de datos en cualquier momento llamando al <b>900 696 897</b> o accediendo al portal http://www.ejemplo.com'
  },
  {
    title: '¿El tráfico de subida se descuenta del volumen de datos contratados?',
    content: 'Sí, tanto el tráfico de datos de bajada como de subida, fuera del horario nocturno (01h a 06h), descuentan del volumen de datos mensual contratado.'
  },
  {
    title: '¿Por qué se me agotan rápido los datos?',
    content: 'Algunas actividades generan un mayor consumo de datos: ver vídeos o series online, descargar archivos o programas tipo P2P suponen un gran consumo de datos. Se recomiendo realizar las descargas pesadas en horario nocturno (01h a 06h).'
  },
  {
    title: '¿Cuando se resetea mi consumo de datos contratados?',
    content: 'El consumo realizado se resetea mensualmente, el día en que se llevó a cabo la activación del servicio y empezaste a disfrutar de la conexión, se fija como el día del mes en el que se inicia el ciclo. Ej. para un alta realizada el 08/10/2018 los datos se resetean los días 6 de cada mes.'
  },
  {
    title: '¿Puedo disfrutar de servicios multimedia con mi conexión de internet por satélite?',
    content: `Es posible <b>jugar online</b>, pero debido al retardo (latencia) de este tipo de conexiones, puede hacer que no funcione correctamente por lo que no se recomienda para determinados juegos.
<b>Podrás ver</b> contenidos en <b>streaming (Netflix, Youtube, etc…)</b> pero quizás notes un pequeño retardo al comienzo de la carga.
La <b>latencia</b> o retardo de conexión por <b>satélite</b> ronda los <b>700 ms</b> (milisegundos).`
  }
].map((feature, index) => {
  feature.key = 'faq-' + index

  return feature
})

class Faqs extends React.Component {

  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return (
      <div className={faqsStyles.fullWidthContainer} id={this.props.idName}>
        <div className={faqsStyles.container}>
          <div className={faqsStyles.titleContainer}>
            <h1 className={faqsStyles.title}>Preguntas frecuentes</h1>
            <p className={faqsStyles.subtitle}>Aquí respondemos a las preguntas más habituales de nuestros clientes antes de contratar</p>
          </div>
          <div className={faqsStyles.faqsContainer}>
            {faqs.map((faq) => (
              <CollapsibleCard title={faq.title} content={faq.content} key={faq.key} />
            ))
            }
          </div>
        </div>
      </div>
    )
  }
}

class CollapsibleCard extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      isCollapsed: true
    }
    this.handlerOpen = this.handlerOpen.bind(this)
    this.handlerClose = this.handlerClose.bind(this)
  }

  render () {
    return (
      <div className={faqsStyles.faqCard}>
        <Collapsible
          trigger={this.renderFaqTitle(this.props.title)}
          triggerClassName={faqsStyles.tab}
          triggerOpenedClassName={faqsStyles.openedTab}
          contentOuterClassName={faqsStyles.collapsableContent}
          onOpen={this.handlerOpen}
          onClose={this.handlerClose}>
          <p dangerouslySetInnerHTML={{__html: this.props.content}}></p>
        </Collapsible>
      </div>
    )
  }

  handlerOpen () {
    this.setState({ isCollapsed: false })
  }

  handlerClose () {
    this.setState({ isCollapsed: true })
  }

  renderFaqTitle (title) {
    const classes = classNames({
      [caretStyles.caretDown]: this.state.isCollapsed,
      [caretStyles.caretUp]: !this.state.isCollapsed
    })

    return <div>
      <span className={classes}></span>
      {title}
    </div>
  }


}

export default Faqs
