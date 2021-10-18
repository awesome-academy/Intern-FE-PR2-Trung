import React from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaRegBell,
  FaRegQuestionCircle
} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import './styles.scss'
import useAuth from 'src/hooks/useAuth'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import LanguageSelect from 'src/components/LanguageSelect'

function Navbar(props) {
  const { authenticated, logout, userRole } = useAuth()
  const { t } = useTranslation()
  const { profile } = useSelector(state => state.auth)

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item navbar__item--separate">
          {t('header.app')}
        </li>
        <li className="navbar__item">
          {t('header.connect')}
          <div className="navbar__social">
            <FaFacebook className="icon" />
            <FaInstagram className="icon" />
          </div>
        </li>
      </ul>
      <ul className="navbar__list">
        <li className="navbar__item">
          <LanguageSelect />
        </li>
        <li className="navbar__item">
          <Link to={path.home} className="navbar__link">
            <FaRegBell className="icon" />
            {t('header.notification')}
          </Link>
        </li>
        <li className="navbar__item">
          <Link to={path.home} className="navbar__link">
            <FaRegQuestionCircle className="icon" />
            {t('header.help')}
          </Link>
        </li>
        {!authenticated ? (
          <>
            <li className="navbar__item navbar__item--strong navbar__item--separate">
              <Link className="navbar__link" to={path.register}>
                {t('header.register')}
              </Link>
            </li>
            <li className="navbar__item navbar__item--strong">
              <Link className="navbar__link" to={path.login}>
                {t('header.login')}
              </Link>
            </li>
          </>
        ) : (
          <li className="navbar__item">
            <div className="navbar__user">
              <Link to={path.purchase} className="navbar__user-info">
                <img
                  src={profile.photoURL}
                  alt="user avatar"
                  className="navbar__user-img"
                />
                <span className="navbar__user-name">{profile.displayName}</span>
              </Link>

              <ul className="navbar__user-menu">
                <li className="navbar__user-item">
                  <Link to={path.profile} className="navbar__user-link">
                    {t('account.myAccount')}
                  </Link>
                </li>
                {userRole === 'admin' && (
                  <li className="navbar__user-item">
                    <Link to={path.admin} className="navbar__user-link">
                      {t('account.admin')}
                    </Link>
                  </li>
                )}
                <li className="navbar__user-item">
                  <Link to={path.purchase} className="navbar__user-link">
                    {t('purchase.orders')}
                  </Link>
                </li>
                <li className="navbar__user-item">
                  <Link to="" className="navbar__user-link" onClick={logout}>
                    {t('account.logout')}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
