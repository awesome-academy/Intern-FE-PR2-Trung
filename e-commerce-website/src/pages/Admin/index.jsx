import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom'
import manageUserIcon from 'src/assets/images/manage-user-icon.png'
import productIcon from 'src/assets/images/product-icon.jpg'
import purchseIcon from 'src/assets/images/purchase-icon.png'
import { path } from 'src/constants/path'
import ManageOrders from './ManageOrders'
import ManageProducts from './ManageProducts'
import ManageUsers from './ManageUsers'

function Admin(props) {
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
                <div
                  className="user-sidebar__user-account"
                  style={{ justifyContent: 'center' }}
                >
                  <div className="user-sidebar__username">{displayName}</div>
                </div>
              </div>
              <div className="user-sidebar__menu">
                <NavLink
                  to={path.adminManageOrders}
                  className="user-sidebar__menu-link"
                >
                  <div className="user-sidebar__menu-icon">
                    <img src={purchseIcon} alt="purchase icon" />
                  </div>
                  Quản lí đơn hàng
                </NavLink>
                <NavLink
                  to={path.adminManageProducts}
                  className="user-sidebar__menu-link"
                >
                  <div className="user-sidebar__menu-icon">
                    <img src={productIcon} alt="product icon icon" />
                  </div>
                  Quản lí sản phẩm
                </NavLink>
                <NavLink
                  to={path.adminManageUsers}
                  className="user-sidebar__menu-link"
                >
                  <div className="user-sidebar__menu-icon">
                    <img src={manageUserIcon} alt="manage user icon" />
                  </div>
                  Quản lí người dùng
                </NavLink>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={9} md={10}>
            <div className="user-main">
              <Switch>
                <Route path={path.admin} exact>
                  <Redirect to={path.adminManageOrders} />
                </Route>
                <Route path={path.adminManageOrders} exact>
                  <ManageOrders />
                </Route>
                <Route path={path.adminManageProducts} exact>
                  <ManageProducts />
                </Route>
                <Route path={path.adminManageUsers} exact>
                  <ManageUsers />
                </Route>
              </Switch>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Admin
