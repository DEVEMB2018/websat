import React from 'react'

import contactStyles from '../styles/components/contact.scss'
import buttonStyles from '../styles/components/button.scss'

class Contact extends React.Component {

  render () {
    return <div className={contactStyles.container}>
      <div className={contactStyles.titleContainer}>
        <h1 className={contactStyles.title}>¿Tienes dudas?</h1>
        <p className={contactStyles.subtitle}>Estamos a tu disposición para resolver cualquier duda que pueda surgirte.</p>
        <p className={contactStyles.subtitle}>Completa este formulario, llámanos gratis, o si lo prefieres, nosotros te llamamos.</p>
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
          <checkbox></checkbox>
          <button type="button" className={`${buttonStyles.primaryButton} ${contactStyles.button}`}>Enviar</button>
        </form>
      </div>
    </div>
  }

}

export default Contact