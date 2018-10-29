import React from 'react'
import PropTypes from 'prop-types'

import contactStyles from '../styles/components/contact.scss'
import buttonStyles from '../styles/components/button.scss'

class Contact extends React.Component {

  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return (
      <div className={contactStyles.fullWidthContainer} id={this.props.idName}>
        <div className={contactStyles.container}>
          <div className={contactStyles.titleContainer}>
            <h1 className={contactStyles.title}>¿Tienes dudas?</h1>
            <p className={contactStyles.subtitle}>Estamos a tu disposición para resolver cualquier duda que pueda surgirte.</p>
            <p className={contactStyles.subtitle}>Completa este formulario, llámanos gratis, o si lo prefieres, <span className={contactStyles.underlinedTitle}>nosotros te llamamos</span>.</p>
            <div className={contactStyles.callInfoContainer}>
              <img className={contactStyles.img} src="/static/images/speech-bubble.svg"/>
              <div className={contactStyles.callInfo}>
                <span className={contactStyles.callInfoTitle}>Llamada gratuita</span>
                <span className={contactStyles.callInfoNumber}>900 696 897</span>
                <span className={contactStyles.callInfoTime}><span className={contactStyles.callInfoTimeLabel}>Días laborables:</span> 08:00h a 22:00h</span>
                <span className={contactStyles.callInfoTime}><span className={contactStyles.callInfoTimeLabel}>Días festivos:</span> 10:00h a 22:00h</span>
              </div>
            </div>
          </div>
          <div className={contactStyles.formContainer}>
            <form>
              <div className={contactStyles.inputsContainer}>
                <div className={contactStyles.inputContainer}>
                  <label className={contactStyles.inputLabel}>Nombre</label>
                  <input className={contactStyles.input} placeholder="Nombre"></input>
                </div>
              </div>
              <div className={contactStyles.inputsContainer}>
                <span className={contactStyles.inputContainer}>
                  <label className={contactStyles.inputLabel}>Correo electrónico</label>
                  <input className={contactStyles.input} placeholder="Correo electrónico"></input>
                </span>
                <span className={`${contactStyles.inputContainer} ${contactStyles.inputContainerSpace}`}>
                  <label className={contactStyles.inputLabel}>Teléfono de contacto</label>
                  <input className={contactStyles.input} placeholder="Teléfono de contacto"></input>
                </span>
              </div>
              <div className={contactStyles.inputsContainer}>
                <label className={contactStyles.inputLabel}>Mensaje</label>
                <textarea placeholder="Escribe aquí tus dudas, preguntas." className={contactStyles.textArea}></textarea>
              </div>
              <label className={contactStyles.inputLabel}><input type="checkbox" />Acepto lo que haya que aceptar para cumplir la GDPR</label>
              <button type="button" className={`${buttonStyles.primaryButton} ${contactStyles.button}`}>Enviar</button>
            </form>
          </div>
        </div>
    </div>
    )
  }

}

export default Contact
