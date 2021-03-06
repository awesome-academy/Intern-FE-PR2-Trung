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

        // fetch user data v?? t??? ?????ng logout n???u t??i kho???n b??? v?? hi???u h??a
        dispatch(fetchUser(userId))
          .then(unwrapResult)
          .then(res => {
            const { status, role } = res.data[0]
            if (status === 0) {
              logout()
              toast.warn(
                'T??i kho???n c???a b???n ???? b??? v?? hi???u h??a, li??n h??? Shopy ????? bi???t th??m th??ng tin chi ti???t'
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
      toast.success('?????i m???t kh???u th??nh c??ng')
    } catch (err) {
      setError(err)
      toast.error('???? c?? l???i x???y ra: ', err)
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
      errorMessage = 'Email n??y ???? ???????c s??? d???ng'
      break
    case 'auth/wrong-password':
      errorMessage = 'Sai m???t kh???u'
      break
    case 'auth/user-not-found':
      errorMessage = 'T??i kho???n n??y kh??ng t???n t???i'
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
