<template>
  <form class="event-form" @submit.prevent="submitForm">
    <div class="form-group">
      <label>Titre</label>
      <InputText v-model="form.title" required placeholder="Titre de l'événement" class="w-full surface-card" />
    </div>
    <div class="form-group">
      <label>Description</label>
      <Textarea v-model="form.description" required placeholder="Description" class="w-full surface-card" autoResize rows="3" />
    </div>
    <div class="form-group">
      <label>Date et heure de début</label>
      <Calendar v-model="form.startDate" showTime hourFormat="24" dateFormat="dd/mm/yy" class="w-full surface-card" showIcon />
    </div>
    <div class="form-group">
      <label>Date et heure de fin</label>
      <Calendar v-model="form.endDate" showTime hourFormat="24" dateFormat="dd/mm/yy" class="w-full surface-card" showIcon />
    </div>
    <div class="form-group">
      <label>Type d'événement</label>
      <Dropdown v-model="form.type" :options="typeOptions" optionLabel="label" optionValue="value" placeholder="Sélectionner le type" class="w-full surface-card" />
    </div>
    <div class="form-group" v-if="form.type === 'private'">
      <label>Rôle dédié</label>
      <Dropdown v-model="form.role" :options="roleOptions" optionLabel="label" optionValue="value" placeholder="Sélectionner le rôle" class="w-full surface-card" />
    </div>
    <div class="form-actions">
      <Button type="submit" label="Créer" class="p-button-primary w-full mt-2" icon="pi pi-plus-circle" />
      <Button type="button" label="Annuler" class="p-button-text w-full mt-2" icon="pi pi-times" @click="$emit('close')" />
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';

const emit = defineEmits(['submit', 'close']);

const typeOptions = [
  { label: 'Public', value: 'public' },
  { label: 'Privé', value: 'private' }
];
const roleOptions = [
  { label: 'Site Loeche', value: 'siteLoeche' },
  { label: 'BA24', value: 'BA24' },
  { label: 'BA23', value: 'BA23' },
  { label: 'BA22', value: 'BA22' },
  { label: 'Student', value: 'student' },
  { label: 'Manuel', value: 'manuel' }
];

const form = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  type: '',
  role: ''
});

function submitForm() {
  if (!form.value.title || !form.value.description || !form.value.startDate || !form.value.endDate || !form.value.type || (form.value.type === 'private' && !form.value.role)) return;
  emit('submit', { ...form.value });
  form.value = { title: '', description: '', startDate: '', endDate: '', type: '', role: '' };
  emit('close');
}
</script>

<style scoped>
.event-form {
  display: flex;
  flex-direction: column;
  gap: 1.1em;
}
.form-group label {
  display: block;
  margin-bottom: 0.45em;
  font-weight: 600;
  color: #ffc700;
  letter-spacing: 0.01em;
}
.form-group {
  margin-bottom: 0.5em;
}
.form-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-top: 1.2em;
}
</style>
