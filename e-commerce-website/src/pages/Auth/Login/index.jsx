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
import PageTitle from 'src/components/PageTitle'
import { useTranslation } from 'react-i18next'

function Login(props) {
  const { t } = useTranslation()

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email là trường bắt buộc')
      .email('Email này không hợp lệ')
      .min(6, 'Email có độ dài từ 6 - 160 kí tự')
      .max(160, 'Email có độ dài từ 6 - 160 kí tự'),
    password: Yup.string()
      .required('Mật khẩu là trường bắt buộc')
      .min(6, 'Mật khẩu có độ dài từ 6 - 160 kí tự')
      .max(160, 'Mật khẩu có độ dài từ 6 - 160 kí tự')
  })

  const { loginWithEmailAndPassword, error } = useAuth()

  return (
    <div>
      <AuthSection>
        <PageTitle title={t('pageTitle.login')} />
        <div className="auth-form">
          <div className="auth-form__title">{t('pageTitle.login')}</div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={loginWithEmailAndPassword}
          >
            {formik => (
              <Form className="auth-form__main">
                {error && <p className="error">{error}</p>}
                <InputField name="email" type="email" placeholder="Email" />
                <PasswordField
                  name="password"
                  type="password"
                  placeholder={t('password.reEnterPassword')}
                />
                <div className="auth-form__button">
                  <button className="button auth-form__button" type="submit">
                    {t('pageTitle.login')}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="auth-form__footer">
            <span>{t('login.newUser')}</span>
            <Link to={path.register} className="auth-form__link">
              {t('pageTitle.register')}
            </Link>
          </div>
        </div>
      </AuthSection>
    </div>
  )
}

export default Login
