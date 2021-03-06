import { Container, Grid } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { path } from 'src/constants/path'
import Password from './Password'
import Profile from './Profile'
import Purchase from './Purchase'
import profileIcon from 'src/assets/images/profile-icon.png'
import passwordIcon from 'src/assets/images/password-icon.png'
import purchseIcon from 'src/assets/images/purchase-icon.png'
import { useTranslation } from 'react-i18next'

import './styles.scss'

function User(props) {
  const { t } = useTranslation()
  const { photoURL, displayName } = useSelector(state => state.auth.profile)

  return (
    <div className="user">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} md={2}>
            <div className="user-sidebar">
              <div className="user-sidebar__brief">
                <Link to={path.profile} className="user-sidebar__avatar">
                  <img src={photoURL} alt="user avatar" />
                </Link>
                <div className="user-sidebar__user-account">
                  <div className="user-sidebar__username">{displayName}</div>
                  <Link to={path.profile} className="user-sidebar__brief-edit">
                    <Edit fontSize="small" />
                    {t('profile.editProfile')}
                  </Link>
                </div>
              </div>
              <div className="user-sidebar__menu">
                <NavLink to={path.profile} className="user-sidebar__menu-link">
                  <div className="user-sidebar__menu-icon">
                    <img src={profileIcon} alt="profile icon" />
                  </div>
                  {t('profile.myProfile')}
                </NavLink>
                <NavLink to={path.password} className="user-sidebar__menu-link">
                  <div className="user-sidebar__menu-icon">
                    <img src={passwordIcon} alt="password icon" />
                  </div>
                  {t('password.changePassword')}
                </NavLink>
                <NavLink to={path.purchase} className="user-sidebar__menu-link">
                  <div className="user-sidebar__menu-icon">
                    <img src={purchseIcon} alt="purchase icon" />
                  </div>
                  {t('purchase.orders')}
                </NavLink>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <div className="user-main">
              <Switch>
                <Route path={path.user} exact>
                  <Redirect to={path.profile} />
                </Route>
                <Route path={path.profile}>
                  <Profile />
                </Route>
                <Route path={path.password}>
                  <Password />
                </Route>
                <Route path={path.purchase} exact>
                  <Purchase />
                </Route>
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default User
