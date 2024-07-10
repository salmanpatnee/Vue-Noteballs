<script setup>
import { computed } from 'vue'

const props = defineProps({
  note: { type: Object, required: true }
})

const emit = defineEmits(['delete'])

const displayCharactersLength = computed(() => {
  const length = props.note.body.length
  const characterString = length > 1 ? 'characters' : 'character'
  return `${length} ${characterString}`
})
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="card-text">
        {{ note.body }}
      </p>
      <p class="card-text text-end">
        <small class="text-body-secondary">{{ displayCharactersLength }}</small>
      </p>
      <div class="text-end mt-4">
        <router-link
          :to="{ name: 'notes.edit', params: { id: note.id } }"
          class="card-link btn btn-outline-secondary"
          >Edit</router-link
        >
        <a @click.prevent="emit('delete', note.id)" class="card-link btn btn-outline-danger"
          >Delete</a
        >
      </div>
    </div>
  </div>
</template>
