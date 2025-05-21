<template>
  <div class="qr-generator">
    <h2>Générateur de QR Code</h2>
    <div class="controls">
      <input v-model="url" placeholder="Lien URL à encoder" />
      <label>Couleur du QR: <input type="color" v-model="fgColor" /></label>
      <label>Fond: <input type="color" v-model="bgColor" /></label>
      <label><input type="checkbox" v-model="transparentBg" /> Fond transparent</label>
      <label>Taille(px): <input type="number" min="100" max="1000" v-model.number="size" /></label>
      <button @click="downloadPng">Télécharger en PNG</button>
    </div>
    <div ref="qrWrapper" class="qr-wrapper">
      <QrcodeVue
        :value="url"
        :size="size"
        :level="'H'"
        :bgColor="'rgba(0,0,0,0)'"
        :fgColor="'#f3c300'"
        :render-as="'svg'"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import QrcodeVue from 'qrcode.vue';

const url = ref('');
const fgColor = ref('#f3c300'); // Jaune (Google Material)
const bgColor = ref('#00000000'); // Transparent
const size = ref(240);
const qrWrapper = ref(null);
const transparentBg = ref(true);

function downloadPng() {
  // Récupère le SVG du QR code
  const svg = qrWrapper.value.querySelector('svg');
  if (!svg) return alert('QR code non généré');
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const img = new window.Image();
  const svg64 = btoa(unescape(encodeURIComponent(svgStr)));
  const image64 = 'data:image/svg+xml;base64,' + svg64;
  img.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.width = size.value;
    canvas.height = size.value;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  img.src = image64;
}
</script>

<style scoped>
.qr-generator {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--surface-card);
  border-radius: 12px;
  box-shadow: 0 2px 8px #0001;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.qr-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: grey;
  padding: 1rem;
  border-radius: 8px;
}
</style>
