import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from '@firebase/auth'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import LocalStorage from 'src/constants/localStorage'
import { path } from 'src/constants/path'
import { auth } from 'src/firebase/firebase'
import { fetchUser, register } from 'src/pages/Auth/auth.slice'

const useAuth = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [error, setError] = useState(null)
  const authenticated = useSelector(state => Boolean(state.auth.profile.id))

  const registerWithEmailAndPassword = async data => {
    const { firstName, lastName, email, password } = data

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
          accessToken,
          id: uid,
          displayName,
          photoURL,
          role: 'user',
          firstName,
          lastName,
          email
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
        dispatch(fetchUser(userId))
        setError(null)
        history.push(path.home)
      }
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
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    error: errorMessage
  }
}

export default useAuth
