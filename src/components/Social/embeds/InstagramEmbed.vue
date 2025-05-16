<template>
  <div class="instagram-embed-wrapper">
    <blockquote class="instagram-media" :data-instgrm-permalink="url" data-instgrm-version="14"></blockquote>
  </div>
</template>
<script>
export default {
  name: 'InstagramEmbed',
  props: { url: { type: String, required: true } },
  mounted() {
    if (!window.instgrm) {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.onload = () => window.instgrm.Embeds.process();
      document.body.appendChild(s);
    } else {
      window.instgrm.Embeds.process();
    }
  }
}
</script>
<style scoped>
.instagram-embed-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1.5rem 0;
  background: var(--card);
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
  min-height: 200px;
}

.instagram-media {
  margin: 0 auto !important;
  border-radius: 12px;
  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.08);
  background: #fff;
}
</style>
