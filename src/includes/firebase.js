import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyByrngBqd-vPRabfFobr9QiHtXD6j8FzaA',
  authDomain: 'vue-noteballs-92596.firebaseapp.com',
  projectId: 'vue-noteballs-92596',
  storageBucket: 'vue-noteballs-92596.appspot.com',
  messagingSenderId: '899984865434',
  appId: '1:899984865434:web:c81a8d3f2462a4fe6ac723'
}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)

const notesCollection = collection(db, 'notes')

export { db, notesCollection }
