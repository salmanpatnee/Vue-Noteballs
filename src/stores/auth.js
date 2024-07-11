import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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

  return { register }
})
