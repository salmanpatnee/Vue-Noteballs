<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterView } from 'vue-router'
import Navbar from '@/components/NavBar.vue'

const authStore = useAuthStore()

onMounted(() => {
  console.log('App')
  authStore.init()
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
