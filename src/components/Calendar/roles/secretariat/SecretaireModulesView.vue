<template>
  <div>
    <h2>Secrétariat - Page Calendrier Module & Liste Enseignants</h2>
    <p>Exemple de vue listant les enseignants et le planning par module.</p>

    <h3>Liste des enseignants</h3>
    <ul>
      <li v-for="(ens, index) in enseignants" :key="index">
        {{ ens }}
      </li>
    </ul>

    <h3>Planning (calendrierData)</h3>
    <ul>
      <li v-for="evt in calendarData" :key="evt.id">
        Module/Cours : {{ evt.title }} - Date : {{ evt.date }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SecretaireModulesView',
  props: {
    calendarData: {
      type: Array,
      default: () => []
    },
    enseignants: {
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