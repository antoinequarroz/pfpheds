<!-- 
src/components/Intranet/roles/IntranetPhysio.vue
-->

<template>
    <div class="intranet-physio">
      <h2>Physiothérapeute - Ressources et Liens</h2>
      <p>Accédez rapidement aux outils et informations pertinents pour votre rôle.</p>
  
      <ul class="links-list">
        <li v-for="link in links" :key="link.name">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Props reçues
  const props = defineProps({
    links: {
      type: Array,
      default: () => []
    }
  });
  </script>
  
  <style scoped>
  .intranet-physio .links-list {
    list-style: none;
    padding: 0;
  }
  
  .intranet-physio .links-list li {
    margin-bottom: 0.5rem;
  }
  
  .intranet-physio .links-list a {
    color: #2980b9;
    text-decoration: none;
  }
  
  .intranet-physio .links-list a:hover {
    text-decoration: underline;
  }
  p, h1, h2, span, li, ul {
    color: black;
  }
  </style>
  