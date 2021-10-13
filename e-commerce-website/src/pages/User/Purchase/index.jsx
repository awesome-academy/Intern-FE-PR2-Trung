import { unwrapResult } from '@reduxjs/toolkit'
import qs from 'query-string'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { path } from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchaseStatus'
import useQuery from 'src/hooks/useQuery'
import { formatCurrency, statusNumberToText } from 'src/utils/helper'
import { getPurchases } from '../user.slice'
import './styles.scss'

function Purchase(props) {
  const dispatch = useDispatch()
  const query = useQuery()
  const status = useMemo(() => query.status, [query])
  const { purchases } = useSelector(state => state.user)
  const { id: userId } = useSelector(state => state.auth.profile)

  useEffect(() => {
    ;(async () => {
      try {
        const params = {
          userId,
          status
        }

        const response = await dispatch(getPurchases({ params }))
        unwrapResult(response)
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }
    })()
  }, [status, userId, dispatch])

  const isActive = value => () => {
    if (value === undefined && status === undefined) {
      return true
    }
    return Number(value) === Number(status)
  }

  return (
    <div className="purchase">
      <div className="purchase__tabs">
        <NavLink
          to={path.purchase}
          className="purchase__tabs-item"
          isActive={isActive(purchaseStatus.all)}
        >
          Tất cả
        </NavLink>
        {Object.values(purchaseStatus).map((statusItem, index) => (
          <NavLink
            to={{
              pathname: path.purchase,
              search: `?${qs.stringify({
                status: statusItem
              })}`
            }}
            className="purchase__tabs-item"
            isActive={isActive(statusItem)}
            key={index}
          >
            {statusNumberToText(statusItem)}
          </NavLink>
        ))}
      </div>

      <ul className="purchase__list">
        {purchases.length ? (
          purchases.map(purchase => (
            <li className="purchase-card" key={purchase.id}>
              <div className="purchase-card__content">
                <div className="purchase-card__header">
                  <div className="purchase-card__purchase-id">
                    Mã đơn hàng: {purchase.id}
                  </div>
                  <div className="purchase-card__status">
                    {statusNumberToText(purchase.status)}
                  </div>
                </div>

                <ul className="purchase-card-cart-list">
                  {purchase.cartItems.map(cartItem => (
                    <li className="purchase-card-cart-item" key={cartItem.id}>
                      <img src={cartItem.image} alt="product" />
                      <div className="purchase-card-cart-item__info">
                        <div className="purchase-card-cart-item__name">
                          {cartItem.name}
                        </div>
                        <div className="purchase-card-cart-item__quantity">
                          x {cartItem.inCart}
                        </div>
                      </div>
                      <div className="purchase-card-cart-item__price-group">
                        <div className="purchase-card-cart-item__price-original">
                          {formatCurrency(cartItem.price_before_discount)}
                        </div>
                        <div className="purchase-card-cart-item__price-sale">
                          {formatCurrency(cartItem.price)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="purchase-card__footer">
                <div className="purchase-card__footer-left">
                  <div className="purchase-card__delivery">
                    <h4 className="purchase-card__delivery-title">
                      Địa chỉ nhận hàng
                    </h4>
                    <div className="purchase-card__delivery-info">
                      Họ và tên:{' '}
                      {`${purchase.delivery.firstName} ${purchase.delivery.lastName}`}
                    </div>
                    <div className="purchase-card__delivery-info">
                      Số điện thoại: {purchase.delivery.phone}
                    </div>
                    <div className="purchase-card__delivery-info">
                      Địa chỉ: {purchase.delivery.address}
                    </div>
                    <div className="purchase-card__delivery-info">
                      Hình thức thanh toán: {purchase.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="purchase-card__footer-right">
                  <div className="purchase-card__payment">
                    <div className="purchase-card__payment-title">
                      Số tiền phải trả:
                    </div>
                    <div className="purchase-card__payment-total">
                      {formatCurrency(purchase.totalPayment)}
                    </div>
                  </div>
                  {purchase.status < 3 && (
                    <div className="purchase-card__actions">
                      <button className="button button--back">
                        Hủy đơn hàng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="purchase__no-purchase">Không tồn tại đơn hàng</p>
        )}
      </ul>
    </div>
  )
}

export default Purchase
