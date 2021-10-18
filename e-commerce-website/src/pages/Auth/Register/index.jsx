import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import '../AuthSection/styles.scss'
import { Formik, Form } from 'formik'
import InputField from 'src/components/InputField'
import * as Yup from 'yup'
import PasswordField from 'src/components/PasswordField'
import AuthSection from '../AuthSection'
import useAuth from 'src/hooks/useAuth'
import { VN_PHONE_NUMBER_REGEX } from 'src/constants/regex'
import { useTranslation } from 'react-i18next'
import PageTitle from 'src/components/PageTitle'

function Register(props) {
  const { t } = useTranslation()

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('Tên là trường bắt buộc')
      .matches(/^[aA-zZ\s]+$/, 'Chỉ được phép nhập bảng chữ cái cho trường này')
      .max(15, 'Vui lòng nhập tối đa 15 kí tự trở xuống'),
    lastName: Yup.string()
      .required('Họ là trường bắt buộc')
      .matches(/^[aA-zZ\s]+$/, 'Chỉ được phép nhập bảng chữ cái cho trường này')
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
    password: Yup.string()
      .required('Mật khẩu là trường bắt buộc')
      .min(6, 'Mật khẩu có độ dài từ 6 - 160 kí tự')
      .max(160, 'Mật khẩu có độ dài từ 6 - 160 kí tự'),
    confirmPassword: Yup.string()
      .required('Nhập lại mật khẩu là trường bắt buộc')
      .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không chính xác')
      .min(6, 'Nhập lại mật khẩu có độ dài từ 6 - 160 kí tự')
      .max(160, 'Nhập lại mật khẩu có độ dài từ 6 - 160 kí tự')
  })

  const { registerWithEmailAndPassword, error } = useAuth()

  return (
    <AuthSection>
      <PageTitle title={t('pageTitle.register')} />
      <div className="auth-form">
        <div className="auth-form__title">{t('pageTitle.register')}</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={registerWithEmailAndPassword}
        >
          {formik => (
            <Form className="auth-form__main">
              {error && <p className="error">{error}</p>}
              <InputField
                name="firstName"
                type="text"
                placeholder={t('form.firstName')}
              />
              <InputField
                name="lastName"
                type="text"
                placeholder={t('form.lastName')}
              />
              <InputField name="email" type="email" placeholder="Email" />
              <InputField
                name="phone"
                type="phone"
                placeholder={t('form.phoneNumber')}
              />
              <PasswordField
                name="password"
                type="password"
                placeholder={t('password.enterPassword')}
              />
              <PasswordField
                name="confirmPassword"
                type="password"
                placeholder={t('password.reEnterPassword')}
              />
              <div className="auth-form__button">
                <button className="button auth-form__button" type="submit">
                  {t('pageTitle.register')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="auth-form__footer">
          <span>{t('register.registeredUser')}</span>
          <Link to={path.login} className="auth-form__link">
            {t('pageTitle.login')}
          </Link>
        </div>
      </div>
    </AuthSection>
  )
}

export default Register
