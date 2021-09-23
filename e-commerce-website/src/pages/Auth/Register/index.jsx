import React from 'react'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import '../AuthSection/styles.scss'
import { Formik, Form } from 'formik'
import InputField from 'src/components/InputField'
import * as Yup from 'yup'
import PasswordField from 'src/components/PasswordField'
import AuthSection from '../AuthSection'

function Register(props) {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
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

  return (
    <AuthSection>
      <div className="auth-form">
        <div className="auth-form__title">Đăng ký</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {formik => (
            <Form className="auth-form__main">
              <InputField name="firstName" type="text" placeholder="Tên" />
              <InputField name="lastName" type="text" placeholder="Họ" />
              <InputField name="email" type="email" placeholder="Email" />
              <PasswordField
                name="password"
                type="password"
                placeholder="Nhập vào mật khẩu"
              />
              <PasswordField
                name="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
              <div className="auth-form__button">
                <button className="button auth-form__button" type="submit">
                  Đăng ký
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="auth-form__footer">
          <span>Bạn đã có tài khoản?</span>
          <Link to={path.login} className="auth-form__link">
            Đăng nhập
          </Link>
        </div>
      </div>
    </AuthSection>
  )
}

export default Register
