<template>
  <div class="error-page">
    <img :src="errorImage" alt="Error 404">
    <h1>Page Not Found</h1>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data() {
    return {
      errorImage: require('@/assets/images/element/error404-01.svg')
    };
  }
}
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}

.error-page img {
  max-width: 100%;
  height: auto;
}
</style>
