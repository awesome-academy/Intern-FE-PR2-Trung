import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { path } from 'src/constants/path'

function EmptyCartGuard({ children }) {
  const isCartExist = useSelector(state =>
    Boolean(state.cart.cart.cartItems.length)
  )

  if (!isCartExist) {
    return <Redirect to={path.home} />
  }
  return <div>{children}</div>
}

export default EmptyCartGuard
