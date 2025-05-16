<template>
  <div class="x-embed">
    <blockquote class="twitter-tweet">
      <a :href="url"></a>
    </blockquote>
  </div>
</template>
<script>
export default {
  name: 'XEmbed',
  props: { url: { type: String, required: true } },
  mounted() {
    if (!window.twttr) {
      const s = document.createElement('script');
      s.src = 'https://platform.twitter.com/widgets.js';
      s.async = true;
      s.onload = () => window.twttr && window.twttr.widgets.load();
      document.body.appendChild(s);
    } else {
      window.twttr.widgets.load();
    }
  }
}
</script>
<style scoped>
.x-embed { width: 100%; }
</style>
