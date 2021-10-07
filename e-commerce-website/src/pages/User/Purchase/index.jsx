import { unwrapResult } from '@reduxjs/toolkit'
import qs from 'query-string'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { path } from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchaseStatus'
import useQuery from 'src/hooks/useQuery'
import { formatCurrency, statusNumberToText } from 'src/utils/helper'
import { getPurchases, updatePurchases } from '../user.slice'
import ConfirmationModal from 'src/components/ConfirmationModal'
import { useTranslation } from 'react-i18next'
import './styles.scss'
import PageTitle from 'src/components/PageTitle'

function Purchase(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const query = useQuery()
  const status = useMemo(() => query.status, [query])
  const { purchases } = useSelector(state => state.user)
  const { id: userId } = useSelector(state => state.auth.profile)
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false)
  const [currentPurchaseCancel, setCurrentPurchaseCancel] = useState(null)

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

  const handleCancelOrder = async () => {
    const data = { status: purchaseStatus.cancelled }

    try {
      const response = await dispatch(
        updatePurchases({ id: currentPurchaseCancel.id, data })
      )
      unwrapResult(response)
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  }

  const handleConfirmCancelOrder = purchase => {
    setShowRemoveConfirmation(true)
    setCurrentPurchaseCancel(purchase)
  }

  const handleCloseConfirmation = () => setShowRemoveConfirmation(false)

  return (
    <div className="purchase">
      <PageTitle title={t('pageTitle.purchase')} />
      <div className="purchase__tabs">
        <NavLink
          to={path.purchase}
          className="purchase__tabs-item"
          isActive={isActive(purchaseStatus.all)}
        >
          {t('purchase.all')}
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
                    {t('purchase.orderId')}: {purchase.id}
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
                      {t('address')}
                    </h4>
                    <div className="purchase-card__delivery-info">
                      {t('fullName')}:{' '}
                      {`${purchase.delivery.firstName} ${purchase.delivery.lastName}`}
                    </div>
                    <div className="purchase-card__delivery-info">
                      {t('form.phoneNumber')}: {purchase.delivery.phone}
                    </div>
                    <div className="purchase-card__delivery-info">
                      {t('address')}: {purchase.delivery.address}
                    </div>
                    <div className="purchase-card__delivery-info">
                      {t('paymentMethod')}: {purchase.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="purchase-card__footer-right">
                  <div className="purchase-card__payment">
                    <div className="purchase-card__payment-title">
                      {t('purchase.totalPayment')}:
                    </div>
                    <div className="purchase-card__payment-total">
                      {formatCurrency(purchase.totalPayment)}
                    </div>
                  </div>
                  {purchase.status < 3 && (
                    <div className="purchase-card__actions">
                      <button
                        className="button button--back"
                        onClick={() => handleConfirmCancelOrder(purchase)}
                      >
                        {t('purchase.cancelOrder')}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="purchase__no-purchase">{t('purchase.noOrder')}</p>
        )}
      </ul>
      <ConfirmationModal
        title="Xác nhận huỷ đơn hàng"
        content={`Bạn chắc chắn muốn hủy đơn hàng số ${currentPurchaseCancel?.id} chứ?`}
        confirmActions={handleCancelOrder}
        showConfirmation={showRemoveConfirmation}
        handleClose={handleCloseConfirmation}
      />
    </div>
  )
}

export default Purchase
