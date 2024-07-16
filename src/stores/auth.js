import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useNoteStore } from './note'
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

  const init = async () => {
    console.log('Auth init')
    await onAuthStateChanged(auth, (user) => {
      const noteStore = useNoteStore()
      if (user) {
        authUser.value = { id: user.uid, email: user.email }
        noteStore.init()
      } else {
        authUser.value = {}
        noteStore.clearNotes()
      }
    })
  }

  const register = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
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
