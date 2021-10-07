import React from 'react'
import LightHeader from '../LightHeader'
import Footer from '../Footer'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

CartLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

function CartLayout({ children }) {
  const { t } = useTranslation()

  return (
    <div>
      <LightHeader title={t('header.cartHeader')} hasSearch={true} />
      {children}
      <Footer />
    </div>
  )
}

export default CartLayout
