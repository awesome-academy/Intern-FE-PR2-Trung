import React from 'react'
import { FaShoppingCart, FaUserAlt, FaCheck } from 'react-icons/fa'
import { Container } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import './styles.scss'

function CheckoutProgressBar({ step }) {
  const { t } = useTranslation()
  const progresses = [
    {
      step: 'cart',
      title: t('progressBar.cart'),
      icon: <FaShoppingCart />
    },
    {
      step: 'delivery',
      title: t('progressBar.delivery'),
      icon: <FaUserAlt />
    },
    { step: 'summary', title: t('progressBar.payment'), icon: <FaCheck /> }
  ]

  return (
    <div className="progress-bar">
      <Container maxWidth="lg">
        <div className="progress-bar__wrap">
          {progresses.map((progress, index) => (
            <div
              className={`progress-step ${
                step === progress.step ? 'active' : ''
              }`}
              key={index}
            >
              <div className="step-count">{progress.icon}</div>
              <div className="step-description">{progress.title}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default CheckoutProgressBar
