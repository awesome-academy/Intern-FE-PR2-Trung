import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  EmailAuthProvider,
  updatePassword,
  updateProfile,
  signOut
} from '@firebase/auth'
import { unwrapResult } from '@reduxjs/toolkit'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import LocalStorage from 'src/constants/localStorage'
import { path } from 'src/constants/path'
import { auth } from 'src/firebase/firebase'
import { authActions, fetchUser, register } from 'src/pages/Auth/auth.slice'

const useAuth = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState(null)
  const authenticated = useSelector(state => Boolean(state.auth.profile.id))
  const { role: userRole } = useSelector(state => state.auth.profile)

  const registerWithEmailAndPassword = async data => {
    const { firstName, lastName, email, password, phone } = data

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        photoURL:
          'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
      })

      if (response.user) {
        const { accessToken, uid, displayName, photoURL } = response.user
        const newUser = {
          id: uid,
          displayName,
          photoURL,
          role: 'user',
          status: 1,
          firstName,
          lastName,
          email,
          phone
        }

        localStorage.setItem(LocalStorage.accessToken, accessToken)
        dispatch(register(newUser))
        setError(null)
        history.push(path.login)
      }
    } catch (err) {
      setError(err)
    }
  }

  const loginWithEmailAndPassword = async data => {
    const { email, password } = data

    try {
      const response = await signInWithEmailAndPassword(auth, email, password)

      if (response.user) {
        const { accessToken, uid: userId } = response.user

        localStorage.setItem(LocalStorage.accessToken, accessToken)
        setError(null)

        // fetch user data và tự động logout nếu tài khoản bị vô hiệu hóa
        dispatch(fetchUser(userId))
          .then(unwrapResult)
          .then(res => {
            const { status, role } = res.data[0]
            if (status === 0) {
              logout()
              toast.warn(
                'Tài khoản của bạn đã bị vô hiệu hóa, liên hệ Shopy để biết thêm thông tin chi tiết'
              )
            }

            role === 'admin'
              ? history.push(path.admin)
              : history.push(path.home)
          })
      }
    } catch (err) {
      setError(err)
    }
  }

  const reauthenticate = currentPassword => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, currentPassword)

    return reauthenticateWithCredential(user, credential)
  }

  const changePassword = async data => {
    const { password, newPassword } = data

    try {
      const user = auth.currentUser
      await reauthenticate(password)
      await updatePassword(user, newPassword)
      toast.success('Đổi mật khẩu thành công')
    } catch (err) {
      setError(err)
      toast.error('Đã có lỗi xảy ra: ', err)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      dispatch(authActions.logout())
      history.push(path.home)
    } catch (err) {
      setError(err)
    }
  }

  let errorMessage
  switch (error?.code) {
    case 'auth/email-already-in-use':
      errorMessage = 'Email này đã được sử dụng'
      break
    case 'auth/wrong-password':
      errorMessage = 'Sai mật khẩu'
      break
    case 'auth/user-not-found':
      errorMessage = 'Tài khoản này không tồn tại'
      break
    default:
      errorMessage = error?.code
  }

  return {
    authenticated,
    userRole,
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    changePassword,
    logout,
    error: errorMessage
  }
}
export default useAuth
