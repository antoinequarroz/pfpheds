<template>
  <Navbar />
  <div class="newsfeed-layout">
    <!-- Sidebar Gauche -->
    <div class="sidebar-left">
      <LeftSidebar />
    </div>
    <!-- Zone centrale événement -->
    <div class="main-feed">
      <!-- Partie centrale gestion événements -->
      <div class="event-management-page">
        <h2>Gestion des événements</h2>
        <Card class="event-form-card">
          <template #content>
            <form class="event-form" @submit.prevent="addEvent">
              <div class="form-group">
                <label>Titre</label>
                <InputText v-model="newEvent.title" required placeholder="Titre de l'événement" class="w-full" />
              </div>
              <div class="form-group">
                <label>Description</label>
                <Textarea v-model="newEvent.description" required placeholder="Description" class="w-full" autoResize rows="3" />
              </div>
              <div class="form-group">
                <label>Date et heure de début</label>
                <Calendar v-model="newEvent.startDate" showTime hourFormat="24" dateFormat="dd/mm/yy" class="w-full" showIcon />
              </div>
              <div class="form-group">
                <label>Date et heure de fin</label>
                <Calendar v-model="newEvent.endDate" showTime hourFormat="24" dateFormat="dd/mm/yy" class="w-full" showIcon />
              </div>
              <div class="form-group">
                <label>Type d'événement</label>
                <Dropdown v-model="newEvent.type" :options="TYPE_OPTIONS" optionLabel="label" optionValue="value" placeholder="Sélectionner le type" class="w-full" />
              </div>
              <div class="form-group" v-if="newEvent.type === 'private'">
                <label>Rôle dédié</label>
                <Dropdown v-model="newEvent.role" :options="ROLE_OPTIONS" optionLabel="label" optionValue="value" placeholder="Sélectionner le rôle" class="w-full" />
              </div>
              <Button type="submit" label="Créer" class="p-button-primary w-full mt-2" icon="pi pi-plus-circle" />
            </form>
          </template>
        </Card>

        
        <div class="event-list-scrollable">
          <h3>Événements à venir</h3>
          <div v-if="eventStore.events.length === 0" class="empty">Aucun événement pour l'instant.</div>
          <div v-for="event in eventStore.events" :key="event.id" class="event-card-beautiful">
            <div class="event-card-header">
              <span class="event-date-pill"><i class="pi pi-calendar"></i> {{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }}</span>
              <Button icon="pi pi-heart" :label="event.likes.toString()" class="p-button-rounded p-button-text p-button-danger event-like-btn" :severity="event.liked ? 'danger' : undefined" @click="likeEvent(event)" />
            </div>
            <div class="event-title-main">{{ event.title }}</div>
            <div class="event-description-main">{{ event.description }}</div>
            <div class="event-details">
              <span class="event-type">Type : {{ event.type === 'private' ? 'Privé' : 'Public' }}</span>
              <span v-if="event.type === 'private' && event.role">| Rôle : {{ event.role }}</span>
            </div>
            <div class="event-card-footer">
              <Button icon="pi pi-user-plus"
        :label="event.registered && event.registered.includes(userId) ? 'Inscrit !' : 'S\'inscrire'"
        class="p-button-rounded p-button-primary event-register-btn"
        :severity="event.registered && event.registered.includes(userId) ? 'success' : 'primary'"
        @click="registerEvent(event)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Sidebar Droite -->
    <div class="sidebar-right">
      <RightSidebar />
    </div>
  </div>
  <MobileBottomNav />
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import LeftSidebar from '@/components/Bibliotheque/Social/LeftSidebar.vue';
import RightSidebar from '@/components/Bibliotheque/Social/RightSidebar.vue';
import Navbar from '@/components/Utils/Navbar.vue';
import MobileBottomNav from '@/components/Utils/MobileBottomNav.vue';

const eventStore = useEventStore();
const ROLE_OPTIONS = [
  { label: 'Site Loeche', value: 'siteLoeche' },
  { label: 'BA24', value: 'BA24' },
  { label: 'BA23', value: 'BA23' },
  { label: 'BA22', value: 'BA22' },
  { label: 'Student', value: 'student' },
  { label: 'Manuel', value: 'manuel' }
];
const TYPE_OPTIONS = [
  { label: 'Public', value: 'public' },
  { label: 'Privé', value: 'private' }
];

const newEvent = ref({
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  type: '',
  role: ''
});

onMounted(() => {
  eventStore.listenEvents();
});

function addEvent() {
  if (!newEvent.value.title || !newEvent.value.description || !newEvent.value.startDate || !newEvent.value.endDate || !newEvent.value.type || (newEvent.value.type === 'private' && !newEvent.value.role)) return;
  const eventToSend = {
    title: newEvent.value.title,
    description: newEvent.value.description,
    startDate: newEvent.value.startDate,
    endDate: newEvent.value.endDate,
    type: newEvent.value.type,
    role: newEvent.value.type === 'private' ? newEvent.value.role : null,
    admin: userId.value
  };
  console.log('event envoyé', eventToSend);
  eventStore.addEvent(eventToSend);
  newEvent.value = { title: '', description: '', startDate: '', endDate: '', type: '', role: '' };
}

function likeEvent(event) {
  eventStore.updateEvent(event.id, {
    likes: event.liked ? event.likes - 1 : event.likes + 1,
    liked: !event.liked
  });
}

const userState = inject('userState');
const userId = computed(() => userState?.user?.uid || null);

function registerEvent(event) {
  if (!userId.value) return; // Optionnel : afficher une alerte si non connecté
  eventStore.toggleRegistration(event.id, userId.value, event.registered);
}

function formatDate(date) {
  if (!date) return '';
  if (typeof date === 'string') return new Date(date).toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
  return date.toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
}
function formatSidebarDate(date) {
  if (!date) return '';
  if (typeof date === 'string') date = new Date(date);
  return date.toLocaleDateString('fr-CH', { month: '2-digit', day: '2-digit' });
}

// Mobile detection
const isMobile = computed(() => window.innerWidth <= 900);
const top5Events = computed(() => {
  const now = new Date();
  return events.value
    .filter(ev => new Date(ev.date) >= now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);
});


</script>

<style scoped>
.newsfeed-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 1.5rem;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
.sidebar-left {
  overflow-y: auto;
}
.sidebar-right {
  overflow-y: auto;
}
.main-feed {
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
}
.main-feed::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.main-feed {
  scrollbar-width: none;
}
.event-management-page {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 1.3em 0.7em 2em 0.7em;
  min-width: 0;
  min-height: 100vh;
  position: relative;
}
h2 {
  margin-bottom: 1.2em;
  color: #ffc700;
  font-size: 1.4em;
}
.event-form-card {
  margin-bottom: 1.2em;
}
.event-list-scrollable {
  flex: 1 1 auto;
  overflow-y: auto;
  max-height: 60vh;
  padding-bottom: 1.5em;
}
.event-list-scrollable h3 {
  color: #ffc700;
  margin-bottom: 0.7em;
}
.empty {
  color: #888;
  margin: 1.5em 0;
  text-align: center;
}
.event-card-beautiful {
  background: linear-gradient(135deg, #232b4a 70%, #ffc700 120%);
  border-radius: 22px;
  box-shadow: 0 4px 24px 0 rgba(34,34,60,0.11);
  margin-bottom: 1.1em;
  padding: 1.1em 1.2em 1em 1.2em;
  color: #fff;
  font-size: 1.05em;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 2px solid #ffc70022;
  transition: box-shadow 0.18s;
}
.event-card-beautiful:hover {
  box-shadow: 0 8px 32px 0 #ffc70077;
}
.event-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
}
.event-date-pill {
  background: #ffc700;
  color: #232b4a;
  border-radius: 18px;
  padding: 0.18em 1em 0.18em 0.8em;
  font-size: 0.98em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4em;
  box-shadow: 0 1px 5px 0 #232b4a22;
}
.event-date-pill i {
  color: #232b4a;
}
.event-title-main {
  font-size: 1.18em;
  font-weight: 700;
  margin-bottom: 0.3em;
  color: #fff;
  text-shadow: 0 2px 8px #232b4a44;
}
.event-description-main {
  color: #fff;
  margin-bottom: 1.1em;
  opacity: 0.95;
}
.event-card-footer {
  display: flex;
  justify-content: flex-end;
}
.event-like-btn {
  font-size: 1.05em;
}
.event-register-btn {
  font-size: 1.05em;
  min-width: 120px;
}
/* --- MOBILE CENTERING & MARGINS --- */
@media (max-width: 900px) {
  .sidebar-left, .sidebar-right {
    display: none !important;
  }
  .main-feed {
    width: 100vw;
    max-width: 100vw;
    padding: 0;
    justify-content: center;
    align-items: center;
  }
  .event-management-page {
    max-width: 100vw;
    margin: 0 auto;
    padding: 1.2em 0.15em 1.8em 0.15em;
    background: transparent;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .event-form-card {
    width: 100%;
    max-width: 360px;
    min-width: 260px;
    margin-left: auto;
    margin-right: auto;
  }
  .event-list-scrollable {
    width: 100%;
    max-width: 99vw;
    margin-left: auto;
    margin-right: auto;
  }
  h2 {
    text-align: center;
  }
}
</style>
