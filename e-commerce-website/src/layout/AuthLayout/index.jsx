import React from 'react'
import AuthHeader from '../AuthHeader'
import Footer from '../Footer'

function AuthLayout({ children, title }) {
  return (
    <div>
      <AuthHeader title={title} />
      {children}
      <Footer />
    </div>
  )
}

export default AuthLayout
