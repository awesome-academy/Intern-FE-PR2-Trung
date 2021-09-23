import React from 'react'
import { Link } from 'react-router-dom'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import './styles.scss'
import PropTypes from 'prop-types'
import { usePagination } from '@material-ui/lab'
import { useHistory } from 'react-router'
import { path } from 'src/constants/path'
import qs from 'query-string'

Pagination.propTypes = {
  pagination: PropTypes.object,
  filters: PropTypes.object,
  goToPrev: PropTypes.func,
  goToNext: PropTypes.func
}

function Pagination({ pagination, filters, goToPrev, goToNext }) {
  const history = useHistory()
  const { items } = usePagination({
    count: pagination._pageSize || 0,
    page: pagination._page || 1
  })

  const goToPage = _page => {
    const _filters = { ...filters, _page }
    history.push(path.products + `?${qs.stringify(_filters)}`)
  }

  return (
    <ul className="pagination">
      <li className="pagination__item" onClick={goToPrev}>
        <Link
          to="#"
          className="pagination__link"
          disabled={pagination._page === 1}
        >
          <KeyboardArrowLeft fontSize="large" />
        </Link>
      </li>
      {items.map(({ page, type, selected }, index) => {
        let item = null
        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          item = (
            <li className="pagination__item" key={index}>
              <Link to="#" className="pagination__link" disabled>
                ...
              </Link>
            </li>
          )
        } else if (type === 'page') {
          item = (
            <li
              className={`pagination__item ${selected ? 'active' : ''}`}
              key={index}
              onClick={() => goToPage(page)}
            >
              <Link to="#" className="pagination__link">
                {page}
              </Link>
            </li>
          )
        }
        return item
      })}
      <li className="pagination__item" onClick={goToNext}>
        <Link
          to="#"
          className="pagination__link"
          disabled={pagination._page === pagination._pageSize}
        >
          <KeyboardArrowRight fontSize="large" />
        </Link>
      </li>
    </ul>
  )
}

export default Pagination
