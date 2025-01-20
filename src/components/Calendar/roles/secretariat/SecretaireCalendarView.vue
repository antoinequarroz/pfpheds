<template>
  <div>
    <h2>Secrétariat - Vue Calendrier</h2>
    <p>Le secrétariat peut voir/gérer le calendrier global.</p>
    <ul>
      <li v-for="evt in calendarData" :key="evt.id">
        {{ evt.title }} - {{ evt.date }} - Enseignant: {{ evt.enseignant }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SecretaireCalendarView',
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