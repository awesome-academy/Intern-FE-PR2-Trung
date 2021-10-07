import { Grid } from '@material-ui/core'
import { unwrapResult } from '@reduxjs/toolkit'
import { Form, Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import InputField from 'src/components/InputField'
import PageTitle from 'src/components/PageTitle'
import { NAME_REGEX, VN_PHONE_NUMBER_REGEX } from 'src/constants/regex'
import { updateUser } from 'src/pages/Auth/auth.slice'
import * as Yup from 'yup'
import './styles.scss'

function Profile(props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { id, firstName, lastName, dob, email, phone, address, photoURL } =
    useSelector(state => state.auth.profile)

  const initialValues = {
    firstName: firstName || '',
    lastName: lastName || '',
    dob: dob || '',
    email: email || '',
    phone: phone || '',
    address: address || '',
    photoURL: ''
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
      .min(20, 'Địa chỉ có độ dài từ 20 đến 100 kí tự')
      .max(160, 'Địa chỉ có độ dài từ 20 đến 100 kí tự'),
    photoURL: Yup.string().url('URL ảnh không hợp lệ')
  })

  const handleUpdateProfile = async data => {
    const { photoURL: avatarUrl, ...updatedData } = data

    if (avatarUrl) {
      updatedData.photoURL = avatarUrl
    }

    try {
      const response = await dispatch(
        updateUser({ userId: id, data: updatedData })
      )
      unwrapResult(response)
      toast.success('Cập nhật hồ sơ thành công')
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      toast.error('Có lỗi xảy ra')
    }
  }

  return (
    <div className="profile">
      <PageTitle title={t('pageTitle.profile')} />
      <header className="profile-header">
        <div className="profile-header__title">{t('profile.myProfile')}</div>
        <div className="profile-header__subtitle">{t('profile.subtite')}</div>
      </header>
      <main className="profile-info">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
        >
          {formik => (
            <Form>
              <Grid container spacing={5}>
                <Grid item xs={8}>
                  <div className="profile-info__left">
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
                    <InputField
                      name="dob"
                      label={t('form.dob')}
                      type="date"
                      InputLabelProps={{
                        shrink: true
                      }}
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

                    <button
                      className="button profile-info__submit-btn"
                      type="submit"
                    >
                      {t('save')}
                    </button>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="profile-info__right">
                    <div className="profile-info__avatar-uploader">
                      <div className="profile-info__user-avatar">
                        <img src={photoURL} alt="user avatar" />
                      </div>
                      <InputField
                        name="photoURL"
                        type="text"
                        label={t('profile.avatarURL')}
                      />
                      <p>{t('profile.avatarURLInput')}</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default Profile
