import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/includes/firebase'

export const useAuthStore = defineStore('auth', () => {
  const register = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in')
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('Logout')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return { register, login, logout }
})
