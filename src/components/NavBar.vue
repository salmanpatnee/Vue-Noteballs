<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const showMobileMenu = ref(false)
const navRef = ref(null)

onClickOutside(navRef, () => {
  showMobileMenu.value = false
})
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-success bg-opacity-75">
    <div class="container">
      <a class="navbar-brand text-white" href="#">Noteballs</a>
      <button
        @click.prevent="showMobileMenu = !showMobileMenu"
        class="navbar-toggler"
        :class="{ collapsed: !showMobileMenu }"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: showMobileMenu }"
        id="navbarSupportedContent"
        ref="navRef"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'home' }"
              class="nav-link text-white"
              active-class="active"
              aria-current="page"
              >Notes</router-link
            >
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'stats' }" class="nav-link text-white" active-class="active"
              >Stats</router-link
            >
          </li>

          <li class="nav-item" v-if="!authStore.isLoggedIn">
            <router-link :to="{ name: 'auth' }" class="nav-link text-white" active-class="active"
              >Login/Register</router-link
            >
          </li>
          <li class="nav-item" v-else>
            <a
              @click.prevent="authStore.logout"
              href="#"
              class="nav-link text-white"
              active-class="active"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
