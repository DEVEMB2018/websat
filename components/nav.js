import React from 'react'
import Link from 'next/link'

import styles from '../styles/components/nav.scss'
import buttonStyles from '../styles/components/button.scss'
import classNames from 'classnames'

import PropTypes from 'prop-types'

const mainLinks = [
  { href: '', label: 'Inicio' },
  { href: '/internet-satelite', label: 'Internet satélite' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/contacto', label: 'contacto' }
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
  static getInitialProps ({ pathname, req }) {
    return { pathName: req && req.url || pathname  }
  }

  render () {
    return <nav className={styles.nav}>
      <ul className={styles.topMenu}>
        {topNavLinks.map(({key, href, label}) => (
          <li key={key}>
            <Link href={href}>
              <a className={styles.topMenuLink}>{label}</a>
            </Link>
          </li>
        ))
        }
      </ul>
      <div className={styles.mainMenuContainer}>
        <img className={styles.logo} src="https://www.embou.com/data/img/logo_embou.png" />
        <ul className={styles.mainMenu}>
          {mainLinks.map(({ href, label, key }) => (
            <li className={styles.listItem} key={key}>
              <Link href={href}>
                <a className={ classNames(styles.menuLink, { [styles.linkActive]: this.isLinkActive(href)}) }>{label}</a>
              </Link>
            </li>
          ))}
          <li className={styles.listItem}>
            <button type="button" className={buttonStyles.primaryButton}>
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

Nav.propTypes = {
  pathName: PropTypes.string
}

export default Nav
