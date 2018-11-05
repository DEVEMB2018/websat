import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Price from '../price'
import styles from '../../styles/components/checkout-summary.scss'
import dividerStyles from '../../styles/components/divider.scss'

class CheckoutSummary extends React.Component {
  static propTypes = {
    tariff: PropTypes.object.isRequired,
    mobileTariff: PropTypes.object
  }

  render () {
    return (
      <div className={styles.card}>
        <p className={styles.cardTitle}>Resumen</p>

        <div className={styles.descriptionSection}>
          <p className={styles.sectionTitle}>Tu cuota mensual</p>
          <div className={styles.infoColumn}>
            {
              this.renderTariffs()
            }
            <p className={styles.tariffDetails}>Detalles de la tarifa</p>
          </div>
          <div className={styles.priceColumn}>
            <span className={styles.smallPrice}>
              {this.props.mobileTariff ? this.props.mobileTariff.price : this.props.tariff.price} €/mes
            </span>
          </div>
        </div>

        <div className={dividerStyles.horizontalBlackDivider}></div>

        <div className={styles.totalPriceSection}>
          <div className={styles.infoColumn}>
            <p className={styles.totalTitle}>Total mensual</p>
            <p className={styles.totalSubtitle}>IVA incluido</p>
          </div>
          <Price price={this.props.mobileTariff ? this.props.mobileTariff.price : this.props.tariff.price} currency={'€/mes'} small={true} />
        </div>

        <div className={styles.orderSection}>
          <p className={styles.sectionTitle}>Tu pedido</p>
          <div className={styles.infoColumn}>
            { this.props.mobileTariff ? (<p>Tarjeta SIM</p>) : '' }
            <p>Router WIFI</p>
            <p>Instalación y equipos</p>
          </div>
          <div className={styles.priceColumn}>
            { this.props.mobileTariff ? (<p>GRATIS</p>) : '' }
            <p>GRATIS</p>
            <p>GRATIS</p>
          </div>
        </div>

        <div className={dividerStyles.horizontalBlackDivider}></div>

        <div className={styles.costSection}>
          <div className={styles.infoColumn}>
            <p>Total a pagar hoy</p>
          </div>
          <div className={styles.priceColumn}>
            <p>0,00 €</p>
          </div>
        </div>
      </div>
    )
  }

  renderTariffs () {
    return (
      <span>
        <p className={styles.tariffName}>Internet satélite <strong>{this.props.tariff.data} GB</strong></p>
        { this.props.mobileTariff
          ? (<p className={styles.mobileTariffName}>Móvil <strong>{this.props.mobileTariff.data}GB + llamadas ilimitadas</strong></p>)
          : ''
        }
      </span>
    )
  }

}

export default CheckoutSummary