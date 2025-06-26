<template>
  <div class="tiptap-simple-editor">
    <div class="toolbar">
      <Button @click="editor.chain().focus().toggleBold().run()" :class="{ active: editor.isActive('bold') }" title="Gras"><b>B</b></Button>
      <Button @click="editor.chain().focus().toggleItalic().run()" :class="{ active: editor.isActive('italic') }" title="Italique"><i>I</i></Button>
      <Button @click="editor.chain().focus().toggleStrike().run()" :class="{ active: editor.isActive('strike') }" title="Barré"><s>S</s></Button>
      <Button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ active: editor.isActive('heading', { level: 1 }) }" title="Titre 1">H1</Button>
      <Button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ active: editor.isActive('heading', { level: 2 }) }" title="Titre 2">H2</Button>
      <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ active: editor.isActive('bulletList') }" title="Liste à puces">• List</button>
      <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ active: editor.isActive('orderedList') }" title="Liste numérotée">1. List</button>
      <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ active: editor.isActive('blockquote') }" title="Citation">❝</button>
      <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ active: editor.isActive('codeBlock') }" title="Bloc code">{ }</button>
      <button @click="editor.chain().focus().undo().run()" title="Annuler">↺</button>
      <button @click="editor.chain().focus().redo().run()" title="Rétablir">↻</button>
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
    content: '<p>Commence à écrire…</p>',
  })
)

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<style scoped>
.tiptap-simple-editor {
  background: var(--surface-card);
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 #0005;
  border: 1.5px solid #23242a;
  /* Prend toute la place attribuée par .editor-col */
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}
.toolbar {
  display: flex;
  gap: 0.5em;
  justify-content: flex-start;
  align-items: center;
  background: var(--surface-c);
  border-radius: 12px;
  box-shadow: 0 2px 16px #0008;
  padding: 0.6em 1.2em;
  margin: 0 auto 1.2em auto;
  width: fit-content;
  position: sticky;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 10;
}
.toolbar button {
  background: none;
  border: none;
  border-radius: 7px;
  padding: 0.35em 0.9em;
  font-size: 1.13em;
  cursor: pointer;
  color: #e0c36d;
  background: transparent;
  transition: background 0.15s, color 0.15s;
  outline: none;
}
.toolbar button.active,
.toolbar button:hover {
  background: #ffd70022;
  color: #ffd700;
}
.tiptap-editor,
.tiptap-editor:focus,
.tiptap-editor [contenteditable]:focus,
.tiptap-editor [contenteditable="true"]:focus,
.tiptap-editor [tabindex]:focus,
.tiptap-editor:focus-visible,
.tiptap-editor [contenteditable="true"]:focus-visible,
.tiptap-editor *:focus,
[contenteditable]:focus,
[contenteditable="true"]:focus,
[contenteditable]:focus-visible {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.tiptap-editor [contenteditable="true"] {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
.tiptap-editor {
  min-height: 0;
  flex: 1 1 auto;
  background: transparent;
  color: #f5f6fa;
  font-size: 1.13em;
  padding: 1.7em 2.2em 1.2em 2.2em;
  border-radius: 10px;
  line-height: 1.7;
  word-break: break-word;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.tiptap-editor h1 {
  font-size: 2.1em;
  font-weight: bold;
  margin: 1.1em 0 0.5em 0;
  color: #fff;
  letter-spacing: -1px;
}
.tiptap-editor h2 {
  font-size: 1.45em;
  font-weight: bold;
  margin: 1.2em 0 0.7em 0;
  color: #ffd700;
}
.tiptap-editor p {
  margin: 0 0 1.2em 0;
}
.tiptap-editor ul,
.tiptap-editor ol {
  margin: 0 0 1.2em 2em;
}
.tiptap-editor li {
  margin-bottom: 0.35em;
}
.tiptap-editor blockquote {
  background: #23242a;
  border-left: 4px solid #ffd700;
  color: #b8b8b8;
  margin: 1.2em 0;
  padding: 0.8em 1.2em;
  border-radius: 8px;
  font-style: italic;
}
.tiptap-editor code {
  background: #23242a;
  color: #ffd700;
  border-radius: 4px;
  padding: 0.18em 0.5em;
  font-size: 0.97em;
}
.tiptap-editor pre {
  background: #18181b;
  color: #ffd700;
  border-radius: 8px;
  padding: 1.1em 1.3em;
  margin: 1.2em 0;
  font-size: 1em;
  overflow-x: auto;
}
.tiptap-editor a {
  color: #87bfff;
  text-decoration: underline;
}
.tiptap-editor strong {
  color: #fff;
}
.tiptap-editor em {
  color: #ffd700;
}
</style>
