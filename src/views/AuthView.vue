<script setup>
import { ref, computed, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const isRegister = ref(false)

const credentials = reactive({
  email: null,
  password: null
})

const authtext = computed(() => {
  return isRegister.value ? 'Register' : 'Login'
})

const submit = () => {
  if (credentials.email === '' || credentials.password === '') {
    alert('Email and password fields are ewquired.')
    return
  }

  if (isRegister.value) {
    auth.register(credentials)
  } else {
    auth.login(credentials)
  }
}
</script>

<template>
  <div class="card mx-auto" style="width: 700px">
    <div class="card-body">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a
            @click.prevent="isRegister = false"
            class="btn me-2"
            :class="{ 'btn-success': !isRegister }"
            aria-current="page"
            href="#"
            >Login</a
          >
        </li>
        <li class="nav-item">
          <a
            @click.prevent="isRegister = true"
            class="btn"
            :class="{ 'btn-success': isRegister }"
            href="#"
            >Register</a
          >
        </li>
      </ul>
      <div class="mt-4">
        <h3 class="text-center">{{ authtext }}</h3>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <label class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="credentials.email" />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="credentials.password" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-success">{{ authtext }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
