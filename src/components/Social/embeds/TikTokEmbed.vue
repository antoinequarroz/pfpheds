<template>
  <div class="tiktok-embed">
    <blockquote class="tiktok-embed" :cite="url" style="max-width: 605px;min-width: 325px;" >
      <a :href="url">&nbsp;</a>
    </blockquote>
  </div>
</template>
<script>
export default {
  name: 'TikTokEmbed',
  props: { url: { type: String, required: true } },
  mounted() {
    if (!window.tiktokScriptLoaded) {
      const s = document.createElement('script');
      s.src = 'https://www.tiktok.com/embed.js';
      s.async = true;
      s.onload = () => { window.tiktokScriptLoaded = true };
      document.body.appendChild(s);
    }
  }
}
</script>
<style scoped>
.tiktok-embed { width: 100%; }
</style>
