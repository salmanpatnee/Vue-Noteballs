<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['save'])

const props = defineProps({
  body: { type: String }
})

const router = useRouter()

const editMode = computed(() => !!props.body)

const newNote = ref(props.body)

const save = () => {
  emit('save', newNote.value)
  newNote.value = ''
}

const cancel = () => router.push({ name: 'home' })

const noteTextarea = ref(null)
const focusTextarea = () => noteTextarea.value.focus()

const vAutoFocus = {
  mounted: (el) => el.focus()
}

watch(newNote, (newVal) => {
  if (newVal.length === 100) alert('Only 100 characters are allowed.')
})

defineExpose({
  focusTextarea
})
</script>

<template>
  <div class="card p-3 bg-success bg-opacity-100 mb-4">
    <form @submit.prevent="save">
      <div class="mb-3">
        <textarea
          v-model="newNote"
          ref="noteTextarea"
          class="form-control"
          :placeholder="editMode ? 'Update notes' : 'Write notes here.'"
          rows="3"
          v-auto-focus
          maxlength="100"
        ></textarea>
      </div>
      <div class="text-end">
        <button v-if="editMode" @click="cancel" type="button" class="btn btn-light me-3">
          Cancel
        </button>

        <button type="submit" class="btn btn-outline-light" :disabled="!newNote">
          {{ editMode ? 'Update Note' : 'Add New Note' }}
        </button>
      </div>
    </form>
  </div>
</template>
