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
    content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Vivamus vestibulum nec eros in efficitur.'
  },
  {
    title: '¿Puedes disponer de telefonía fija?',
    content: 'Donec quis eros sit amet nibh tempus maximus ac vel purus. Curabitur vel erat fringilla, vehicula augue vel, interdum magna. Aliquam erat volutpat. Cras eget accumsan arcu.'
  },
  {
    title: '¿Puedo consultar el consumo de mi conexión?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  },
  {
    title: '¿El tráfico de subida se descuenta del volumen de datos contratados?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  },
  {
    title: '¿Por qué se me agotan rápido los datos?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  },
  {
    title: '¿Cuando se resetea mi consumo de datos contratados?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
  },
  {
    title: '¿Puedo disfrutar de servicios multimedia con mi conexión de internet por satélite?',
    content: 'Praesent gravida placerat odio, eu pellentesque nisi cursus sed. In fermentum, purus a finibus pulvinar, purus sem mollis massa, et egestas lorem massa ut turpis. Morbi dui metus, mollis ac leo sit amet, tincidunt sagittis dui. Integer ut purus ex.'
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
          onClose={this.handlerClose}
        >
          <p>{this.props.content}</p>
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
