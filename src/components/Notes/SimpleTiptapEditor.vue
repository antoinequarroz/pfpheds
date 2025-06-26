<template>
  <div class="simple-tiptap-editor">
    <div class="toolbar">
      <button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }"><b>B</b></button>
      <button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }"><i>I</i></button>
      <button @click="editor.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }"><s>S</s></button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }">• List</button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }">1. List</button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ active: editor.isActive('codeBlock') }">{ }</button>
    </div>
    <EditorContent :editor="editor" class="tiptap-editor" />
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const editor = ref(
  new Editor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Écris ici…</p>',
  })
)

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style scoped>
.simple-tiptap-editor {
  background: var(--surface-card);
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 #0003;
  border: 1.5px solid #282a36;
  padding: 18px 12px 32px 12px;
  max-width: 800px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  gap: 0.5em;
  margin-bottom: 1em;
}
.toolbar button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.3em 0.7em;
  font-size: 1em;
  cursor: pointer;
  color: #ffd700;
  background: #23242a;
  transition: background 0.15s, color 0.15s;
}
.toolbar button.active,
.toolbar button:hover {
  background: #ffd700;
  color: #23242a;
}

.tiptap-editor {
  min-height: 200px;
  outline: none;
  background: transparent;
  color: #f5f6fa;
  font-size: 1.08em;
  padding: 0.7em;
  border-radius: 10px;
}
</style>
