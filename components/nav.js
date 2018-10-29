import React from 'react'
import { Link } from 'react-scroll'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Scroll = require('react-scroll')
const Events = Scroll.Events

import Caret from './caret'
import styles from '../styles/components/nav.scss'
import buttonStyles from '../styles/components/button.scss'

import { throttle } from '../helpers/throttle'

const mainLinks = [
  { anchor: 'inicio', label: 'Inicio' },
  { anchor: 'internet-satelite', label: 'Internet satélite' },
  { anchor: 'tarifas', label: 'Tarifas' },
  { anchor: 'preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { anchor: 'contacto', label: 'Contacto' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const topNavLinks = [
  { href: '/area-cliente', label: 'Accede a tu área de cliente' }
].map(link => {
  link.key = `top-nav-link-${link.href}-${link.href}`
  return link
})

class Nav extends React.Component {

  static propTypes = {
    idName: PropTypes.string,
    showBackToTop: PropTypes.bool
  }

  scroll
  scrollingToTop = false
  throttleScroll

  constructor (props) {
    super(props)

    this.state = {
      showScrollToTop: false,
      showMobileMenu: false
    }

    this.scroll = Scroll.animateScroll

    this.handlerScrollToTop = this.handlerScrollToTop.bind(this)
    this.handlerTabClick = this.handlerTabClick.bind(this)
    this.throttleScroll = throttle(this.scrollListener, 100, this)
  }

  componentDidMount () {
    window.addEventListener('scroll' , this.throttleScroll)

    Events.scrollEvent.register('end', () => {
      this.scrollingToTop = false
    })
  }

  componentWillUnmount () {
    this.window.removeEventListener('scroll', this.throttleScroll)
    this.window.removeEventListener('scroll', this.throttleScroll)
  }

  render () {
    return (
    <nav className={styles.nav} id={this.props.idName}>
      <div className={styles.topMenuContainer}>
        <div className={styles.topMenuContent}>
          <ul className={styles.topMenu}>
            <li className={styles.topMenuItem}>
              <a href={'/area-cliente'} className={styles.topMenuLink}>Accede a tu área de cliente</a>
            </li>
            <li className={styles.topMenuItemMobile}>
              <a href={'/area-cliente'} className={styles.topMenuLink}>Área de cliente</a>
            </li>
            <li className={classNames(styles.topMenuItem2)}>
              Llámanos al <strong>900 696 897</strong>
            </li>
            <li className={classNames(styles.topMenuItem2, styles.topMenuItem2Mobile)}>
              <strong>900 696 897</strong>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.mainMenuContainer}>
        <div className={styles.mainMenuContent}>
          <img className={styles.logo} src="/static/images/logo-embou-sat.svg" />
          <div className={styles.mainMenuContentTab} onClick={this.handlerTabClick}>
            <span className={styles.mainMenuContentTabLink}>Inicio</span>
            <Caret />
            <button type="button" className={classNames(buttonStyles.primaryButton, styles.callMeButtonTablet)}>
              Te llamamos gratis
            </button>
          </div>
          <ul className={classNames(styles.mainMenu, { [styles.openMobileMenu]: this.state.showMobileMenu })}>
            {mainLinks.map(({ anchor, label, key }) => (
              <li className={styles.listItem} key={key}>
                <Link className={styles.menuLink} activeClass={styles.linkActive} to={anchor} spy={true} smooth={true} hashSpy={true} isDynamic={true} offset={-120}>
                  {label}
                </Link>
              </li>
            ))}
            <li className={styles.listItem}>
              <button type="button" className={classNames(buttonStyles.primaryButton, styles.callMeButton)}>
                Te llamamos gratis
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={classNames(styles.topNavigation, { [styles.displayed]: this.state.showScrollToTop })} onClick={this.handlerScrollToTop}></div>
    </nav>
    )
  }

  isLinkActive (href) {
    return this.props.pathName === href
  }

  handlerTabClick () {
    this.showMobileMenu = this.setState({ showMobileMenu: !this.state.showMobileMenu })
  }

  handlerScrollToTop () {
    this.scroll.scrollToTop()
    this.scrollingToTop = true
  }

  scrollListener () {
    const scrollTop = window.scrollY

    if (window.scrollY > 500 && !this.scrollingToTop) {
      this.setState({ showScrollToTop: true })
    } else if (this.state.showScrollToTop) {
      this.setState({ showScrollToTop: false })
    }

  }

}

export default Nav
