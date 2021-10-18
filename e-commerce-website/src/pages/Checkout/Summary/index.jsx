import { Container } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import { cartActions } from 'src/pages/Cart/cart.slice'
import { formatCurrency } from 'src/utils/helper'
import { useHistory } from 'react-router'
import './styles.scss'
import LocalStorage from 'src/constants/localStorage'
import { checkoutActions, createPurchases } from '../checkout.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { purchaseStatus } from 'src/constants/purchaseStatus'
import SummaryCartItems from 'src/components/SummaryCartItems'
import { useTranslation } from 'react-i18next'
import PageTitle from 'src/components/PageTitle'

function Summary(props) {
  const { delivery, paymentMethod } = JSON.parse(
    localStorage.getItem(LocalStorage.purchase)
  )

  const {
    cart: { cartItems, totalPayment }
  } = useSelector(state => state.cart)

  const { t } = useTranslation()
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
      <PageTitle title={t('pageTitle.summary')} />
      <Container maxWidth="lg">
        {cartItems.length && (
          <>
            <div className="summary-address">
              <div className="summary-address__title">
                <LocationOn />
                {t('address')}
              </div>
              <div className="summary-address__detail">
                <span>{`${delivery.firstName} ${delivery.lastName} ${delivery.phone}`}</span>
                <span>{delivery.address}</span>
                <Link
                  to={path.checkoutDelivery}
                  className="summary-address__link"
                >
                  {t('change')}
                </Link>
              </div>
            </div>
            <SummaryCartItems cartItems={cartItems} />
            <div className="summary-footer">
              <div className="summary-footer__fee">
                <div className="summary-footer__fee-wrap">
                  <div className="summary-footer__fee-group">
                    <div className="summary-footer__fee-title">
                      {t('cart.totalPayment')}:
                    </div>
                    <div className="summary-footer__fee-total-payment">
                      {formatCurrency(totalPayment)}
                    </div>
                  </div>
                  <div className="summary-footer__fee-group">
                    <div className="summary-footer__fee-title">
                      {t('paymentMethod')}:
                    </div>
                    <div className="summary-footer__fee-price">
                      {formatCurrency(paymentMethod)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="summary-footer__bottom">
                <div className="summary-footer__policy">
                  {t('summary.policy')}
                  <Link to="" className="summary-footer__policy-link">
                    {t('summary.shopyPolicy')}
                  </Link>
                </div>
                <button
                  className="button summary-footer__checkout"
                  onClick={onCheckoutConfirm}
                >
                  {t('summary.placeOrder')}
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
