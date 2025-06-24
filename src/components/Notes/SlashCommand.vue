<template>
  <div class="slash-menu" :style="menuStyle">
    <ul>
      <li v-for="item in items" :key="item.label" @mousedown.prevent="select(item)">
        <span class="label">{{ item.label }}</span>
        <span v-if="item.level" class="level">H{{ item.level }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
const props = defineProps({
  items: Array,
  top: Number,
  left: Number
})
const emit = defineEmits(['select'])

function select(item) {
  emit('select', item)
}

const menuStyle = computed(() => ({
  top: props.top + 'px',
  left: props.left + 'px',
  position: 'absolute',
  zIndex: 99
}))
</script>

<style scoped>
.slash-menu {
  background: #222c;
  border: 1px solid #333;
  border-radius: 7px;
  box-shadow: 0 2px 12px #0008;
  min-width: 180px;
  max-width: 260px;
  padding: 0.2em 0.3em;
  color: #ffd700;
  font-size: 1em;
}
.slash-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.slash-menu li {
  padding: 0.38em 0.8em 0.38em 0.6em;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.13s;
}
.slash-menu li:hover {
  background: #444a;
}
.label {
  font-weight: 500;
}
.level {
  color: #888;
  font-size: 0.92em;
  margin-left: 0.5em;
}
</style>
