import { Route, Switch } from 'react-router-dom'
import { path } from './constants/path'
import MainLayout from './layout/MainLayout'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import User from './pages/User'
import Admin from './pages/Admin'
import Cart from './pages/Cart/Cart'
import Breadcrumbs from './components/Breadcrumbs'

export default function Routes() {
  return (
    <Switch>
      <Route path={path.home} exact>
        <MainLayout>
          <Home />
        </MainLayout>
      </Route>
      <Route path={path.login}>
        <Login />
      </Route>
      <Route path={path.register}>
        <Register />
      </Route>
      <Route path={path.products}>
        <MainLayout>
          <Breadcrumbs />
          <Products />
        </MainLayout>
      </Route>
      <Route path={path.productDetail}>
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      </Route>
      <Route path={path.cart}>
        <Cart />
      </Route>
      <Route path={path.user}>
        <MainLayout>
          <User />
        </MainLayout>
      </Route>
      <Route path={path.admin}>
        <Admin />
      </Route>
      <Route path={path.notFound}>
        <NotFound />
      </Route>
    </Switch>
  )
}
