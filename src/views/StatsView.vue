<script setup>
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
</script>

<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th>Stats</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Total Notes</td>
        <td>{{ noteStore.totalNotesCount }}</td>
      </tr>
      <tr>
        <td>Total characters in all Notes</td>
        <td>{{ noteStore.totalCharactersCount }}</td>
      </tr>
    </tbody>
  </table>
</template>
