import { Container } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { cartActions } from 'src/pages/Cart/cart.slice'
import { formatCurrency, generateNameId } from 'src/utils/helper'
import { useHistory } from 'react-router'
import './styles.scss'
import LocalStorage from 'src/constants/localStorage'
import { checkoutActions, createPurchases } from '../checkout.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { purchaseStatus } from 'src/constants/purchaseStatus'

function Summary(props) {
  const { delivery, paymentMethod } = JSON.parse(
    localStorage.getItem(LocalStorage.purchase)
  )

  const {
    cart: { cartItems, totalPayment }
  } = useSelector(state => state.cart)

  const { profile } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const onCheckoutConfirm = async () => {
    try {
      const newPurchase = {
        cartItems,
        totalPayment,
        userId: profile.id,
        paymentMethod,
        delivery,
        status: purchaseStatus.waitForConfirmation
      }
      const response = await dispatch(createPurchases(newPurchase))
      unwrapResult(response)
      toast.success('Đặt hàng thành công')
      dispatch(cartActions.resetCart())
      dispatch(checkoutActions.resetCheckoutInfo())
      history.push(path.purchase)
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  }

  return (
    <div className="summary">
      <Container maxWidth="lg">
        {cartItems.length && (
          <>
            <div className="summary-address">
              <div className="summary-address__title">
                <LocationOn />
                Địa chỉ nhận hàng
              </div>
              <div className="summary-address__detail">
                <span>{`${delivery.firstName} ${delivery.lastName} ${delivery.phone}`}</span>
                <span>{delivery.address}</span>
                <Link
                  to={path.checkoutDelivery}
                  className="summary-address__link"
                >
                  Thay đổi
                </Link>
              </div>
            </div>
            <div className="summary-header">
              <div className="summary-header__name">Sản phẩm</div>
              <div className="summary-header__unit-price">Đơn giá</div>
              <div className="summary-header__quantity">Số lượng</div>
              <div className="summary-header__total-price">Thành tiền</div>
            </div>
            <div className="summary-list">
              {cartItems.map(item => (
                <div className="summary-item" key={item.id}>
                  <div className="summary-item__info">
                    <Link
                      className="summary-item__image"
                      to={path.products + `/${generateNameId(item)}`}
                    >
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="summary-item__name-wrap">
                      <Link
                        className="summary-item__name"
                        to={path.products + `/${generateNameId(item)}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  <div className="summary-item__unit-price">
                    <span>{formatCurrency(item.price_before_discount)}</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                  <div className="summary-item__quantity">{item.inCart}</div>
                  <div className="summary-item__total-price">
                    <span>{formatCurrency(item.inCart * item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-footer">
              <div className="summary-footer__fee">
                <div className="summary-footer__fee-wrap">
                  <div className="summary-footer__fee-group">
                    <div className="summary-footer__fee-title">
                      Tổng thanh toán:
                    </div>
                    <div className="summary-footer__fee-total-payment">
                      {formatCurrency(totalPayment)}
                    </div>
                  </div>
                  <div className="summary-footer__fee-group">
                    <div className="summary-footer__fee-title">
                      Hình thức thanh toán:
                    </div>
                    <div className="summary-footer__fee-price">
                      {formatCurrency(paymentMethod)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="summary-footer__bottom">
                <div className="summary-footer__policy">
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                  <Link to="" className="summary-footer__policy-link">
                    Điều khoản shopy
                  </Link>
                </div>
                <button
                  className="button summary-footer__checkout"
                  onClick={onCheckoutConfirm}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

export default Summary
