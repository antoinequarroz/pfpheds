<template>
  <div class="p-d-flex p-jc-center p-ai-center" style="min-height: 100%;">
    <Card style="width: 100%; max-width: 600px;">
      <template #title>
        <div class="p-d-flex p-jc-between p-ai-center">
          <span style="font-size: 1.5rem">Ajouter une story</span>
          <Button icon="pi pi-times" class="p-button-rounded p-button-text p-button-lg" @click="$emit('close')" />
        </div>
      </template>
      <template #content>
        <!-- Sélection image -->
        <div v-if="step === 'select'" class="p-d-flex p-flex-column p-ai-center p-mb-4">
          <FileUpload mode="basic" name="storyImage" accept="image/*" chooseLabel="Choisir une image" customUpload @uploader="onFileChange" class="p-mb-3" chooseIcon="pi pi-image" style="font-size: 1.2rem;"/>
          <Button label="Prendre une photo avec la webcam" icon="pi pi-camera" class="p-button-text p-button-lg p-mt-2" @click="step = 'webcam'" style="font-size: 1.1rem;"/>
          <small class="p-mt-3 p-text-secondary" style="font-size: 1.1rem;">Prenez une photo ou choisissez une image à publier en story.</small>
        </div>
        <div v-if="step === 'webcam'">
          <WebcamCapture @captured="onWebcamCaptured" @cancel="step = 'select'" />
        </div>
        <div v-if="step === 'crop' && previewUrl">
          <ImageCropper
            :src="previewUrl"
            :aspect="9/16"
            :outputWidth="720"
            :outputHeight="1280"
            @cropped="onCropped"
            @cancel="step = 'select'"
          />
          <small class="p-mt-3 p-text-secondary" style="font-size: 1.1rem;">Recadrez votre image pour la story.</small>
        </div>
        <div v-if="step === 'edit' && previewUrl" class="p-d-flex p-flex-column p-ai-center">
          <StoryEditor
            :src="previewUrl"
            :outputWidth="720"
            :outputHeight="1280"
            style="width: 360px; height: 640px; margin-bottom: 12px;"
            @edited="onEdited"
            @cancel="step = 'crop'"
          />
          <small class="p-mt-3 p-text-secondary" style="font-size: 1.1rem;">Ajoutez du texte, des emojis ou des stickers sur votre image.</small>
        </div>
        <div v-if="step === 'preview' && previewUrl" class="p-d-flex p-flex-column p-ai-center">
          <img :src="previewUrl" alt="Prévisualisation" style="max-width: 360px; border-radius: 18px; box-shadow: 0 4px 16px rgba(33,150,243,0.11); margin-bottom: 18px;" />
          <small class="p-mt-2 p-text-secondary" style="font-size: 1.1rem;">Prévisualisez votre story, ajoutez une légende puis publiez.</small>
          <div class="p-mt-4 p-d-flex p-ai-center p-jc-between" style="width: 100%; max-width: 360px;">
            <span style="font-size: 1.1rem;">Durée de visibilité :</span>
            <Dropdown
              v-model="selectedDuration"
              :options="durationOptions"
              optionLabel="label"
              optionValue="value"
              style="width: 180px; font-size: 1.1rem;"
              inputClass="p-inputtext-lg"
            />
          </div>
          <textarea
            v-model="caption"
            maxlength="100"
            placeholder="Ajouter un texte (optionnel)"
            rows="3"
            class="p-inputtext p-mt-3"
            style="width: 100%; max-width: 360px; font-size: 1.15rem; resize: vertical;"
          />
        </div>
        <div v-if="(step === 'upload' || uploading)" class="p-mt-4">
          <ProgressBar :value="uploadProgress" showValue style="height: 1.5rem; font-size: 1.1rem;"/>
        </div>
        <Message v-if="error" severity="error" class="p-mt-3" style="font-size: 1.1rem;">{{ error }}</Message>
      </template>
      <template #footer>
        <div class="p-d-flex p-jc-end">
          <Button
            label="Publier la story"
            icon="pi pi-upload"
            class="p-button-success p-button-lg"
            style="font-size: 1.15rem; min-width: 180px;"
            :disabled="step !== 'preview' || uploading || !fileSelected"
            @click="submitStory"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import Card from 'primevue/card';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import Dropdown from 'primevue/dropdown';
import ProgressBar from 'primevue/progressbar';
import Message from 'primevue/message';
import { storage, db } from 'root/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import ImageCropper from './ImageCropper.vue';
import StoryEditor from './StoryEditor.vue';
import WebcamCapture from './WebcamCapture.vue';

export default {
  name: 'AddStory',
  components: {
    Card, Button, FileUpload, Dropdown, ProgressBar, Message,
    ImageCropper, StoryEditor, WebcamCapture
  },
  data() {
    return {
      step: 'select',
      uploading: false,
      error: null,
      previewUrl: '',
      fileSelected: null,
      selectedDuration: 24 * 60 * 60 * 1000,
      durationOptions: [
        { label: '1 minute', value: 1 * 60 * 1000 },
        { label: '1 heure', value: 60 * 60 * 1000 },
        { label: '24 heures', value: 24 * 60 * 60 * 1000 },
      ],
      caption: '',
      uploadProgress: 0,
      storyElements: [],
    };
  },
  methods: {
    onWebcamCaptured(blob) {
      this.fileSelected = true;
      this.croppedBlob = blob;
      this.previewUrl = URL.createObjectURL(blob);
      this.step = 'edit';
    },
    onFileChange(event) {
      let file;
      if (event.files && event.files[0]) {
        file = event.files[0];
      } else if (event.target && event.target.files && event.target.files[0]) {
        file = event.target.files[0];
      }
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        this.error = 'Image trop lourde (max 10 Mo)';
        return;
      }
      this.error = null;
      this.fileSelected = file;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.previewUrl = ev.target.result;
        this.step = 'crop';
      };
      reader.readAsDataURL(file);
    },
    onCropped(blob) {
      this.croppedBlob = blob;
      this.previewUrl = URL.createObjectURL(blob);
      this.step = 'edit';
    },
    onEdited(blob, elements) {
      this.editedBlob = blob;
      this.previewUrl = URL.createObjectURL(blob);
      this.storyElements = elements || [];
      this.step = 'preview';
    },
    async submitStory() {
      if (!this.fileSelected) return;
      this.uploading = true;
      this.error = null;
      this.uploadProgress = 0;
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('Vous devez être connecté pour créer une story.');
        const file = this.editedBlob || this.croppedBlob;
        const fileName = `story_${user.uid}_${Date.now()}.jpg`;
        const storageReference = storageRef(storage, `stories/${user.uid}/${fileName}`);
        await uploadBytes(storageReference, file).then(() => {
          this.uploadProgress = 100;
        });
        const imageUrl = await getDownloadURL(storageReference);
        const now = Date.now();
        const storyRef = push(dbRef(db, 'stories'));
        await set(storyRef, {
          userId: user.uid,
          userName: user.displayName || user.email || 'Utilisateur',
          userAvatar: user.photoURL || '',
          imageUrl,
          caption: this.caption,
          timestamp: now,
          expiresAt: now + (this.selectedDuration || 60 * 60 * 1000), // durée choisie
          viewers: [],
          elements: this.storyElements || [], 
        });
        this.$emit('uploaded');
        this.$emit('close');
      } catch (err) {
        this.error = err.message;
      } finally {
        this.uploading = false;
        this.uploadProgress = 0;
        this.previewUrl = '';
        this.fileSelected = null;
        this.croppedBlob = null;
        this.editedBlob = null;
        this.caption = '';
        this.storyElements = [];
        this.step = 'select';
      }
    },
  },
};
</script>

<style scoped>
img {
  max-width: 360px;
  border-radius: 18px;
}
</style>
