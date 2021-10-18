import { Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PageTitle from 'src/components/PageTitle'
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
  const { t } = useTranslation()
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
      <PageTitle title={t('pageTitle.password')} />
      <header className="password-header">
        <div className="password-header__title">
          {t('password.changePassword')}
        </div>
        <div className="password-header__subtitle">
          {t('password.subtitle')}
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
                  label={t('password.enterPassword')}
                />
                <PasswordField
                  name="newPassword"
                  type="password"
                  label={t('password.enterNewPassword')}
                />
                <PasswordField
                  name="confirmNewPassword"
                  type="password"
                  label={t('password.reEnterNewPassword')}
                />
                <button
                  className="button password-info__submit-btn"
                  type="submit"
                >
                  {t('confirm')}
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
