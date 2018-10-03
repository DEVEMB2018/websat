import React from 'react'
import { Link } from 'react-scroll'
import classNames from 'classnames'

const Scroll = require('react-scroll')
const Events = Scroll.Events

import styles from '../styles/components/nav.scss'
import buttonStyles from '../styles/components/button.scss'

import PropTypes from 'prop-types'
import { throttle } from '../helpers/throttle'

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
    idName: PropTypes.string,
    showBackToTop: PropTypes.bool
  }

  scroll
  scrollingToTop = false
  throttleScroll

  constructor (props) {
    super(props)

    this.state = {
      showScrollToTop: false
    }

    this.scroll = Scroll.animateScroll

    this.handlerScrollToTop = this.handlerScrollToTop.bind(this)
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
  }

  render () {
    return <div>
      <nav className={styles.nav} id={this.props.idName}>
        <ul className={styles.topMenu}>
          {topNavLinks.map(({key, href, label}) => (
            <li key={key}>
              <a href={href} className={styles.topMenuLink}>{label}</a>
            </li>
          ))
          }
        </ul>
        <div className={styles.mainMenuContainer}>
          <img className={styles.logo} src="/static/images/logo-embou-sat.svg" />
          <ul className={styles.mainMenu}>
            {mainLinks.map(({ anchor, label, key }) => (
              <li className={styles.listItem} key={key}>
                <Link className={styles.menuLink} activeClass={styles.linkActive} to={anchor} spy={true} smooth={true} hashSpy={true} isDynamic={true} offset={-120}>
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
      <div className={classNames(styles.topNavigation, { [styles.displayed]: this.state.showScrollToTop })} onClick={this.handlerScrollToTop}></div>
    </div>
  }

  isLinkActive (href) {
    return this.props.pathName === href
  }

  handlerScrollToTop () {
    this.scroll.scrollToTop()
    this.scrollingToTop = true
  }

  scrollListener () {
    console.log('scroll happens')

    const scrollTop = window.scrollY

    if (window.scrollY > 500 && !this.scrollingToTop) {
      this.setState({ showScrollToTop: true })
    } else if (this.state.showScrollToTop) {
      this.setState({ showScrollToTop: false })
    }

  }

}

export default Nav
