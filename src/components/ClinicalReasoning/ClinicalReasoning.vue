<!-- ClinicalReasoning.vue -->

<template>
    <div class="clinical-reasoning-container">
      <!-- Intégration de la NavBar -->
      <NavBar />
  
      <!-- Conteneur de l'iframe -->
      <div class="iframe-container">
        <iframe 
          src="https://clinicalreasoningsante.ch/"
          frameborder="0"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  </template>
  
  <script setup>
  import NavBar from '@/components/Utils/NavBar.vue'
  </script>
  
  <style scoped>
  .clinical-reasoning-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 200vh;
  }
  
  /* Ajustez la taille et le positionnement de l'iframe selon vos besoins */
  .iframe-container {
    flex: 1;
    margin-top: 1rem;
    height: calc(100vh - 80px); /* Exemple : si la NavBar prend ~80px */
  }
  
  .iframe-container iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  </style>
  