<template>
  <PageTemplate>
    <template #left>
      <LeftSidebar />
    </template>
    <template #default>
      <div class="event-details-page">
        <Button label="← Revenir à la liste des événements" class="p-button-secondary mb-4" @click="goToEventList" style="align-self: flex-start;" />
        <h2>Détail de l'événement</h2>
        <Card class="event-details-card" v-if="event">
          <template #content>
            <div v-if="!event">
              <p>Chargement de l'événement...</p>
            </div>
            <div v-else>
              <div class="event-info" v-if="!editMode">
                <h3>{{ event.title }}</h3>
                <p><strong>Description :</strong> {{ event.description }}</p>
                <p><strong>Date de début :</strong> {{ formatDate(event.startDate) }}</p>
                <p><strong>Date de fin :</strong> {{ formatDate(event.endDate) }}</p>
                <p><strong>Type :</strong> {{ event.type === 'private' ? 'Privé' : 'Public' }}</p>
                <p v-if="event.type === 'private' && event.role"><strong>Rôle dédié :</strong> {{ event.role }}</p>
                <p v-if="creatorFullName"><strong>Créateur :</strong> {{ creatorFullName }}</p>
                <p><strong>Likes :</strong> {{ event.likes }}</p>
                <p><strong>Inscrits :</strong> {{ event.registered ? event.registered.length : 0 }}</p>
                <Button v-if="userId === event.admin" label="Modifier" class="p-button-sm p-button-warning mt-3" @click="startEdit" />
              </div>
              <div class="participants-list" v-if="event && event.registered">
                <h4>Participants inscrits :</h4>
                <ul>
                  <li v-for="p in participants" :key="p.uid" class="flex items-center gap-2">
                    {{ p.fullName }}<span v-if="p.uid === event.admin"> (créateur)</span>
                    <Button v-if="userId === event.admin && p.uid !== event.admin" icon="pi pi-user-minus" size="small" severity="danger" class="ml-2" @click.stop="confirmRemoveParticipant(p)" />
                  </li>
                </ul>
                <div v-if="userId === event.admin" class="flex items-center gap-2 mt-2">
                  <Dropdown v-model="selectedUser" :options="addableUsers" optionLabel="fullName" optionValue="id" placeholder="Ajouter un participant..." style="min-width:180px" />
                  <Button icon="pi pi-user-plus" label="Ajouter" size="small" class="p-button-success" @click.stop="addParticipant" :disabled="!selectedUser" />
                </div>
              </div>
              <div v-if="editMode">
                <div class="form-group">
                  <label>Titre</label>
                  <input v-model="editEvent.title" type="text" class="w-full" />
                </div>
                <div class="form-group">
                  <label>Description</label>
                  <textarea v-model="editEvent.description" class="w-full" rows="3"></textarea>
                </div>
                <div class="form-group">
                  <label>Date de début</label>
                  <input v-model="editEvent.startDate" type="datetime-local" class="w-full" />
                </div>
                <div class="form-group">
                  <label>Date de fin</label>
                  <input v-model="editEvent.endDate" type="datetime-local" class="w-full" />
                </div>
                <div class="form-group">
                  <label>Type d'événement</label>
                  <select v-model="editEvent.type" class="w-full">
                    <option value="public">Public</option>
                    <option value="private">Privé</option>
                  </select>
                </div>
                <div class="form-group" v-if="editEvent.type === 'private'">
                  <label>Rôle dédié</label>
                  <input v-model="editEvent.role" type="text" class="w-full" />
                </div>
                <Button label="Enregistrer" class="p-button-sm p-button-success mt-2" @click="saveEdit" />
                <Button label="Annuler" class="p-button-sm p-button-secondary mt-2 ml-2" @click="cancelEdit" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </template>
    <template #right>
      <RightSidebar />
    </template>
  </PageTemplate>
</template>

<script>
import { ref, onMounted, inject, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useEventStore } from '@/stores/eventStore';
import { getDatabase, ref as dbRef, get, onValue } from 'firebase/database';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Card from 'primevue/card';
import PageTemplate from '@/components/Template/PageTemplate.vue';
import LeftSidebar from '@/components/Bibliotheque/Social/LeftSidebar.vue';
import RightSidebar from '@/components/Bibliotheque/Social/RightSidebar.vue';

export default {
  components: {
    Dropdown,
    Button,
    Card,
    PageTemplate,
    LeftSidebar,
    RightSidebar
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const eventStore = useEventStore ? useEventStore() : null;
    const event = ref(null);
    const creatorFullName = ref('');
    const editMode = ref(false);
    const editEvent = ref({});
    const participants = ref([]);
    const allUsers = ref([]); // All users for dropdown
    const selectedUser = ref(null);
    const addableUsers = ref([]);
    const removing = ref(false);

    const userState = inject('userState');
    const userId = computed(() => userState?.user?.uid || null);

    function formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      return d.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
    }

    async function fetchCreatorName(uid) {
      if (!uid) return;
      const db = getDatabase();
      const userRef = dbRef(db, `Users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        creatorFullName.value = `${userData.Prenom || ''} ${userData.Nom || ''}`.trim();
      } else {
        creatorFullName.value = uid;
      }
    }

    function startEdit() {
      editMode.value = true;
      editEvent.value = { ...event.value };
    }

    function cancelEdit() {
      editMode.value = false;
    }

    async function saveEdit() {
      await eventStore.updateEvent(event.value.id, {
        title: editEvent.value.title,
        description: editEvent.value.description,
        startDate: editEvent.value.startDate,
        endDate: editEvent.value.endDate,
        type: editEvent.value.type,
        role: editEvent.value.type === 'private' ? editEvent.value.role : '',
      });
      // Met à jour localement
      Object.assign(event.value, editEvent.value);
      editMode.value = false;
    }

    async function fetchParticipants(uids) {
      if (!uids || !uids.length) {
        participants.value = [];
        return;
      }
      const db = getDatabase();
      const promises = uids.map(async uid => {
        const userRef = dbRef(db, `Users/${uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          return { uid, fullName: `${userData.Prenom || ''} ${userData.Nom || ''}`.trim() };
        } else {
          return { uid, fullName: uid };
        }
      });
      participants.value = await Promise.all(promises);
    }

    function goToEventList() {
      router.push({ name: 'EventManagement' });
    }

    onMounted(async () => {
      const id = route.params.id;
      if (eventStore && eventStore.events) {
        event.value = eventStore.events.find(e => e.id === id);
        if (event.value && event.value.admin) {
          await fetchCreatorName(event.value.admin);
        }
        if (event.value && event.value.registered && event.value.registered.length) {
          await fetchParticipants(event.value.registered);
        }
      }
    });

    watch(
      () => event.value && event.value.registered,
      async (newVal) => {
        if (newVal && newVal.length) {
          await fetchParticipants(newVal);
        } else {
          participants.value = [];
        }
      },
      { immediate: true }
    );

    // --- Admin participant management ---
    // Fetch all users for dropdown
    onMounted(() => {
      const db = getDatabase();
      const usersRef = dbRef(db, 'Users/');
      onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          allUsers.value = Object.keys(usersData).map(key => ({
            id: key,
            fullName: `${usersData[key].Prenom || ''} ${usersData[key].Nom || ''}`.trim() || usersData[key].Mail || 'Utilisateur inconnu',
            ...usersData[key]
          }));
        } else {
          allUsers.value = [];
        }
        updateAddableUsers();
      });
    });
    function updateAddableUsers() {
      if (!event.value || !event.value.registered) { addableUsers.value = []; return; }
      addableUsers.value = allUsers.value.filter(u => !event.value.registered.includes(u.id));
    }
    watch(() => event.value && event.value.registered, updateAddableUsers, { immediate: true });
    async function addParticipant() {
      if (!selectedUser.value) return;
      try {
        await eventStore.addParticipantToEvent(event.value.id, selectedUser.value);
        selectedUser.value = null;
        alert('Participant ajouté avec succès.');
      } catch (e) {
        alert('Erreur lors de l\'ajout du participant.');
      }
    }
    function confirmRemoveParticipant(p) {
      if (removing.value) return;
      if (window.confirm(`Retirer ${p.fullName} de l'événement ?`)) {
        removeParticipant(p);
      }
    }
    async function removeParticipant(p) {
      removing.value = true;
      try {
        await eventStore.removeParticipantFromEvent(event.value.id, p.uid);
        alert('Participant retiré avec succès.');
      } catch (e) {
        alert('Erreur lors du retrait du participant.');
      } finally {
        removing.value = false;
      }
    }

    return {
      event,
      creatorFullName,
      editMode,
      editEvent,
      participants,
      allUsers,
      selectedUser,
      addableUsers,
      removing,
      userId,
      formatDate,
      fetchCreatorName,
      startEdit,
      cancelEdit,
      saveEdit,
      fetchParticipants,
      goToEventList,
      addParticipant,
      confirmRemoveParticipant,
      removeParticipant
    };
  }
};
</script>

<style scoped>
.event-details-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
}
.event-details-card {
  background: #232c3a;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
  border-radius: 18px;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  width: 100%;
  max-width: 600px;
  color: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 1.5rem;
}
.event-details-page h2 {
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  letter-spacing: 0.01em;
}
.event-info h3 {
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  color: #fbbf24;
  letter-spacing: 0.01em;
}
.event-info p {
  margin: 0.35rem 0;
  font-size: 1.05rem;
}
.event-info strong {
  color: #fbbf24;
  font-weight: 600;
}
.p-button-warning, .p-button-success, .p-button-secondary {
  border-radius: 8px !important;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  margin-top: 0.6rem;
  margin-bottom: 0.2rem;
}
.p-button-warning {
  background: #fbbf24 !important;
  color: #232c3a !important;
  border: none;
}
.p-button-success {
  background: #22c55e !important;
  color: #fff !important;
  border: none;
}
.p-button-secondary {
  background: #64748b !important;
  color: #fff !important;
  border: none;
}
.participants-list {
  margin-top: 2.2rem;
  background: #1e2531;
  border-radius: 12px;
  padding: 1.2rem 1.3rem 1.1rem 1.3rem;
  box-shadow: 0 2px 8px 0 rgba(31,38,135,0.11);
}
.participants-list h4 {
  color: #fbbf24;
  font-size: 1.18rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.participants-list ul {
  padding-left: 1.1rem;
  margin: 0;
  list-style: disc;
}
.participants-list li {
  margin-bottom: 0.35rem;
  color: #f8fafc;
  font-size: 1.04rem;
}
.participants-list li span {
  color: #22d3ee;
  font-size: 0.97rem;
  margin-left: 0.3rem;
}
.form-group label {
  color: #fbbf24;
  font-weight: 600;
  margin-bottom: 0.2rem;
  display: block;
}
.form-group input,
.form-group textarea,
.form-group select {
  background: #1e2531;
  color: #f8fafc;
  border: 1px solid #334155;
  border-radius: 7px;
  padding: 0.45rem 0.7rem;
  font-size: 1.05rem;
  margin-bottom: 0.7rem;
  width: 100%;
}
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: #fbbf24;
  outline: none;
}
</style>
