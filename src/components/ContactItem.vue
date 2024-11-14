<template>
    <div class="contact-item">
      <p>{{ contact.name }} - {{ contact.phone }} - {{ contact.email }}</p>
      <button @click="edit" class="edit-btn">Редактировать</button>
      <button @click="remove" class="delete-btn">Удалить</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import type { Contact } from '../types.ts';
  
  const props = defineProps<{ contact: Contact }>();
  const emit = defineEmits(['delete', 'edit']);
  
  function edit() {
    emit('edit', props.contact);
  }
  
  function remove() {
    emit('delete', props.contact.id);
  }
  </script>
  
  <style scoped>
  .contact-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  button {
    cursor: pointer;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
  }
  
  .edit-btn {
    background-color: #4CAF50;
    color: white;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  </style>
  