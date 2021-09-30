import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import TextareaField from 'src/components/TextareaField'
import * as Yup from 'yup'
import './styles.scss'

function ReviewForm(props) {
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
    productReviewInput: ''
  }

  const validationSchema = Yup.object().shape({
    productReviewInput: Yup.string()
      .required('Nhận xét là trường bắt buộc')
      .min(6, 'Nhận xét có độ dài từ 6 - 500 kí tự')
      .max(500, 'Nhận xét có độ dài từ 6 - 500 kí tự')
  })

  const onReviewFormSubmit = data => {
    if (currentRating === 0) {
      setRatingError(true)
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
              name="productReviewInput"
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
