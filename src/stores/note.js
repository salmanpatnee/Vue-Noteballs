import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { onSnapshot, doc, query, orderBy, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { notesCollection } from '@/includes/firebase'

export const useNoteStore = defineStore('note', () => {
  let notes = ref([])

  const note = computed(() => {
    return (id) => notes.value.find((note) => note.id === id)
  })

  const totalNotesCount = computed(() => notes.value.length)

  const totalCharactersCount = computed(() =>
    notes.value.reduce((total, note) => total + note.body.length, 0)
  )

  const fetchNotes = async () => {
    console.log(`Fetching notes`)

    const notesQuery = query(notesCollection, orderBy('date', 'desc'))

    onSnapshot(notesQuery, (querySnapshot) => {
      const fb_notes = []
      querySnapshot.forEach((doc) => {
        const note = { id: doc.id, ...doc.data() }
        fb_notes.push(note)
      })
      notes.value = fb_notes
    })

    // const querySnapshot = await getDocs(notesCollection)
    // querySnapshot.forEach((doc) => {
    //   const note = { id: doc.id, ...doc.data() }
    //   notes.value.push(note)
    // })
  }

  const addNote = async (body) => {
    const currentDate = new Date().getTime()
    const date = currentDate.toString()

    await addDoc(notesCollection, { body, date })

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
    notes,
    note,
    totalNotesCount,
    totalCharactersCount,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote
  }
})
