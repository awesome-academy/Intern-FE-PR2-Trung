import React from 'react'
import {
  Breadcrumbs as MUIBreadcrumbs,
  Container,
  Link,
  Typography
} from '@material-ui/core'
import { Home, NavigateNext } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import './styles.scss'

const Breadcrumbs = props => {
  const {
    history,
    location: { pathname }
  } = props
  const pathnames = pathname.split('/').filter(x => x)
  return (
    <Container maxWidth="lg">
      <MUIBreadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext fontSize="medium" />}
        className="breadcrumbs"
      >
        {pathnames.length > 0 ? (
          <Link
            className="breadcrumbs__title"
            onClick={() => history.push('/')}
          >
            <Home fontSize="medium" />
            Home
          </Link>
        ) : (
          <Typography className="breadcrumbs__title breadcrumbs__title--active">
            <Home fontSize="medium" />
            Home
          </Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography
              key={name}
              className="breadcrumbs__title breadcrumbs__title--active"
            >
              {name}
            </Typography>
          ) : (
            <Link
              key={name}
              className="breadcrumbs__title"
              onClick={() => history.push(routeTo)}
            >
              {name}
            </Link>
          )
        })}
      </MUIBreadcrumbs>
    </Container>
  )
}

export default withRouter(Breadcrumbs)
