<template>
    <div class="contact-list">
      <ContactItem 
        v-for="contact in contacts" 
        :key="contact.id" 
        :contact="contact" 
        @delete="deleteContact" 
        @edit="editContact"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import ContactItem from './ContactItem.vue';
  import type { Contact } from '../types.ts';
  
  const props = defineProps<{ contacts: Contact[] }>();
  const emit = defineEmits(['deleteContact', 'editContact']);
  
  function deleteContact(id: string) {
    emit('deleteContact', id);
  }
  
  function editContact(contact: Contact) {
    emit('editContact', contact);
  }
  </script>
  
  <style scoped>
  .contact-list {
    margin-top: 20px;
  }
  </style>
  