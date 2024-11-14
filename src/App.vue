<template>
  <div class="app">
    <h1>Управление контактами</h1>
    <SearchBar @search="searchContacts" />
    <ContactForm @addContact="addContact" :editingContact="editingContact" @updateContact="updateContact"/>
    <ContactList :contacts="filteredContacts" @deleteContact="deleteContact" @editContact="editContact"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchBar from './components/SearchBar.vue';
import ContactForm from './components/ContactForm.vue';
import ContactList from './components/ContactList.vue';
import type { Contact } from './types.ts';

const contacts = ref<Contact[]>(JSON.parse(localStorage.getItem('contacts') || '[]'));
const searchQuery = ref('');
const editingContact = ref<Contact | null>(null);

const filteredContacts = computed(() => {
  return contacts.value.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

function addContact(contact: Contact) {
  contacts.value.push(contact);
  saveContacts();
}

function updateContact(updatedContact: Contact) {
  const index = contacts.value.findIndex(contact => contact.id === updatedContact.id);
  if (index !== -1) contacts.value[index] = updatedContact;
  editingContact.value = null;
  saveContacts();
}

function deleteContact(id: string) {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
  saveContacts();
}

function editContact(contact: Contact) {
  editingContact.value = contact;
}

function searchContacts(query: string) {
  searchQuery.value = query;
}

function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts.value));
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
}
</style>