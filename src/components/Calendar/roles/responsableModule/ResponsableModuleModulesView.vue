<template>
    <div>
      <h2>Responsable Module - Vue Module</h2>
      <p>Affiche les modules et cours. Le responsable peut y voir la liste.</p>
  
      <ul>
        <li v-for="evt in calendarData" :key="evt.id">
          Titre: {{ evt.title }} - Date: {{ evt.date }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ResponsableModuleModulesView',
    props: {
      calendarData: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>
  <style>
  p,h1,h2,span ,li,ul{
      color: black;
  }
  </style>