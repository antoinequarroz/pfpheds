<template>
      <Navbar />

  <div class="eportfolio-layout">
    <!-- Barre de navigation globale -->

    <!-- Bannière si le site est en mode maintenance -->
    <div v-if="maintenanceMode" class="maintenance-banner">
      <p>The E-Portfolio is currently in maintenance mode.</p>
    </div>

    <!-- Corps de la mise en page : sidebar gauche, contenu, sidebar droite -->
    <div class="content-area">
      <LeftEportfolioSidebar class="left-sidebar" />

      <!-- La zone centrale où se chargent nos pages E-Portfolio -->
      <main class="center-content">
        <router-view />
      </main>

      <RightEportfolioSidebar class="right-sidebar" />
    </div>

    <!-- Pied de page global (optionnel) -->
    <footer class="footer-area">
      <p>© 2025 - E-Portfolio Layout</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Utils/Navbar.vue';
import LeftEportfolioSidebar from './LeftSidebar.vue';
import RightEportfolioSidebar from './RightSidebar.vue';
import { db } from '@/firebase.js'; // ou chemin selon ton arborescence
import { ref as dbRef, onValue } from 'firebase/database';

const maintenanceMode = ref(false);

/** 
 * watchMaintenanceMode :
 * Écoute la DB "eportfolio/settings/maintenance" 
 * pour activer/désactiver la bannière 
 */
function watchMaintenanceMode() {
  const maintenanceRef = dbRef(db, 'eportfolio/settings/maintenance');
  onValue(maintenanceRef, snapshot => {
    maintenanceMode.value = !!snapshot.val();
  });
}

onMounted(() => {
  // Optionnel : on pourrait vérifier si l'utilisateur est loggé, etc.
  watchMaintenanceMode();
});
</script>

<style scoped>
.eportfolio-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.maintenance-banner {
  background-color: #f39c12;
  color: #fff;
  text-align: center;
  padding: 0.5rem;
  font-weight: bold;
}

.content-area {
  /* Triple-colonne : left sidebar, contenu, right sidebar */
  flex: 1;
  display: grid;
  grid-template-columns: 220px 1fr 220px;
  gap: 1rem;
  padding: 1rem;
}

.center-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  color: #000; /* Forcer le texte en noir */
}

.footer-area {
  text-align: center;
  padding: 1rem;
  background-color: #efefef;
  color: #000;
}
</style>
