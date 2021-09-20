import React from 'react'
import { Link } from 'react-router-dom'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import './styles.scss'

function Pagination(props) {
  return (
    <ul className="pagination">
      <li className="pagination__item">
        <Link to="#" className="pagination__link disabled">
          <KeyboardArrowLeft fontSize="large" />
        </Link>
      </li>
      <li className="pagination__item  active">
        <Link to="#" className="pagination__link">
          1
        </Link>
      </li>
      <li className="pagination__item">
        <Link to="#" className="pagination__link">
          2
        </Link>
      </li>
      <li className="pagination__item">
        <Link to="#" className="pagination__link">
          3
        </Link>
      </li>
      <li className="pagination__item">
        <Link to="#" className="pagination__link disabled">
          ...
        </Link>
      </li>
      <li className="pagination__item">
        <Link to="#" className="pagination__link">
          <KeyboardArrowRight fontSize="large" />
        </Link>
      </li>
    </ul>
  )
}

export default Pagination
