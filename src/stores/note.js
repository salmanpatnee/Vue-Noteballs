import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { notesCollection } from '@/includes/firebase'
import { useAuthStore } from './auth'

export const useNoteStore = defineStore('note', () => {
  let notes = ref([])
  let notesUnsubscribeHandle = null
  let notesQuery
  const note = computed(() => {
    return (id) => notes.value.find((note) => note.id === id)
  })

  const totalNotesCount = computed(() => notes.value.length)

  const totalCharactersCount = computed(() =>
    notes.value.reduce((total, note) => total + note.body.length, 0)
  )

  const init = () => {
    const authStore = useAuthStore()

    notesQuery = query(
      notesCollection,
      where('user_id', '==', authStore.authUser.id),
      orderBy('date', 'desc')
    )

    fetchNotes()
  }

  const fetchNotes = async () => {
    console.log(`Fetching notes`)

    // Set up a real-time listener
    notesUnsubscribeHandle = onSnapshot(
      notesQuery,
      (querySnapshot) => {
        const fbnotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        notes.value = fbnotes
      },
      (error) => {
        console.error('Error listening to notes:', error)
      }
    )
  }

  const clearNotes = () => {
    notes.value = []
    if (notesUnsubscribeHandle) notesUnsubscribeHandle()
  }

  const addNote = async (body) => {
    const authStore = useAuthStore()
    const currentDate = new Date().getTime()
    const date = currentDate.toString()

    await addDoc(notesCollection, { user_id: authStore.authUser.id, body, date })

    // const note = { id, body }
    // notes.value.unshift(note)
  }

  const updateNote = async (id, body) => {
    const noteRef = doc(notesCollection, id)

    await updateDoc(noteRef, { body })

    // const index = notes.value.findIndex((note) => note.id === id)
    // notes.value[index].body = body
  }

  const deleteNote = async (id) => {
    await deleteDoc(doc(notesCollection, id))

    // notes.value = notes.value.filter((note) => note.id !== id)
  }

  return {
    init,
    notes,
    note,
    totalNotesCount,
    totalCharactersCount,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
    clearNotes
  }
})
