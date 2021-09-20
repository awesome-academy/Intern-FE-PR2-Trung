import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import Pagination from 'src/components/Pagination'
import ProductItem from 'src/components/ProductItem'
import './styles.scss'

function ProductsMainContent(props) {
  const { loading, products, pagination } = useSelector(state => state.products)

  return (
    <div>
      <div className="sort-bar">
        <span className="sort-bar__title">Sắp xếp theo</span>
        <div className="sort-options">
          <div className="sort-options__option active">Phổ biến</div>
          <div className="sort-options__option">Mới nhất</div>
          <div className="sort-options__option">Bán chạy</div>
          <select className="sort-options__price">
            <option value="">Giá</option>
            <option value="asc">Giá: Thấp đến cao</option>
            <option value="desc">Giá: Cao đến thấp</option>
          </select>
          <select className="sort-options__name">
            <option value="">Tên</option>
            <option value="asc">Tên: Từ A đến Z</option>
            <option value="desc">Tên: Từ Z đến A</option>
          </select>
        </div>
        <div className="mini-page-control">
          <div className="mini-page-control__page">
            <div className="mini-page-control__page-current">1</div>
            <div className="mini-page-control__page-total">
              /{Math.ceil(pagination._totalProducts / pagination._limit)}
            </div>
          </div>
          <button className="mini-page-control__prev" disabled>
            <KeyboardArrowLeft fontSize="large" />
          </button>
          <button className="mini-page-control__next">
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
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  )
}

export default ProductsMainContent
