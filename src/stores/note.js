import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useNoteStore = defineStore('note', () => {
  const notes = ref([
    {
      id: '1',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci quae maiores exercitationem provident dolore eveniet ad iusto iure! Dolore aliquam illo quam veritatis facere nesciunt quasi sunt natus soluta.'
    },
    {
      id: '2',
      body: 'Quis adipisci quae maiores exercitationem provident dolore eveniet ad iusto iure! Dolore aliquam illo quam veritatis facere nesciunt quasi sunt natus soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
    {
      id: '3',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis adipisci quae maiores exercitationem provident dolore eveniet ad iusto iure! Dolore aliquam illo quam veritatis facere nesciunt quasi sunt natus soluta.'
    }
  ])
  const note = computed(() => {
    return (id) => notes.value.find((note) => note.id === id)
  })

  const totalNotesCount = computed(() => notes.value.length)

  const totalCharactersCount = computed(() =>
    notes.value.reduce((total, note) => total + note.body.length, 0)
  )

  const addNote = (body) => {
    const currentDate = new Date().getDate()
    const id = currentDate.toString()

    const note = { id, body }

    notes.value.unshift(note)
  }

  const updateNote = (id, body) => {
    const noteIndex = notes.value.findIndex((note) => note.id === id)
    notes.value[noteIndex].body = body
  }

  const deleteNote = (id) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  return { notes, note, totalNotesCount, totalCharactersCount, addNote, updateNote, deleteNote }
})
