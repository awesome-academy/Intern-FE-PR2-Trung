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
import AuthLayout from './layout/AuthLayout'
import UnauthenticatedGuard from './guards/UnauthenticatedGuard'
import AuthenticatedGuard from './guards/AuthenticatedGuard'

export default function Routes() {
  return (
    <Switch>
      <Route path={path.home} exact>
        <MainLayout>
          <Home />
        </MainLayout>
      </Route>
      <Route path={path.login}>
        <UnauthenticatedGuard>
          <AuthLayout title="Đăng nhập">
            <Login />
          </AuthLayout>
        </UnauthenticatedGuard>
      </Route>
      <Route path={path.register}>
        <UnauthenticatedGuard>
          <AuthLayout title="Đăng ký">
            <Register />
          </AuthLayout>
        </UnauthenticatedGuard>
      </Route>
      <Route path={path.products} exact>
        <MainLayout>
          <Breadcrumbs />
          <Products />
        </MainLayout>
      </Route>
      <Route path={path.productDetail}>
        <MainLayout>
          <Breadcrumbs />
          <ProductDetail />
        </MainLayout>
      </Route>
      <Route path={path.cart}>
        <Cart />
      </Route>
      <Route path={path.user}>
        <AuthenticatedGuard>
          <MainLayout>
            <User />
          </MainLayout>
        </AuthenticatedGuard>
      </Route>
      <Route path={path.admin}>
        <AuthenticatedGuard>
          <Admin />
        </AuthenticatedGuard>
      </Route>
      <Route path={path.notFound}>
        <NotFound />
      </Route>
    </Switch>
  )
}
