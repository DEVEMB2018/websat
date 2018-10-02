import React from 'react'

import Link from 'next/link'

import footerStyles from '../styles/components/footer.scss'

const links = [
  { href: 'a', label: 'Grupo MásMóvil' },
  { href: 'b', label: 'Aviso legal' },
  { href: 'c', label: 'Privacidad' },
  { href: 'd', label: 'Cookies' },
  { href: 'e', label: 'Condiciones generales' }
].map(link => {
  link.key = `footer-nav-link-${link.href}`
  return link
})

const Footer = () => (
  <nav className={footerStyles.navContainer}>
    <span className={footerStyles.copyItem}></span>
    <ul className={footerStyles.list}>
      {links.map((link) => (
        <li key={link.key} className={footerStyles.listItem}>
          <Link href={link.href}>
            <a className={footerStyles.link}>{link.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

export default Footer
