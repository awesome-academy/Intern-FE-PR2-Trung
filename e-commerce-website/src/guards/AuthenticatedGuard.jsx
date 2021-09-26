import React from 'react'
import PropTypes from 'prop-types'
import useAuth from 'src/hooks/useAuth'
import { Redirect } from 'react-router'
import { path } from 'src/constants/path'

AuthenticatedGuard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

function AuthenticatedGuard({ children }) {
  const { authenticated } = useAuth()
  if (!authenticated) {
    return <Redirect to={path.login} />
  }
  return <>{children}</>
}

export default AuthenticatedGuard
