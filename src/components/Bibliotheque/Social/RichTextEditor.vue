<template>
  <div class="rich-editor-wrapper">
    <div class="editor-banner">NOUVEL ÉDITEUR ACTIVÉ 🎉</div>
    <quill-editor
      v-model="content"
      :options="editorOptions"
      class="rich-quill"
      @text-change="onInput"
    />
    <div class="toolbar-bottom-fixed">
      <button class="emoji-btn-big" @click="toggleEmojiPicker" type="button">😊 Ajouter un emoji</button>
      <div v-if="showEmojiPicker" class="emoji-picker-popup">
        <span v-for="emoji in emojis" :key="emoji" class="emoji" @click="addEmoji(emoji)">{{ emoji }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from 'vue3-quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'RichTextEditor',
  components: { QuillEditor },
  props: {
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      content: this.modelValue,
      showEmojiPicker: false,
      emojis: ['😀','😁','😂','😅','😍','😎','😭','😡','👍','🙏','🎉','🔥','❤️','😇','😜','🤔','😏','😱','😴','😋'],
      editorOptions: {
        theme: 'snow',
        placeholder: 'Écris ton message... (tu peux ajouter des images, vidéos, liens, emojis)',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        },
      },
    };
  },
  watch: {
    modelValue(val) {
      if (val !== this.content) this.content = val;
    },
    content(val) {
      this.$emit('update:modelValue', val);
    },
  },
  methods: {
    onInput() {
      this.$emit('update:modelValue', this.content);
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    addEmoji(emoji) {
      const quill = this.$refs.editor?.getQuill ? this.$refs.editor.getQuill() : this.$el.querySelector('.ql-editor');
      if (quill && quill.insertText) {
        quill.insertText(quill.getSelection()?.index || quill.getLength(), emoji);
      } else {
        // fallback: append emoji at the end
        this.content += emoji;
      }
      this.showEmojiPicker = false;
    },
  },
};
</script>

<style scoped>
.rich-editor-wrapper {
  position: relative;
}
.editor-banner {
  background: #ffe066;
  color: #1a1a1a;
  text-align: center;
  font-weight: bold;
  padding: 7px 0 5px 0;
  border-radius: 10px 10px 0 0;
  font-size: 1.15em;
  margin-bottom: 5px;
  letter-spacing: 1px;
}
.rich-quill {
  min-height: 150px;
}
.toolbar-bottom-fixed {
  display: flex;
  align-items: center;
  margin-top: 10px;
  position: relative;
  justify-content: flex-start;
}
.emoji-btn-big {
  background: #ffe066;
  border: 2px solid #f7ca18;
  font-size: 1.2em;
  font-weight: bold;
  color: #1a1a1a;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s, color 0.2s;
}
.emoji-btn-big:hover {
  background: #fffbe6;
  color: #e67e22;
}
.emoji-picker-popup {
  position: absolute;
  top: 48px;
  left: 0;
  background: #fff;
  border: 1.5px solid #ffd700;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  padding: 10px 12px 6px 12px;
  z-index: 100;
  display: flex;
  flex-wrap: wrap;
  max-width: 260px;
}
.emoji {
  cursor: pointer;
  font-size: 1.7em;
  margin: 3px 5px;
  transition: transform 0.1s;
}
.emoji:hover {
  transform: scale(1.25);
}
</style>
