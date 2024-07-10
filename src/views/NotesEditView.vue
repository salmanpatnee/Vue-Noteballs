<script setup>
import { ref } from 'vue'
import { useNoteStore } from '@/stores/note'
import { useRouter } from 'vue-router'
import NoteEditor from '@/components/NoteEditor.vue'

const noteStore = useNoteStore()
const router = useRouter()

const props = defineProps({
  id: { type: String, required: true }
})

const note = ref(noteStore.note(props.id))

const updateNote = (body) => {
  noteStore.updateNote(props.id, body)
  router.push({ name: 'home' })
}
</script>

<template>
  <note-editor :body="note.body" @save="updateNote" ref="noteTextarea" />
</template>
