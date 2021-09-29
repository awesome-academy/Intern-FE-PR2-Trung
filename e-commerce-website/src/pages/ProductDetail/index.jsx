import { Container, Grid } from '@material-ui/core'
import { AddShoppingCart, FavoriteBorder } from '@material-ui/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { SiAdguard } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ProductReviews from 'src/pages/ProductDetail/components/ProductReviews'
import ProductSlider from 'src/components/ProductSlider'
import ProductsListSlider from 'src/components/ProductsListSlider'
import QuantityController from 'src/components/QuantityController'
import RatingStars from 'src/components/RatingStars'
import {
  discountPercentage,
  formatCurrency,
  formatQuantity,
  formatRatingNumber,
  getProductIdFromParam
} from 'src/utils/helper'
import ReviewForm from './components/ReviewForm'
import { getProductDetail } from './productDetail.slice'
import './styles.scss'

function ProductDetail(props) {
  const dispatch = useDispatch()
  const { productParamId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const { products } = useSelector(state => state.products)
  const { productDetail, loading, error } = useSelector(
    state => state.productDetail
  )

  useEffect(() => {
    ;(async () => {
      try {
        const productId = getProductIdFromParam(productParamId)

        const productDetailResponse = await dispatch(
          getProductDetail(productId)
        )
        unwrapResult(productDetailResponse)
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    })()
  }, [productParamId, dispatch])

  const handleQuantityChange = value => {
    setQuantity(value)
  }

  return (
    <div className="product-detail">
      {Object.keys(productDetail).length && (
        <Container maxWidth="lg">
          <Grid container className="product-detail__wrap">
            <Grid item xs={12} md={5} className="product-detail__slider">
              <ProductSlider images={productDetail.images} />
            </Grid>
            <Grid item xs={12} md={7} className="product-detail__meta">
              <div className="product-detail__meta-top">
                <h1 className="product-detail__title">{productDetail.name}</h1>
                <div className="product-detail__meta-inner">
                  <div className="product-detail__rating">
                    <span>{formatRatingNumber(productDetail.rating)}</span>
                    <RatingStars rate={productDetail.rating} />
                  </div>
                  <div className="product-detail__sold">
                    <span>{formatQuantity(productDetail.sold)}</span>
                    <span>Đã bán</span>
                  </div>
                </div>
                <div className="product-detail__price">
                  <div className="product-detail__price-original">
                    {formatCurrency(productDetail.price_before_discount)}
                  </div>
                  <div className="product-detail__price-sale">
                    {formatCurrency(productDetail.price)}
                  </div>
                  <div className="product-detail__discount">
                    {discountPercentage(
                      productDetail.price_before_discount,
                      productDetail.price
                    )}{' '}
                    giảm
                  </div>
                </div>
                <div className="buy-qty">
                  <span className="buy-qty__title">Số lượng</span>
                  <div className="buy-qty__control">
                    <QuantityController
                      max={productDetail.quantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div className="buy-qty__stock">
                    {productDetail.quantity} sản phẩm có sẵn
                  </div>
                </div>
                <div className="product-detail__buttons">
                  <button className="button button--lg button--outline">
                    <FavoriteBorder
                      fontSize="large"
                      className="product-detail__button-icon"
                    />
                    Yêu thích
                  </button>
                  <button className="button button--lg">
                    <AddShoppingCart
                      fontSize="large"
                      className="product-detail__button-icon"
                    />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              <div className="product-detail__meta-bottom">
                <Link to="" className="product-detail__protect">
                  <span>
                    <SiAdguard />
                    Shopy đảm bảo
                  </span>
                  <span>3 Ngày Trả Hàng / Hoàn Tiền</span>
                </Link>
              </div>
            </Grid>
          </Grid>
          <div className="product-detail-desc">
            <div className="product-detail-content__wrap">
              <div className="product-detail-content__heading product-detail-desc__heading">
                Mô tả sản phẩm
              </div>
              <div className="product-detail-desc__detail">
                {productDetail.description}
              </div>
            </div>
          </div>
          <div className="product-detail-review">
            <div className="product-detail-content__wrap">
              <div className="product-detail-content__heading">
                Đánh giá sản phẩm
              </div>
              <div className="product-detail-review__content">
                <ProductReviews />
              </div>
              <div className="product-detail-review__form">
                <ReviewForm />
              </div>
            </div>
          </div>
          <div className="watched-products">
            {/* Em dùng tạm data state của product list page để dựng UI sản phẩm đã xem */}
            <ProductsListSlider title={'Sản phẩm đã xem'} products={products} />
          </div>
        </Container>
      )}
      {loading && <p>Đang tải dữ liệu ...</p>}
      {error && <p className="error">Đã có lỗi xảy ra khi lấy dữ liệu</p>}
    </div>
  )
}

export default ProductDetail
