<template>
    <div>
        <h2>Enseignant - Vue Calendrier</h2>
        <p>Affiche le calendrier selon l’enseignant.</p>

        <ul>
            <li v-for="evt in filteredData" :key="evt.id">
                {{ evt.title }} - {{ evt.date }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'EnseignantCalendarView',
    props: {
        calendarData: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        filteredData() {
            // Filtrer les cours assignés à l’enseignant courant
            // (Simuler un user courant "M. Dupont" par exemple)
            const currentTeacher = 'M. Dupont';
            return this.calendarData.filter(ev => ev.enseignant === currentTeacher);
        }
    }
};
</script>

<style>
p,h1,h2,span ,li,ul{
    color: black;
}
</style>