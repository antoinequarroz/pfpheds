<template>
  <div class="add-story-core mobile-style">
    <!-- Header -->

    <!-- Step 1: Choix média -->
    <div v-if="step === 1" class="media-step">
      <div class="media-btn-row">
        <Button class="media-btn camera surface-card" @click="openCamera">
          <i class="pi pi-camera"></i>
          <span>Appareil</span>
        </Button>
        <Button class="media-btn gallery surface-card" @click="triggerGallery">
          <i class="pi pi-image"></i>
          <span>Galerie</span>
        </Button>
        <input ref="fileInput" type="file" accept="image/*" @change="onFileChange" style="display:none" />
      </div>
      <div v-if="previewUrl" class="media-preview">
        <img v-if="isImage" :src="previewUrl" :style="previewStyle" />
        <video v-else :src="previewUrl" controls :style="previewStyle" />
      </div>

    </div>

    <!-- Étape édition -->
    <div v-else-if="step === 3 && isImage" class="edit-step-mobile">
      <div class="story-edit-container">
        <div class="story-image-wrapper">
          <div class="main-img-zoom-container">
            <img :src="previewUrl" class="story-edit-img" :style="{transform: `scale(${mainImgScale})`}" />
          </div>
          <div class="duration-dropdown">
            <select v-model="selectedDuration">
              <option v-for="opt in durationOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>
          <div class="story-edit-actions">
            <Button class="edit-action" @click="overlayInput = 'text'"><i class="pi pi-file-edit"></i></Button>
            <Button class="edit-action" @click="overlayInput = 'image'"><i class="pi pi-plus"></i></Button>
            <Button class="edit-action" @click="overlayInput = 'audio'"><i class="pi pi-volume-up"></i></Button>
            <Button class="edit-action" @click="showZoomControls = !showZoomControls"><i class="pi pi-arrows-alt"></i></Button>
            <Button class="edit-action" @click="overlayInput = 'quiz'"><i class="pi pi-times"></i></Button>
          </div>
          <!-- Contrôles de zoom image principale -->
          <div v-if="showZoomControls" class="zoom-controls">
            <button @click="changeMainImgScale(-0.1)">−</button>
            <input type="range" min="0.5" max="2" step="0.01" v-model.number="mainImgScale" style="width:90px;margin:0 8px;" />
            <button @click="changeMainImgScale(0.1)">+</button>
            <button @click="showZoomControls = false" style="margin-left:8px;font-size:14px;">OK</button>
          </div>
          <!-- Overlays sur l'image -->
          <template v-for="(ov, idx) in overlays">
            <div
              v-if="ov.type === 'text'"
              :key="'text'+idx"
              class="draggable-text"
              :style="{
                position:'absolute',
                left:ov.x+'%',
                top:ov.y+'%',
                color:ov.color,
                fontSize:ov.size+'px',
                fontWeight:'bold',
                textShadow:'0 1px 8px #000a',
                cursor: draggingIdx === idx ? 'grabbing' : 'grab',
                userSelect: 'none',
                zIndex: 10+idx,
              }"
              @mousedown="startDrag(idx, $event)"
              @touchstart.prevent="startDrag(idx, $event)"
            >
              {{ ov.content }}
              <span style="margin-left:8px;cursor:pointer;font-size:14px;" @click.stop="removeOverlay(idx)"><i class="pi pi-trash"></i></span>
              <span style="margin-left:6px;cursor:pointer;font-size:16px;" @click.stop="changeTextSize(idx, 4)">+</span>
              <span style="margin-left:2px;cursor:pointer;font-size:16px;" @click.stop="changeTextSize(idx, -4)">−</span>
            </div>
            <div
              v-else-if="ov.type === 'image'"
              :key="'img'+idx"
              class="draggable-img"
              :style="{
                position:'absolute',
                left:ov.x+'%',
                top:ov.y+'%',
                width:ov.size+'%',
                maxWidth:'70%',
                zIndex: 10+idx,
                cursor: draggingIdx === idx ? 'grabbing' : 'grab',
                userSelect:'none',
              }"
              @mousedown="startDrag(idx, $event)"
              @touchstart.prevent="startDrag(idx, $event)"
            >
              <img :src="ov.url" style="width:100%;display:block;border-radius:8px;box-shadow:0 2px 8px #0006;" />
              <span style="margin-left:8px;cursor:pointer;font-size:14px;position:absolute;top:2px;right:2px;" @click.stop="removeOverlay(idx)"><i class="pi pi-trash"></i></span>
              <span style="margin-left:6px;cursor:pointer;font-size:16px;position:absolute;bottom:2px;right:36px;" @click.stop="changeImgSize(idx, 6)">+</span>
              <span style="margin-left:2px;cursor:pointer;font-size:16px;position:absolute;bottom:2px;right:2px;" @click.stop="changeImgSize(idx, -6)">−</span>
            </div>
            <div
              v-else-if="ov.type === 'audio'"
              :key="'audio'+idx"
              class="draggable-audio"
              :style="{
                position:'absolute',
                left:ov.x+'%',
                top:ov.y+'%',
                zIndex: 10+idx,
                cursor: draggingIdx === idx ? 'grabbing' : 'grab',
                userSelect:'none',
                background:'#11284bcc',
                borderRadius:'12px',
                padding:'6px 12px',
                display:'flex',
                alignItems:'center',
                gap:'8px',
              }"
              @mousedown="startDrag(idx, $event)"
              @touchstart.prevent="startDrag(idx, $event)"
            >
              <i class="pi pi-volume-up" style="font-size:20px;color:#ffc72c;"></i>
              <audio v-if="ov.url" :src="ov.url" controls style="height:24px;max-width:120px;background:transparent;" />
              <span style="margin-left:8px;cursor:pointer;font-size:14px;" @click.stop="removeOverlay(idx)"><i class="pi pi-trash"></i></span>
            </div>
          </template>
          <!-- Formulaire overlay texte -->
          <div v-if="overlayInput === 'text'" class="overlay-form">
            <input v-model="newText" placeholder="Votre texte..." style="width:70%;padding:6px;" />
            <input type="color" v-model="newTextColor" style="margin-left:8px;" />
            <select v-model.number="newTextSize" style="margin-left:8px;">
              <option :value="18">Petit</option>
              <option :value="28">Moyen</option>
              <option :value="38">Grand</option>
            </select>
            <button @click="addTextOverlay" :disabled="!newText" style="margin-left:8px;">OK</button>
            <button @click="overlayInput = null" style="margin-left:4px;">Annuler</button>
          </div>
          <!-- Formulaire overlay image/gif -->
          <div v-if="overlayInput === 'image'" class="overlay-form">
            <input type="file" accept="image/*" @change="onNewImgFile" style="margin-right:8px;" />
            <input v-model="newImgUrl" placeholder="URL image ou GIF..." style="width:40%;padding:6px;" />
            <button @click="addImgOverlay" :disabled="!newImgFile && !newImgUrl" style="margin-left:8px;">OK</button>
            <button @click="overlayInput = null" style="margin-left:4px;">Annuler</button>
          </div>
          <!-- Formulaire overlay audio -->
          <div v-if="overlayInput === 'audio'" class="overlay-form">
            <input type="file" accept="audio/*" @change="onNewAudioFile" style="margin-right:8px;" />
            <input v-model="newAudioUrl" placeholder="URL audio/mp3..." style="width:40%;padding:6px;" />
            <button @click="addAudioOverlay" :disabled="!newAudioFile && !newAudioUrl" style="margin-left:8px;">OK</button>
            <button @click="overlayInput = null" style="margin-left:4px;">Annuler</button>
          </div>
        </div>
        <div class="edit-footer">
          <button class="retour-btn" @click="goToStep1">RETOUR</button>
          <button class="publier-btn" @click="publishStory">PUBLIER</button>
        </div>
      </div>
    </div>

    <!-- Étapes suivantes inchangées -->
    <ImageCropper
      v-if="step === 2 && isImage"
      :src="previewUrl"
      :outputWidth="1080"
      :outputHeight="1920"
      :aspectRatio="9/16"
      @cropped="onCropDone"
      @cancel="goToStep1"
    />
    <div v-else-if="step === 4 && isImage" class="step-container">
      <div class="step-header">4/4 — Prévisualiser</div>
      <template v-if="isImage">
        <img :src="previewUrl" :style="previewStyle" />
      </template>
      <template v-else>
        <video :src="previewUrl" controls :style="previewStyle" />
      </template>
      <textarea v-model="caption" placeholder="Ajouter un texte (optionnel)" maxlength="100" />
      <select v-model="selectedDuration" style="margin:8px 0;max-width:320px;width:90vw;">
        <option v-for="opt in durationOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <div class="step-actions">
        <button class="cancel-btn" @click="step = isImage ? 3 : 1" :disabled="uploading">Retour</button>
        <button class="publish-btn" @click="publishStory" :disabled="uploading">
          <span v-if="!uploading">Publier la story</span>
          <span v-else>Publication...</span>
        </button>
      </div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
    <div v-if="uploading" style="width:90vw;max-width:320px;margin-top:8px;">
      <div style="background:#eee;height:6px;border-radius:4px;overflow:hidden;">
        <div :style="{background:'#F3C300',width:uploadProgress+'%',height:'6px',transition:'width 0.3s'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { db } from '../../../../firebase.js';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import StoryEditor from './StoryEditor.vue';
import ImageCropper from './ImageCropper.vue';

export default {
  name: 'AddStoryCore',
  components: { StoryEditor, ImageCropper },
  emits: ['update:modelValue', 'publish-story', 'uploaded'],
  props: {
    modelValue: String,
    user: Object
  },
  data() {
    return {
      step: 1,
      previewUrl: '',
      file: null,
      caption: '',
      error: '',
      isImage: true,
      uploading: false,
      uploadProgress: 0,
      selectedDuration: 60 * 60 * 1000, // 1h par défaut
      durationOptions: [
        { label: '1 heure', value: 60 * 60 * 1000 },
        { label: '12 heures', value: 12 * 60 * 60 * 1000 },
        { label: '24 heures', value: 24 * 60 * 60 * 1000 },
      ],
      overlays: [], // {type: 'text'|'image'|'audio'|'quiz', content, ...}
      overlayInput: null, // 'text'|'image'|'audio'|'quiz'|'zoom'
      newText: '',
      newTextColor: '#fff',
      newTextSize: 28,
      newTextPos: { x: 50, y: 90 },
      newImgFile: null,
      newImgUrl: '',
      newImgSize: 28,
      newImgPos: { x: 50, y: 50 },
      newAudioFile: null,
      newAudioUrl: '',
      newAudioPos: { x: 50, y: 80 },
      mainImgScale: 1,
      showZoomControls: false,
      draggingIdx: null,
      dragOffset: { x: 0, y: 0 },
      // autres états pour image/audio/quiz...
    };
  },
  computed: {
    previewStyle() {
      return {
        width: '270px',
        height: '480px',
        objectFit: 'cover',
        borderRadius: '14px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.13)'
      };
    }
  },
  methods: {
    async openCamera() {
      try {
        const photo = await Camera.getPhoto({
          quality: 80,
          allowEditing: false,
          resultType: CameraResultType.DataUrl, // base64
          source: CameraSource.Camera,
        });
        if (photo && photo.dataUrl) {
          this.previewUrl = photo.dataUrl;
          this.isImage = true;
          this.step = 3; // Aller directement à l'édition
        }
      } catch (err) {
        if (err && err.message && err.message.includes('User cancelled photos app')) return;
        this.$toast && this.$toast.add({severity:'error', summary:'Erreur caméra', detail: err.message, life: 2500});
      }
    },
    triggerGallery() {
      this.$refs.fileInput.click();
    },
    onDrop(e) {
      this.dragActive = false;
      const files = e.dataTransfer.files;
      if (files && files[0]) this.handleFile(files[0]);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        this.error = "Seules les images sont supportées.";
        return;
      }
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.previewUrl = evt.target.result;
        this.isImage = true;
        this.step = 3; // Aller directement à l'édition
      };
      reader.readAsDataURL(file);
    },
    handleFile(file) {
      if (file.size > 30 * 1024 * 1024) {
        this.error = "Le fichier est trop volumineux (max 30 Mo)";
        return;
      }
      this.file = file;
      this.isImage = file.type.startsWith('image/');
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.previewUrl = evt.target.result;
      };
      reader.readAsDataURL(file);
      this.error = '';
    },
    goToStep1() {
      this.step = 1;
      this.editedBlob = null;
      this.storyElements = [];
      this.previewUrl = '';
      this.file = null;
    },
    goToStep2() {
      if (!this.previewUrl) return;
      if (this.isImage) {
        this.step = 2;
      } else {
        this.step = 2; // Vidéo : pas de crop, mais même étape
      }
    },
    onCropDone(blob) {
      this.editedBlob = blob;
      this.previewUrl = URL.createObjectURL(blob);
      this.step = 3;
    },
    onStoryEdited(blob, elements) {
      this.editedBlob = blob;
      this.storyElements = elements || [];
      this.previewUrl = URL.createObjectURL(blob);
      this.step = 4;
    },
    openEditor(action) {
      this.editorAction = action;
      this.showStoryEditor = true;
    },
    closeEditor() {
      this.showStoryEditor = false;
      this.editorAction = null;
    },
    onStoryElementEdited(blob, elements) {
      // Ajoute l'élément édité à la liste des overlays
      if (elements) {
        this.storyElements = elements;
      }
      if (blob) {
        this.previewUrl = typeof blob === 'string' ? blob : URL.createObjectURL(blob);
      }
      this.closeEditor();
    },
    addTextOverlay() {
      this.overlays.push({
        type: 'text',
        content: this.newText,
        color: this.newTextColor,
        size: this.newTextSize,
        x: this.newTextPos.x,
        y: this.newTextPos.y,
      });
      this.newText = '';
      this.overlayInput = null;
    },
    addImgOverlay() {
      let url = '';
      if (this.newImgFile) {
        url = URL.createObjectURL(this.newImgFile);
      } else if (this.newImgUrl) {
        url = this.newImgUrl;
      }
      if (!url) return;
      this.overlays.push({
        type: 'image',
        url,
        size: this.newImgSize,
        x: this.newImgPos.x,
        y: this.newImgPos.y,
      });
      this.newImgFile = null;
      this.newImgUrl = '';
      this.overlayInput = null;
    },
    addAudioOverlay() {
      let url = '';
      if (this.newAudioFile) {
        url = URL.createObjectURL(this.newAudioFile);
      } else if (this.newAudioUrl) {
        url = this.newAudioUrl;
      }
      if (!url) return;
      this.overlays.push({
        type: 'audio',
        url,
        x: this.newAudioPos.x,
        y: this.newAudioPos.y,
      });
      this.newAudioFile = null;
      this.newAudioUrl = '';
      this.overlayInput = null;
    },
    onNewImgFile(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.newImgFile = file;
    },
    onNewAudioFile(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.newAudioFile = file;
    },
    changeImgSize(idx, delta) {
      const ov = this.overlays[idx];
      let newSize = Math.max(8, Math.min(100, (ov.size||28) + delta));
      this.$set(this.overlays[idx], 'size', newSize);
    },
    removeOverlay(idx) {
      this.overlays.splice(idx, 1);
    },
    startDrag(idx, e) {
      this.draggingIdx = idx;
      const rect = e.target.getBoundingClientRect();
      this.dragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener('mousemove', this.drag);
      document.addEventListener('touchmove', this.drag);
      document.addEventListener('mouseup', this.stopDrag);
      document.addEventListener('touchend', this.stopDrag);
    },
    drag(e) {
      if (!this.draggingIdx) return;
      const ov = this.overlays[this.draggingIdx];
      const x = (e.clientX - this.dragOffset.x) / window.innerWidth * 100;
      const y = (e.clientY - this.dragOffset.y) / window.innerHeight * 100;
      this.$set(this.overlays[this.draggingIdx], 'x', x);
      this.$set(this.overlays[this.draggingIdx], 'y', y);
    },
    stopDrag() {
      this.draggingIdx = null;
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('touchmove', this.drag);
      document.removeEventListener('mouseup', this.stopDrag);
      document.removeEventListener('touchend', this.stopDrag);
    },
    changeTextSize(idx, delta) {
      const ov = this.overlays[idx];
      let newSize = Math.max(8, Math.min(100, (ov.size||28) + delta));
      this.$set(this.overlays[idx], 'size', newSize);
    },
    changeMainImgScale(delta) {
      this.mainImgScale = Math.max(0.5, Math.min(2, +(this.mainImgScale + delta).toFixed(2)));
    },
    async publishStory() {
      if (!this.previewUrl) {
        this.error = "Veuillez sélectionner une image ou une vidéo.";
        return;
      }
      this.uploading = true;
      this.uploadProgress = 0;
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error('Vous devez être connecté pour créer une story.');

        // Préparation de l'image principale (avec overlays fusionnés si besoin)
        // Pour l'instant on envoie juste l'image principale et les overlays séparés
        // (pour fusionner, il faudrait dessiner sur un canvas)
        // On upload l'image principale (base64 ou blob)
        let fileToUpload;
        if (this.file) {
          fileToUpload = this.file;
        } else {
          // Convertir dataURL en blob
          const res = await fetch(this.previewUrl);
          fileToUpload = await res.blob();
        }
        const ext = this.file && this.file.name ? this.file.name.split('.').pop() : 'jpg';
        const fileName = `story_${user.uid}_${Date.now()}.${ext}`;
        const storageReference = storageRef(getStorage(), `stories/${user.uid}/${fileName}`);
        console.log('Uploading file...');
        await uploadBytes(storageReference, fileToUpload).then(() => {
          this.uploadProgress = 100;
        });
        const imageUrl = await getDownloadURL(storageReference);

        // Utiliser une clé unique par utilisateur pour les stories
        const storyRef = push(dbRef(db, 'stories/' + user.uid));
        const storyId = storyRef.key;
        const storyData = {
          id: storyId,
          userId: user.uid,
          userName: user.displayName || '',
          userAvatar: user.photoURL || null,
          imageUrl: imageUrl,
          caption: this.caption,
          timestamp: Date.now(),
          expiresAt: Date.now() + this.selectedDuration,
          overlays: this.overlays,
        };
        console.log('Story data to upload:', storyData);
        await set(storyRef, storyData);
        console.log('Story uploaded!');
        this.$toast && this.$toast.add({severity:'success', summary:'Story publiée', life: 2000});
        this.reset();
      } catch (e) {
        this.error = 'Erreur lors de la publication de la story: ' + e.message;
        console.error(e);
      } finally {
        this.uploading = false;
      }
    },
    reset() {
      this.step = 1;
      this.previewUrl = '';
      this.file = null;
      this.caption = '';
      this.error = '';
      this.isImage = true;
      this.uploading = false;
      this.uploadProgress = 0;
      this.editedBlob = null;
      this.storyElements = [];
      this.dragActive = false;
    },
    goToStep4() {
      this.step = 4;
    }
  }
};
</script>

<style scoped>
.add-story-core.mobile-style {
  background: #0a2240;
  min-height: 100vh;
  color: #fff;
  position: relative;
  padding-bottom: 64px;
}

.media-step {
  margin-top: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.media-btn-row {
  display: flex;
  gap: 28px;
  margin-bottom: 36px;
}
.media-btn {
  width: 140px;
  height: 90px;
  border-radius: 16px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  background: #11284b;
  color: #fff;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 8px #0002;
}
.media-btn.camera {
  color: #f3c300;
}
.media-btn.camera i {
  color: #f3c300;
  font-size: 28px;
  margin-bottom: 8px;
}
.media-btn.camera:hover {
  color: #fff;
}

.media-btn.camera i:hover {
  color: #fff;
}
.media-btn.gallery {
  color: #fff;
}
.media-btn.gallery i {
  color: #fff;
  font-size: 28px;
  margin-bottom: 8px;
}
.media-btn span {
  margin-top: 4px;
  font-size: 17px;
}
.media-preview {
  margin-bottom: 36px;
}
.bottom-btns {}
.step-container {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step-header {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #F3C300;
  letter-spacing: 0.04em;
}
.info {
  color: #555;
  font-size: 0.97rem;
  margin-bottom: 18px;
}
.media-select-ui {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
}
.media-btn {
  background: #fff;
  color: #222;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.05);
  transition: background .15s;
}
.media-btn:active {
  background: #f8f8f8;
}
.drag-zone {
  margin: 12px 0 0 0;
  width: 98%;
  min-height: 60px;
  border: 2px dashed #F3C300;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bfa700;
  font-size: 1rem;
  background: #fffbe6;
  cursor: pointer;
  transition: border .2s;
}
.drag-active {
  border: 2.5px solid #F3C300;
  background: #fff8d6;
}
.media-preview {
  margin: 14px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.media-preview img, .media-preview video {
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.13)
}
textarea {
  width: 90vw;
  max-width: 320px;
  min-height: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 1rem;
  margin: 12px 0;
}
.publish-btn {
  background: #F3C300;
  color: #181e2a;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.05rem;
  padding: 10px 28px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: background 0.2s;
}
.publish-btn:disabled {
  background: #bdbdbd;
  color: #fff;
}
.step-next-btn {
  display: block;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  width: 90vw;
  max-width: 430px;
  margin: 0 auto 8px auto;
  border-radius: 12px;
  font-size: 1.05rem;
  padding: 10px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  background: #F3C300;
  color: #181e2a;
  border: none;
}
.cancel-btn {
  margin-top: 4px;
  background: #eee;
  color: #222;
  border-radius: 8px;
  padding: 6px 18px;
  font-weight: 400;
  font-size: 1.07rem;
}
.error {
  color: #d32f2f;
  margin-top: 8px;
  font-size: 0.98rem;
  text-align: center;
}
.step-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
.canvas-container, .canvas-wrapper {
  max-height: 48vh !important;
}

.edit-step-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
}
.story-edit-container {
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.story-image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: #0a2240;
}
.main-img-zoom-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.story-edit-img {
  width: 100%;
  border-radius: 18px;
  aspect-ratio: 9/16;
  object-fit: cover;
  display: block;
  transition: transform .18s cubic-bezier(.4,1.6,.4,1);
}
.duration-dropdown {
  position: absolute;
  top: 14px;
  right: 14px;
  background: #0a2240;
  border-radius: 8px;
  padding: 2px 8px;
  box-shadow: 0 2px 12px #0002;
}
.duration-dropdown select {
  background: #0a2240;
  color: #fff;
  border: none;
  font-weight: 600;
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 15px;
  outline: none;
}
.story-edit-actions {
  position: absolute;
  bottom: 14px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 6px;
}
.edit-action {
  background: #11284b;
  color: #fff;
  border: none;
  border-radius: 32%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 2px 8px #0002;
}
.edit-footer {
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 8px;
}
.retour-btn {
  background: #11284b;
  color: #fff;
  border-radius: 10px 0 0 10px;
  border: none;
  padding: 7px 22px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  box-shadow: 0 2px 8px #0002;
}
.publier-btn {
  background: #ffc72c;
  color: #fff;
  border-radius: 0 10px 10px 0;
  border: none;
  padding: 7px 22px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  box-shadow: 0 2px 8px #0002;
}

.overlay-form {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: #11284be0;
  border-radius: 12px;
  padding: 12px 16px;
  z-index: 22;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 16px #0004;
}

.draggable-img {
  transition: box-shadow .1s;
  border-radius: 8px;
  background: rgba(10,34,64,0.12);
  box-shadow: 0 2px 8px #0004;
  overflow: visible;
}
.draggable-img:active {
  box-shadow: 0 0 0 2px #ffc72c99;
}
.draggable-audio {
  transition: box-shadow .1s;
  box-shadow: 0 2px 8px #0004;
  overflow: visible;
  min-width: 44px;
  min-height: 32px;
}
.draggable-audio:active {
  box-shadow: 0 0 0 2px #ffc72c99;
}
.zoom-controls {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  background: #11284be0;
  border-radius: 12px;
  padding: 10px 16px;
  z-index: 30;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 16px #0004;
}
.zoom-controls button {
  background: #ffc72c;
  color: #0a2240;
  border: none;
  border-radius: 8px;
  padding: 3px 8px;
  font-size: 18px;
  margin: 0 2px;
  cursor: pointer;
}
.zoom-controls input[type=range] {
  accent-color: #ffc72c;
  vertical-align: middle;
}
</style>
