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
    <div class="form-group">
      <label>Image de l'événement (optionnel)</label>
      <div class="image-upload-container">
        <input 
          type="file" 
          ref="fileInput"
          @change="handleImageUpload" 
          accept="image/*" 
          class="file-input"
          id="event-image"
        />
        <label for="event-image" class="file-input-label">
          <i class="pi pi-upload"></i>
          {{ form.imageFile ? form.imageFile.name : 'Choisir une image' }}
        </label>
        <div v-if="form.imagePreview" class="image-preview">
          <img :src="form.imagePreview" alt="Aperçu" class="preview-img" />
          <Button 
            icon="pi pi-times" 
            class="p-button-rounded p-button-danger p-button-sm remove-image-btn"
            @click="removeImage"
            type="button"
          />
        </div>
      </div>
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
  role: '',
  imageFile: null,
  imagePreview: null
});

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    form.value.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.imagePreview = e.target.result;
      console.log('Image preview set:', form.value.imagePreview ? 'OK' : 'FAILED');
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  form.value.imageFile = null;
  form.value.imagePreview = null;
  // Reset the file input
  const fileInput = document.getElementById('event-image');
  if (fileInput) {
    fileInput.value = '';
  }
}

function submitForm() {
  if (!form.value.title || !form.value.description || !form.value.startDate || !form.value.endDate || !form.value.type || (form.value.type === 'private' && !form.value.role)) return;
  const formData = { ...form.value };
  if (formData.imageFile) {
    formData.image = formData.imageFile;
    delete formData.imageFile;
    delete formData.imagePreview;
  }
  emit('submit', formData);
  form.value = { title: '', description: '', startDate: '', endDate: '', type: '', role: '', imageFile: null, imagePreview: null };
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
.image-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  cursor: pointer;
}
.file-input {
  display: none;
}
.file-input-label {
  display: flex;
  align-items: center;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.5em;
  cursor: pointer;
}
.file-input-label i {
  margin-right: 0.5em;
}
.image-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  margin-top: 1em;
}
.preview-img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5em;
}
.remove-image-btn {
  margin-top: 0.5em;
}
</style>
