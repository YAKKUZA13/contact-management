<template>
    <div class="contact-form">
      <input
        v-model="contactData.name"
        placeholder="Имя"
        :class="{'is-invalid': errors.name}"
        required
      />
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
  
      <input
        v-model="contactData.phone"
        placeholder="Телефон"
        :class="{'is-invalid': errors.phone}"
        required
      />
      <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
  
      <input
        v-model="contactData.email"
        placeholder="Email"
        :class="{'is-invalid': errors.email}"
        required
      />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
  
      <button @click="submitForm">{{ isEditing ? 'Обновить' : 'Добавить' }} контакт</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import type { Contact } from '../types.ts';
  
  const props = defineProps<{ editingContact: Contact | null }>();
  const emit = defineEmits(['addContact', 'updateContact']);
  
  const contactData = ref<Contact>({ id: '', name: '', phone: '', email: '' });
  const isEditing = ref(false);
  const errors = ref<{ name?: string, phone?: string, email?: string }>({});
  
  watch(() => props.editingContact, (newVal) => {
    if (newVal) {
      contactData.value = { ...newVal };
      isEditing.value = true;
    } else {
      resetForm();
    }
  });
  

  function resetForm() {
    contactData.value = { id: '', name: '', phone: '', email: '' };
    isEditing.value = false;
    errors.value = {}; 
  }
  
  function validateForm() {
    errors.value = {}; 
  
    if (!contactData.value.name) {
      errors.value.name = 'Имя обязательно';
    }
  
    if (!contactData.value.phone) {
      errors.value.phone = 'Телефон обязателен';
    }
  
    if (!contactData.value.email) {
      errors.value.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(contactData.value.email)) {
      errors.value.email = 'Неверный формат email';
    }
  
    return Object.keys(errors.value).length === 0; 
  }
  
  function submitForm() {
    if (validateForm()) {
      if (isEditing.value) {
        emit('updateContact', contactData.value);
      } else {
        emit('addContact', { ...contactData.value, id: Date.now().toString() });
      }
      resetForm();
    }
  }
  </script>
  
  <style scoped>
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }
  
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  input.is-invalid {
    border-color: red;
  }
  
  button {
    padding: 8px;
    color: white;
    background-color: #2196F3;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1976D2;
  }
  
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  </style>
  