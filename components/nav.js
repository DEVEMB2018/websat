import React from 'react'
// import Link from 'next/link'
import { Link } from 'react-scroll'

import styles from '../styles/components/nav.scss'
import buttonStyles from '../styles/components/button.scss'

import PropTypes from 'prop-types'

const mainLinks = [
  { anchor: 'inicio', label: 'Inicio' },
  { anchor: 'internet-satelite', label: 'Internet satélite' },
  { anchor: 'tarifas', label: 'Tarifas' },
  { anchor: 'preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { anchor: 'contacto', label: 'contacto' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const topNavLinks = [
  { href: '/ayuda', label: 'Ayuda' },
  { href: '/area-cliente', label: 'Accede a tu área de cliente' }
].map(link => {
  link.key = `top-nav-link-${link.href}-${link.href}`
  return link
})

class Nav extends React.Component {

  static propTypes = {
    idName: PropTypes.string
  }

  render () {
    return <nav className={styles.nav} id={this.props.idName}>
      <ul className={styles.topMenu}>
        {topNavLinks.map(({key, href, label}) => (
          <li key={key}>
            <Link href={href} to="porque" spy={true}>
              <a className={styles.topMenuLink}>{label}</a>
            </Link>
          </li>
        ))
        }
      </ul>
      <div className={styles.mainMenuContainer}>
        <img className={styles.logo} src="https://www.embou.com/data/img/logo_embou.png" />
        <ul className={styles.mainMenu}>
          {mainLinks.map(({ anchor, label, key }) => (
            <li className={styles.listItem} key={key}>
              <Link className={styles.menuLink} activeClass={styles.linkActive} to={anchor} spy={true} smooth={true} hashSpy={true}>
                {label}
              </Link>
            </li>
          ))}
          <li className={styles.listItem}>
            <button type="button" id="ola" className={buttonStyles.primaryButton}>
              Te llamamos gratis
            </button>
          </li>
        </ul>
      </div>
    </nav>
  }

  isLinkActive (href) {
    return this.props.pathName === href
  }

}

export default Nav
