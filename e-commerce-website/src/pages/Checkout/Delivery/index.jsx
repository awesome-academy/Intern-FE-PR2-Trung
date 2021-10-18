import {
  Container,
  Grid,
  FormControl,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import React from 'react'
import InputField from 'src/components/InputField'
import LocalStorage from 'src/constants/localStorage'
import { Link, useHistory } from 'react-router-dom'
import { path } from 'src/constants/path'
import { NAME_REGEX, VN_PHONE_NUMBER_REGEX } from 'src/constants/regex'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { checkoutActions } from '../checkout.slice'
import { useTranslation } from 'react-i18next'
import PageTitle from 'src/components/PageTitle'

function Delivery(props) {
  const { firstName, lastName, email, phone, address } = JSON.parse(
    localStorage.getItem(LocalStorage.user)
  )
  const { t } = useTranslation()
  const history = useHistory()
  const dispatch = useDispatch()

  const initialValues = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    phone: phone || '',
    address: address || '',
    paymentMethod: ''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Tên là trường bắt buộc')
      .matches(NAME_REGEX, 'Chỉ được phép nhập bảng chữ cái cho trường này')
      .max(15, 'Vui lòng nhập tối đa 15 kí tự trở xuống'),
    lastName: Yup.string()
      .required('Họ là trường bắt buộc')
      .matches(NAME_REGEX, 'Chỉ được phép nhập bảng chữ cái cho trường này')
      .max(15, 'Vui lòng nhập tối đa 15 kí tự trở xuống'),
    email: Yup.string()
      .required('Email là trường bắt buộc')
      .email('Email này không hợp lệ')
      .min(6, 'Email có độ dài từ 6 - 160 kí tự')
      .max(160, 'Email có độ dài từ 6 - 160 kí tự'),
    phone: Yup.string()
      .required('Số điện thoại là trường bắt buộc')
      .min(10, 'Số điện thoại phải bao gồm 10 số')
      .max(10, 'Số điện thoại phải bao gồm 10 số')
      .matches(VN_PHONE_NUMBER_REGEX, 'Số điện thoại không hợp lệ'),
    address: Yup.string()
      .required('Địa chỉ là trường bắt buộc')
      .min(20, 'Địa chỉ có độ dài từ 20 đến 100 kí tự')
      .max(160, 'Địa chỉ có độ dài từ 20 đến 100 kí tự'),
    paymentMethod: Yup.string()
      .oneOf(
        ['ShopyPay', 'CreditCard', 'COD'],
        'Vui lòng chọn 1 phương thức thanh toán'
      )
      .required('Vui lòng chọn 1 phương thức thanh toán')
  })

  const handleSubmitDeliveryForm = data => {
    try {
      if (data) {
        const purchase = {
          paymentMethod: data.paymentMethod,
          delivery: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address
          }
        }
        dispatch(checkoutActions.setCheckoutInfo(purchase))
        toast.success('Thêm địa chỉ giao hàng thành công')
        history.push(path.checkoutSummary)
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
      toast.error('Có lỗi xảy ra')
    }
  }

  return (
    <div className="delivery">
      <PageTitle title={t('pageTitle.delivery')} />
      <div className="delivery-form">
        <Container maxWidth="lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitDeliveryForm}
          >
            {formik => (
              <Form className="delivery-form__main">
                <Grid container spacing={5} className="delivery-form__wrapper">
                  <Grid item xs={12} md={7}>
                    <div className="delivery-form__title">{t('address')}</div>
                    <InputField
                      name="firstName"
                      type="text"
                      label={t('form.firstName')}
                    />
                    <InputField
                      name="lastName"
                      type="text"
                      label={t('form.lastName')}
                    />
                    <InputField name="email" type="email" label="Email" />
                    <InputField
                      name="phone"
                      type="text"
                      label={t('form.phoneNumber')}
                    />
                    <InputField
                      name="address"
                      type="text"
                      label={t('form.address')}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <div className="delivery-form__title">
                      {t('paymentMethod')}
                    </div>
                    <FormControl component="fieldset">
                      <Field
                        as={RadioGroup}
                        aria-label="paymentMethod"
                        name="paymentMethod"
                      >
                        <FormControlLabel
                          control={<Radio />}
                          value="ShopyPay"
                          label={t('shopyPay')}
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="CreditCard"
                          label={t('creditCard')}
                        />
                        <FormControlLabel
                          control={<Radio />}
                          value="COD"
                          label={t('cashOnDelivery')}
                        />
                      </Field>
                    </FormControl>
                    <FormHelperText>
                      <ErrorMessage
                        component="span"
                        name="paymentMethod"
                        className="error"
                      />
                    </FormHelperText>
                  </Grid>
                </Grid>

                <div className="delivery-form__button-group">
                  <Link
                    to={path.cart}
                    className="button button--back button delivery-form__button"
                  >
                    {t('back')}
                  </Link>
                  <button
                    className="button delivery-form__button"
                    type="submit"
                  >
                    {t('continue')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </div>
  )
}

export default Delivery
