<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/note'
import NoteEditor from '@/components/NoteEditor.vue'
import NoteItem from '@/components/NoteItem.vue'

const noteStore = useNoteStore()

const noteTextarea = ref(null)

const addNote = (newNote) => {
  noteStore.addNote(newNote)

  // Focus the textarea in the child component
  if (noteTextarea.value) {
    noteTextarea.value.focusTextarea()
  }
}

const deleteNote = (id) => noteStore.deleteNote(id)
</script>

<template>
  <note-editor @save="addNote" ref="noteTextarea" />
  <note-item v-for="note in noteStore.notes" :key="note.id" :note="note" @delete="deleteNote" />
</template>
