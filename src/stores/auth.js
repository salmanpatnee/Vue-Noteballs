import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { auth } from '@/includes/firebase'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  let authUser = ref({})
  const router = useRouter()

  const init = () => {
    console.log('Init')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = { id: user.uid, email: user.email }
      } else {
        authUser.value = {}
      }
    })
  }

  const register = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        router.push({ name: 'home' })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in', userCredential)
        router.push({ name: 'home' })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('Logout')
        router.push({ name: 'auth' })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const isLoggedIn = computed(() => !!authUser.value.id)
  return { authUser, init, isLoggedIn, register, login, logout }
})
