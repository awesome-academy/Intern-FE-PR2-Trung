import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Grid } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Pagination from 'src/components/Pagination'
import ProductItem from 'src/components/ProductItem'
import './styles.scss'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { path } from 'src/constants/path'
import qs from 'query-string'
import { useTranslation } from 'react-i18next'

ProductsMainContent.propTypes = {
  filters: PropTypes.object
}

function ProductsMainContent({ filters }) {
  const { loading, products, pagination } = useSelector(state => state.products)
  const { t } = useTranslation()
  const history = useHistory()

  const sortProductsBy = (_sort, order) => {
    const _filters = { ...filters, _sort }
    if (order) {
      _filters._order = order
    } else {
      delete _filters.order
    }
    history.push(path.products + `?${qs.stringify(_filters)}`)
  }

  const isActive = value => (value === filters._sort ? 'active' : '')

  const goToPrev = () => {
    if (pagination._page !== 1) {
      const _filters = { ...filters, _page: pagination._page - 1 }
      history.push(path.products + `?${qs.stringify(_filters)}`)
    }
  }

  const goToNext = () => {
    if (pagination._page !== pagination._pageSize) {
      const _filters = { ...filters, _page: pagination._page + 1 }
      history.push(path.products + `?${qs.stringify(_filters)}`)
    }
  }

  return (
    <div>
      <div className="sort-bar">
        <span className="sort-bar__title">{t('products.sortBy')}</span>
        <div className="sort-options">
          <div
            className={`sort-options__option ${isActive('view')}`}
            onClick={() => sortProductsBy('view', 'desc')}
          >
            {t('products.popular')}
          </div>
          <div
            className={`sort-options__option ${isActive('createdAt')}`}
            onClick={() => sortProductsBy('createdAt', 'desc')}
          >
            {t('products.newest')}
          </div>
          <div
            className={`sort-options__option ${isActive('sold')}`}
            onClick={() => sortProductsBy('sold', 'desc')}
          >
            {t('products.bestSelling')}
          </div>
          <select
            className="sort-options__price"
            onChange={event => sortProductsBy('price', event.target.value)}
          >
            <option value="">{t('products.price')}</option>
            <option value="asc">{t('products.priceAsc')}</option>
            <option value="desc">{t('products.priceDesc')}</option>
          </select>
          <select
            className="sort-options__name"
            onChange={event => sortProductsBy('name', event.target.value)}
          >
            <option value="">{t('products.name')}</option>
            <option value="asc">{t('products.nameAsc')}</option>
            <option value="desc">{t('products.nameDesc')}</option>
          </select>
        </div>
        <div className="mini-page-control">
          <div className="mini-page-control__page">
            <div className="mini-page-control__page-current">
              {pagination._page}
            </div>
            <div className="mini-page-control__page-total">
              /{pagination._pageSize}
            </div>
          </div>
          <button
            className="mini-page-control__prev"
            onClick={goToPrev}
            disabled={pagination._page === 1}
          >
            <KeyboardArrowLeft fontSize="large" />
          </button>
          <button
            className="mini-page-control__next"
            onClick={goToNext}
            disabled={pagination._page === pagination._pageSize}
          >
            <KeyboardArrowRight fontSize="large" />
          </button>
        </div>
      </div>

      {loading ? (
        <p>loading...</p>
      ) : !products?.length ? (
        <p>Nothing here</p>
      ) : (
        <div>
          <div className="product-list">
            <Grid container>
              {products.map(product => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductItem product={product} />
                </Grid>
              ))}
            </Grid>
          </div>
          <Pagination
            pagination={pagination}
            filters={filters}
            goToPrev={goToPrev}
            goToNext={goToNext}
          />
        </div>
      )}
    </div>
  )
}

export default ProductsMainContent
