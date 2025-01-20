<!-- 
src/components/Intranet/sub/IntranetSidebarRight.vue
-->

<template>
    <div class="intranet-sidebar-right">
      <header>
        <h2>Informations</h2>
      </header>
  
      <section v-if="currentRole === 'infirmier'">
        <h3>Infirmier</h3>
        <p>Accès rapide aux ressources et outils spécifiques aux infirmiers.</p>
        <!-- Ajoutez plus de contenu spécifique si nécessaire -->
      </section>
  
      <section v-else-if="currentRole === 'physio'">
        <h3>Physiothérapeute</h3>
        <p>Accès rapide aux ressources et outils spécifiques aux physiothérapeutes.</p>
        <!-- Ajoutez plus de contenu spécifique si nécessaire -->
      </section>
  
      <section v-else>
        <p>Sélectionnez un rôle pour voir les informations correspondantes.</p>
      </section>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Props reçues
  const props = defineProps({
    currentRole: {
      type: String,
      default: null
    }
  });
  </script>
  
  <style scoped>
  .intranet-sidebar-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .intranet-sidebar-right header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .intranet-sidebar-right section h3 {
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .intranet-sidebar-right section p {
    margin: 0;
  }
  p, h1, h2, span, li, ul {
    color: black;
  }
  </style>
  