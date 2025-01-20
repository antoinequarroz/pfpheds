<!-- 
src/components/Intranet/sub/IntranetSidebarLeft.vue
-->

<template>
    <div class="intranet-sidebar-left">
      <header>
        <h2>Rôles</h2>
      </header>
  
      <ul class="role-list">
        <li @click="selectRole('infirmier')">Infirmier</li>
        <li @click="selectRole('physio')">Physiothérapeute</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  // Déclaration des événements émis
  const emit = defineEmits(['role-selected']);
  
  // Méthode pour émettre la sélection du rôle
  const selectRole = (role) => {
    emit('role-selected', role);
  };
  </script>
  
  <style scoped>
  .intranet-sidebar-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .intranet-sidebar-left header h2 {
    margin: 0;
    color: #2c3e50;
  }
  
  .role-list {
    list-style: none;
    padding: 0;
  }
  
  .role-list li {
    cursor: pointer;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    color: #2980b9;
  }
  
  .role-list li:hover {
    background-color: #f0f0f0;
  }
  p, h1, h2, span, li, ul {
    color: black;
  }
  </style>
  