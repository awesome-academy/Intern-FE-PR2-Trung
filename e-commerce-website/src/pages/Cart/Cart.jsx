import { Container } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noCartImage from 'src/assets/images/no-cart-transparent.png'
import ProductsListSlider from 'src/components/ProductsListSlider'
import QuantityController from 'src/components/QuantityController'
import LocalStorage from 'src/constants/localStorage'
import { path } from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import { cartActions } from './cart.slice'
import ConfirmationModal from 'src/components/ConfirmationModal'
import './styles.scss'

function Cart(props) {
  const dispatch = useDispatch()
  const {
    cart: { cartItems, totalPayment }
  } = useSelector(state => state.cart)
  const viewedProductList =
    JSON.parse(localStorage.getItem(LocalStorage.viewedProducts)) || []
  const { wishList } = useSelector(state => state.wishList)
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false)
  const [currentCartItemRemove, setCurrentCartItemRemove] = useState(null)

  const handleQuantityChange = (value, item) => {
    dispatch(
      cartActions.changeCarItemQuantity({ quantity: value, product: item })
    )
  }

  const handleResetCart = () => {
    dispatch(cartActions.resetCart())
  }

  const handleConfirmRemoveItem = item => {
    setShowRemoveConfirmation(true)
    setCurrentCartItemRemove(item)
  }

  const handleRemoveCartItem = () => {
    dispatch(cartActions.removeCartItem(currentCartItemRemove))
  }

  const handleCloseConfirmation = () => setShowRemoveConfirmation(false)

  return (
    <div className="cart">
      <Container maxWidth="lg">
        {!cartItems.length && (
          <>
            <div className="cart-no-cart">
              <div className="cart-no-cart__image">
                <img src={noCartImage} alt="no cart" />
              </div>
              <p className="cart-no-cart__message">
                Giỏ hàng của bạn còn trống
              </p>
              <Link to={path.home} className="button cart-no-cart__button">
                MUA NGAY
              </Link>
            </div>
          </>
        )}
        {cartItems.length && (
          <>
            <div className="cart-header">
              <div className="cart-header__name">Sản phẩm</div>
              <div className="cart-header__unit-price">Đơn giá</div>
              <div className="cart-header__quantity">Số lượng</div>
              <div className="cart-header__total-price">Số tiền</div>
              <div className="cart-header__action">Thao tác</div>
            </div>
            <div className="cart-list">
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item__info">
                    <Link
                      className="cart-item__image"
                      to={path.products + `/${generateNameId(item)}`}
                    >
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="cart-item__name-wrap">
                      <Link
                        className="cart-item__name"
                        to={path.products + `/${generateNameId(item)}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  <div className="cart-item__unit-price">
                    <span>{formatCurrency(item.price_before_discount)}</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                  <div className="cart-item__quantity">
                    <QuantityController
                      max={item.quantity}
                      value={item.inCart}
                      item={item}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div className="cart-item__total-price">
                    <span>{formatCurrency(item.inCart * item.price)}</span>
                  </div>
                  <div className="cart-item__action">
                    <button
                      className="cart-item__remove"
                      onClick={() => handleConfirmRemoveItem(item)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-footer__total-item">
                Tất cả sản phẩm ({cartItems.length || 0})
              </div>
              <button className="cart-footer__btn" onClick={handleResetCart}>
                Xóa
              </button>
              <div className="cart-footer__space-between" />
              <div className="cart-footer__total-payment">
                <div>Tổng thanh toán ({cartItems.length || 0} sản phẩm): </div>
                <div>{formatCurrency(totalPayment)}</div>
              </div>
              <Link
                to={path.checkoutDelivery}
                className="button cart-footer__checkout"
              >
                Mua hàng
              </Link>
            </div>
            <ConfirmationModal
              title="Xóa sản phẩm"
              content="Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ chứ?"
              confirmActions={handleRemoveCartItem}
              showConfirmation={showRemoveConfirmation}
              handleClose={handleCloseConfirmation}
            />
          </>
        )}

        <div className="wish-list-products">
          <ProductsListSlider
            title={'Sản phẩm yêu thích'}
            products={wishList}
          />
        </div>

        <div className="watched-products">
          <ProductsListSlider
            title={'Sản phẩm đã xem'}
            products={viewedProductList}
          />
        </div>
      </Container>
    </div>
  )
}

export default Cart
