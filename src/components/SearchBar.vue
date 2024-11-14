<template>
    <input v-model="searchQuery" @input="onInput" placeholder="Поиск контактов..." class="search-bar" />
  </template>
  
  <script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(['search']);
  const searchQuery = ref('');
  
  function onInput() {
    emit('search', searchQuery.value);
  }
  </script>
  
  <style scoped>
  .search-bar {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 10px;
  }
  </style>
  