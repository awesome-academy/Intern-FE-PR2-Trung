import { Form, Formik } from 'formik'
import React from 'react'
import PasswordField from 'src/components/PasswordField'
import useAuth from 'src/hooks/useAuth'
import * as Yup from 'yup'
import './styles.scss'

function Password(props) {
  const initialValues = {
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  const { changePassword, error } = useAuth()

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Mật khẩu là trường bắt buộc')
      .min(6, 'Mật khẩu có độ dài từ 6 - 160 kí tự')
      .max(160, 'Mật khẩu có độ dài từ 6 - 160 kí tự'),
    newPassword: Yup.string()
      .required('Mật khẩu là trường bắt buộc')
      .min(6, 'Mật khẩu có độ dài từ 6 - 160 kí tự')
      .max(160, 'Mật khẩu có độ dài từ 6 - 160 kí tự'),
    confirmNewPassword: Yup.string()
      .required('Nhập lại mật khẩu là trường bắt buộc')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Nhập lại mật khẩu không chính xác'
      )
      .min(6, 'Nhập lại mật khẩu có độ dài từ 6 - 160 kí tự')
      .max(160, 'Nhập lại mật khẩu có độ dài từ 6 - 160 kí tự')
  })

  const handleChangePassword = async (data, { resetForm }) => {
    try {
      await changePassword(data)
      resetForm()
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
    }
  }

  return (
    <div className="password">
      <header className="password-header">
        <div className="password-header__title">Đổi Mật Khẩu</div>
        <div className="password-header__subtitle">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </div>
      </header>
      <main className="password-info">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleChangePassword}
        >
          {formik => (
            <Form>
              {error && <p className="error">{error}</p>}
              <div className="password-info__form">
                <PasswordField
                  name="password"
                  type="password"
                  label="Nhập vào mật khẩu"
                />
                <PasswordField
                  name="newPassword"
                  type="password"
                  label="Nhập vào mật khẩu mới"
                />
                <PasswordField
                  name="confirmNewPassword"
                  type="password"
                  label="Nhập lại mật khẩu mới"
                />
                <button
                  className="button password-info__submit-btn"
                  type="submit"
                >
                  Xác Nhận
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default Password
