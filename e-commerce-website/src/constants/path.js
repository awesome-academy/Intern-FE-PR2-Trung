class Path {
  constructor() {
    this.home = '/'
    this.login = '/login'
    this.register = '/register'
    this.products = '/products'
    this.productDetail = '/products/:idProduct'
    this.cart = '/cart'
    this.checkout = '/checkout'
    this.delivery = `${this.checkout}/delivery`
    this.summary = `${this.checkout}/summary`
    this.user = '/user'
    this.profile = `${this.user}/profile`
    this.password = `${this.user}/password`
    this.purchase = `${this.user}/purchase`
    this.admin = '/admin'
    this.adminManageProducts = `${this.admin}/products`
    this.adminManageUsers = `${this.admin}/users`
    this.adminManageOrders = `${this.admin}/orders`
    this.notFound = '*'
  }
}

export const path = new Path()
