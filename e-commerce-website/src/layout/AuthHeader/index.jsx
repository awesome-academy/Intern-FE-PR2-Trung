import { Container } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import './styles.scss'
import logo from 'src/assets/logo/logo-primary.svg'
import { useTranslation } from 'react-i18next'

function AuthHeader({ title }) {
  const { t } = useTranslation()

  return (
    <header className="auth-header">
      <Container maxWidth="lg">
        <div className="auth-header__main">
          <div className="auth-header__left">
            <div className="auth-header__logo">
              <Link to={path.home}>
                <div className="auth-header__logo-img">
                  <img src={logo} alt="shop logo" />
                </div>
              </Link>
            </div>
            <div className="auth-header__title">{title}</div>
          </div>
          <div className="auth-header__right">
            <Link to="" className="auth-header__help">
              {t('register.help')}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default AuthHeader
