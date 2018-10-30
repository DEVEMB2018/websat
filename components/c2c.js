import React from 'react'
import ReactModal from 'react-modal'

import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from '../styles/components/c2c.scss'
import buttonStyles from '../styles/components/button.scss'
import dividerStyles from '../styles/components/divider.scss'

class C2cModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  render () {
    return (
      <ReactModal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onClose}
        onRequestClose={this.props.handleClose}
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}>
        <div className={styles.container}>
          <span className={styles.closeModal} onClick={this.props.handleClose}>X</span>
          <h2 className={styles.modalTitle}>Te llamamos gratis</h2>
          <p>Dinos tu número de teléfono y te llamamos nosotros totalmente gratis y sin ningún compromiso.</p>
          <form>
            <input className={styles.textInput} placeholder="Tu teléfono"></input>
            <input className={styles.textInput} placeholder="Tu nombre"></input>
            <input className={styles.textInput} placeholder="Localidad (opcional)"></input>
            <label className={styles.checkboxContainer}>
              <input type="checkbox" className={styles.checkbox} />
              <span className={styles.checkboxLabel}>
                He leído y acepto los términos de protección de datos
              </span>
            </label>
            <button type="button" className={classNames(buttonStyles.primaryButton, styles.button)}>Llamadme</button>
          </form>
          <p>Lunes a viernes, de 09:00h a 20:00h</p>
          <div className={classNames(dividerStyles.horizontalDivider, styles.divider)}></div>
          <p>O si lo prefieres llámanos gratis al:</p>
          <p className={styles.contactPhone}>900 696 897</p>
        </div>
      </ReactModal>
    )
  }

}

export default C2cModal