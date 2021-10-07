import React from 'react'
import RatingStars from '../../../../components/RatingStars'
import noReviewImg from 'src/assets/images/no-review.png'
import './styles.scss'
import { timeConverter } from 'src/utils/helper'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

function ProductReviews(props) {
  const { t } = useTranslation()
  const { productReviews, loading, loadingError } = useSelector(
    state => state.productReviews
  )

  return (
    <>
      {!loading && !loadingError && (
        <div className="product-reviews">
          {productReviews?.length ? (
            <ul className="product-reviews__list">
              {productReviews.map(productReview => (
                <li className="product-review" key={productReview.id}>
                  <div className="product-review__wrap">
                    <div className="product-review__user-avatar">
                      <img
                        src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                        alt="user avatar"
                      />
                    </div>
                    <div className="product-review__content">
                      <div className="product-review__username">
                        {productReview.userName}
                      </div>
                      <div className="product-review__rating-stars">
                        <RatingStars rate={productReview.rating} />
                      </div>
                      <p className="product-review__comment">
                        {productReview.comment}
                      </p>
                      <div className="product-review__datetime">
                        {timeConverter(productReview.createdAt)}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="product-reviews__no-review">
              <img src={noReviewImg} alt="no review" />
              <p>{t('productReviews.noReviews')}</p>
            </div>
          )}
        </div>
      )}
      {loading && <p>Đang tải dữ liệu ...</p>}
      {loadingError && <p className="error">Đã xảy ra lỗi: {loadingError}</p>}
    </>
  )
}

export default ProductReviews
