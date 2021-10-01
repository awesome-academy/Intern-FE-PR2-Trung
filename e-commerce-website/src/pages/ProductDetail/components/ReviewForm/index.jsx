import { unwrapResult } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import TextareaField from 'src/components/TextareaField'
import * as Yup from 'yup'
import { postProductReviews } from '../ProductReviews/productReviews.slice'
import './styles.scss'

function ReviewForm({ productId }) {
  const dispatch = useDispatch()
  const { sendingError } = useSelector(state => state.productReviews)
  const { profile } = useSelector(state => state.auth)
  const [currentRating, setCurrentRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(null)
  const [ratingError, setRatingError] = useState(false)

  const handleClickRating = value => {
    setCurrentRating(value)
    setRatingError(false)
  }

  const handleMouseOverRating = value => {
    setHoverRating(value)
  }

  const handleMouseLeaveRating = () => {
    setHoverRating(null)
  }

  const initialValues = {
    productComment: ''
  }

  const validationSchema = Yup.object().shape({
    productComment: Yup.string()
      .required('Nhận xét là trường bắt buộc')
      .min(6, 'Nhận xét có độ dài từ 6 - 500 kí tự')
      .max(500, 'Nhận xét có độ dài từ 6 - 500 kí tự')
  })

  const onReviewFormSubmit = async ({ productComment }, { resetForm }) => {
    try {
      if (currentRating === 0) {
        setRatingError(true)
      } else {
        const productReviewData = {
          userName: profile.displayName,
          userId: profile.id,
          productId,
          rating: currentRating,
          comment: productComment
        }
        const response = await dispatch(postProductReviews(productReviewData))
        const res = unwrapResult(response)
        if (res.status === 201) {
          toast.success('Đánh giá sản phẩm thành công')
          setCurrentRating(0)
          resetForm({ productComment: '' })
        }
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
      toast.error('Đánh giá sản phẩm thất bại')
    }
  }

  return (
    <div className="review-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onReviewFormSubmit}
      >
        {formik => (
          <Form className="review-form">
            {sendingError && (
              <p className="error">Có lỗi khi gửi đánh giá: {sendingError}</p>
            )}
            <div className="review-form__rating">
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>
                  <FaStar
                    key={index}
                    size={24}
                    style={{ marginLeft: 10, cursor: 'pointer' }}
                    color={
                      (hoverRating || currentRating) > index ? 'orange' : 'grey'
                    }
                    onMouseOver={() => handleMouseOverRating(index + 1)}
                    onMouseLeave={handleMouseLeaveRating}
                    onClick={() => handleClickRating(index + 1)}
                  />
                </span>
              ))}
              {ratingError && (
                <p className="error">Vui lòng đánh giá từ 1 - 5 sao</p>
              )}
            </div>
            <TextareaField
              name="productComment"
              cols="100"
              rows="6"
              placeholder="Hãy chia sẽ những gì bạn thích về sản phẩm này nhé"
              className="review-form__comment"
            />
            <button className="review-form__button button" type="submit">
              Gửi đánh giá
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ReviewForm
