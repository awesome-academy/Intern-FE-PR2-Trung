import { Container, Grid } from '@material-ui/core'
import { AddShoppingCart, FavoriteBorder, Favorite } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { SiAdguard } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
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
  getProductIdFromParam,
  isProductExistInList
} from 'src/utils/helper'
import ReviewForm from './components/ReviewForm'
import { getProductDetail } from './productDetail.slice'
import { wishListActions } from './wishlist.slice'
import useAuth from 'src/hooks/useAuth'
import './styles.scss'
import { getProductReviews } from './components/ProductReviews/productReviews.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import LocalStorage from 'src/constants/localStorage'
import { cartActions } from '../Cart/cart.slice'
import { toast } from 'react-toastify'
import { path } from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import PageTitle from 'src/components/PageTitle'

function ProductDetail(props) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation()
  const { productParamId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const { productDetail, loading, error } = useSelector(
    state => state.productDetail
  )
  const { wishList } = useSelector(state => state.wishList)
  const { authenticated } = useAuth()
  const viewedProductList =
    JSON.parse(localStorage.getItem(LocalStorage.viewedProducts)) || []
  const {
    id,
    image,
    images,
    name,
    description,
    price_before_discount,
    price,
    rating,
    sold,
    place
  } = productDetail

  useEffect(() => {
    ;(async () => {
      try {
        setQuantity(1)
        const productId = getProductIdFromParam(productParamId)

        const productDetailResponse = await dispatch(
          getProductDetail(productId)
        )
        unwrapResult(productDetailResponse)

        const productReviewsResponse = await dispatch(
          getProductReviews(productId)
        )
        unwrapResult(productReviewsResponse)
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }
    })()
  }, [productParamId, dispatch])

  useEffect(() => {
    let newViewedProduct = null
    const viewedProducts =
      JSON.parse(localStorage.getItem(LocalStorage.viewedProducts)) || []

    if (Object.keys(productDetail).length) {
      newViewedProduct = {
        id,
        image,
        name,
        price_before_discount,
        price,
        rating,
        sold,
        place
      }
    }

    if (
      newViewedProduct &&
      !isProductExistInList(newViewedProduct, viewedProducts)
    ) {
      viewedProducts.length > 10 && viewedProducts.pop()
      viewedProducts.unshift(newViewedProduct)
      localStorage.setItem(
        LocalStorage.viewedProducts,
        JSON.stringify(viewedProducts)
      )
    }
    // eslint-disable-next-line
  }, [productDetail])

  const handleQuantityChange = value => {
    setQuantity(value)
  }

  const handleAddToCart = () => {
    if (!authenticated) {
      history.push(path.login)
    } else {
      const product = {
        id,
        image,
        name,
        price_before_discount,
        price,
        quantity: productDetail.quantity
      }

      dispatch(cartActions.addToCart({ product, quantity }))
      toast.success('Th??m v??o gi??? h??ng th??nh c??ng')
    }
  }

  const handleToggleWishList = () => {
    const favouriteProduct = {
      id,
      image,
      name,
      price_before_discount,
      price,
      rating,
      sold,
      place
    }

    dispatch(wishListActions.toggleWishList(favouriteProduct))
  }

  return (
    <div className="product-detail">
      {name && <PageTitle title={name} />}
      {!!Object.keys(productDetail).length && (
        <Container maxWidth="lg">
          <Grid container className="product-detail__wrap">
            <Grid item xs={12} md={5} className="product-detail__slider">
              <ProductSlider images={images} />
            </Grid>
            <Grid item xs={12} md={7} className="product-detail__meta">
              <div className="product-detail__meta-top">
                <h1 className="product-detail__title">{name}</h1>
                <div className="product-detail__meta-inner">
                  <div className="product-detail__rating">
                    <span>{formatRatingNumber(rating)}</span>
                    <RatingStars rate={rating} />
                  </div>
                  <div className="product-detail__sold">
                    <span>{formatQuantity(sold)}</span>
                    <span>{t('productDetail.sold')}</span>
                  </div>
                </div>
                <div className="product-detail__price">
                  <div className="product-detail__price-original">
                    {formatCurrency(price_before_discount)}
                  </div>
                  <div className="product-detail__price-sale">
                    {formatCurrency(price)}
                  </div>
                  <div className="product-detail__discount">
                    {discountPercentage(price_before_discount, price)}{' '}
                    {t('productDetail.off')}
                  </div>
                </div>
                <div className="buy-qty">
                  <span className="buy-qty__title">
                    {t('productDetail.quantity')}
                  </span>
                  <div className="buy-qty__control">
                    <QuantityController
                      max={productDetail.quantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                  </div>
                  <div className="buy-qty__stock">
                    {productDetail.quantity} {t('productDetail.available')}
                  </div>
                </div>
                <div className="product-detail__buttons">
                  <button
                    className="button button--lg button--outline"
                    onClick={handleToggleWishList}
                  >
                    {isProductExistInList(productDetail, wishList) ? (
                      <Favorite
                        fontSize="medium"
                        className="product-detail__button-icon"
                      />
                    ) : (
                      <FavoriteBorder
                        fontSize="medium"
                        className="product-detail__button-icon"
                      />
                    )}
                    {t('productDetail.wishList')}
                  </button>
                  <button
                    className="button button--lg"
                    onClick={handleAddToCart}
                  >
                    <AddShoppingCart
                      fontSize="medium"
                      className="product-detail__button-icon"
                    />
                    {t('productDetail.addToCart')}
                  </button>
                </div>
              </div>
              <div className="product-detail__meta-bottom">
                <Link to="" className="product-detail__protect">
                  <span>
                    <SiAdguard />
                    {t('productDetail.guarantees')}
                  </span>
                  <span>{t('productDetail.refund')}</span>
                </Link>
              </div>
            </Grid>
          </Grid>
          <div className="product-detail-desc">
            <div className="product-detail-content__wrap">
              <div className="product-detail-content__heading product-detail-desc__heading">
                {t('productDetail.description')}
              </div>
              <div className="product-detail-desc__detail">{description}</div>
            </div>
          </div>
          <div className="product-detail-review">
            <div className="product-detail-content__wrap">
              <div className="product-detail-content__heading">
                {t('productDetail.review')}
              </div>
              <div className="product-detail-review__content">
                <ProductReviews />
              </div>
              {authenticated && (
                <div className="product-detail-review__form">
                  <ReviewForm productId={id} />
                </div>
              )}
            </div>
          </div>
          <div className="watched-products">
            <ProductsListSlider
              title={t('productsList.viewed')}
              products={viewedProductList}
            />
          </div>
        </Container>
      )}
      {loading && <p>??ang t???i d??? li???u ...</p>}
      {error && <p className="error">???? c?? l???i x???y ra khi l???y d??? li???u</p>}
    </div>
  )
}

export default ProductDetail
