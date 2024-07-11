<script setup>
import { onMounted } from 'vue'
import { useNoteStore } from '@/stores/note'
import { RouterView } from 'vue-router'
import Navbar from '@/components/NavBar.vue'

const noteStore = useNoteStore()

onMounted(() => {
  noteStore.fetchNotes()
})
</script>

<template>
  <Navbar />
  <div class="bg-success py-4 text-dark bg-opacity-25 h-100">
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>
