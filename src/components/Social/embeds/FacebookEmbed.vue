<template>
  <div class="fb-embed">
    <div class="fb-post" :data-href="url" data-width="500"></div>
  </div>
</template>
<script>
export default {
  name: 'FacebookEmbed',
  props: { url: { type: String, required: true } },
  mounted() {
    if (!window.fbAsyncInit) {
      window.fbAsyncInit = function() { FB.XFBML.parse(); };
      const s = document.createElement('script');
      s.src = 'https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v14.0';
      s.async = true;
      document.body.appendChild(s);
    } else if (window.FB) {
      window.FB.XFBML.parse();
    }
  }
}
</script>
<style scoped>
.fb-embed { width: 100%; }
</style>
