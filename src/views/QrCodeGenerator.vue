<template>
  <div class="qr-compact-wrapper">
    <canvas ref="canvas" :width="size" :height="size"></canvas>
    <div class="controls">
      <input v-model="url" placeholder="Lien URL à encoder" />
      <label>Couleur du QR: <input type="color" v-model="fgColor" /></label>
      <label>Fond: <input type="color" v-model="bgColor" /></label>
      <label><input type="checkbox" v-model="transparentBg" /> Fond transparent</label>
      <label>Taille(px): <input type="number" min="10" max="1000" v-model.number="size" /></label>
      <button @click="downloadPng" :disabled="!url">Télécharger en PNG</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import QRCode from 'qrcode'

const url = ref('https://')
const size = ref(240)
const canvas = ref(null)
const fgColor = ref('#000000')
const bgColor = ref('#ffffff')
const transparentBg = ref(false)

const renderQr = async () => {
  if (!canvas.value) return
  await QRCode.toCanvas(canvas.value, url.value, {
    width: size.value,
    margin: 0,
    color: {
      dark: fgColor.value,
      light: transparentBg.value ? '#00000000' : bgColor.value,
    }
  })
}

watch([url, size, fgColor, bgColor, transparentBg], renderQr)
onMounted(renderQr)

function downloadPng() {
  if (!canvas.value) {
    alert('QR code non généré !')
    return
  }
  renderQr()
  const link = document.createElement('a')
  link.download = 'qr-code.png'
  link.href = canvas.value.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.qr-compact-wrapper {
  padding: 0;
  margin: 0;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
}
canvas {
  display: block;
  background: transparent;
}
.controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
}
</style>
