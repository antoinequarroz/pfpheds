<template>
  <Panel header="Éditeur de note" class="note-editor">
    <div class="p-fluid">
      <InputText v-model="title" placeholder="Titre de la feuille" class="note-title p-mb-3" />
      <div class="note-dates">
        <span v-if="page?.createdAt">Créée : {{ formatDate(page.createdAt) }}</span>
        <span v-if="page?.updatedAt">Dernière modif : {{ formatDate(page.updatedAt) }}</span>
      </div>
      <div class="tiptap-toolbar">
        <Button icon="pi pi-bold" class="p-button-text" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" />
        <Button icon="pi pi-italic" class="p-button-text" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" />
        <Button icon="pi pi-underline" class="p-button-text" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" />
        <Button icon="pi pi-list-ul" class="p-button-text" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" />
        <Button icon="pi pi-list-ol" class="p-button-text" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" />
        <Button icon="pi pi-check-square" class="p-button-text" @click="editor.chain().focus().toggleTaskList().run()" :class="{ 'is-active': editor.isActive('taskList') }" />
        <Button icon="pi pi-quote-left" class="p-button-text" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" />
        <Button icon="pi pi-table" class="p-button-text" @click="addTable" />
        <Button icon="pi pi-code" class="p-button-text" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }" />
        <Button icon="pi pi-link" class="p-button-text" @click="setLink" />
        <Button icon="pi pi-image" class="p-button-text" @click="addImage" />
        <Button icon="pi pi-eraser" class="p-button-text" @click="editor.chain().focus().clearNodes().unsetAllMarks().run()" />
      </div>
      <EditorContent :editor="editor" class="tiptap-editor" />
      <Button label="Sauvegarder" icon="pi pi-save" @click="save" class="p-mt-3" />
    </div>
  </Panel>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, computed, onMounted, onBeforeUnmount } from 'vue'
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const props = defineProps({
  page: Object
})
const emit = defineEmits(['save'])
const title = ref(props.page?.title || '')
const editor = ref(null)

// Init Tiptap
onMounted(() => {
  editor.value = new Editor({
    content: props.page?.content ? JSON.parse(props.page.content) : '',
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TaskList,
      TaskItem,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    autofocus: false,
    editable: true,
    onUpdate: () => {},
  })
})
onBeforeUnmount(() => {
  if (editor.value) editor.value.destroy()
})

watch(() => props.page, (newPage) => {
  title.value = newPage?.title || ''
  if (editor.value) {
    editor.value.commands.setContent(newPage?.content ? JSON.parse(newPage.content) : '')
  }
})

function save() {
  emit('save', {
    title: title.value,
    content: JSON.stringify(editor.value.getJSON())
  })
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}

function addTable() {
  editor.value.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
}
function setLink() {
  const url = prompt('URL du lien :')
  if (url) editor.value.chain().focus().setLink({ href: url }).run()
}
function addImage() {
  const url = prompt('URL de l\'image :')
  if (url) editor.value.chain().focus().setImage({ src: url }).run()
}
</script>

<style scoped>
.note-editor {
  flex: 1;
  height: 100vh;
  background: var(--surface-c);
}
.note-title {
  font-size: 1.2rem;
  width: 100%;
}
.note-dates {
  display: flex;
  gap: 1.5em;
  color: #888;
  font-size: 0.9em;
  margin-bottom: 0.5em;
}
.tiptap-toolbar {
  display: flex;
  gap: 0.25em;
  margin-bottom: 0.5em;
  flex-wrap: wrap;
}
.tiptap-editor {
  min-height: 300px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 1em;
  font-family: inherit;
  font-size: 1.05em;
  margin-bottom: 1.5em;
}
.is-active {
  background: #e3f2fd;
}
</style>
