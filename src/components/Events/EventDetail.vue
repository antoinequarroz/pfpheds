<template>
  <div class="event-detail-content">
    <h3>{{ event.title }}</h3>
    
    <!-- Image de l'événement -->
    <div class="event-detail-image">
      <img v-if="event.image" :src="event.image" :alt="event.title" class="event-image" />
      <div v-else class="event-image-placeholder">
        <i class="pi pi-calendar"></i>
      </div>
    </div>
    
    <div class="event-detail-date"><i class="pi pi-calendar"></i> {{ formatDate(event.startDate) }}<span v-if="event.endDate"> – {{ formatDate(event.endDate) }}</span></div>
    <div class="event-detail-description">{{ event.description }}</div>
    <div class="event-detail-type">
      <span class="event-type-badge" :class="event.type">{{ event.type === 'private' ? 'Privé' : 'Public' }}</span>
      <span v-if="event.type === 'private' && event.role">| Rôle : {{ event.role }}</span>
    </div>
    <div class="event-detail-participants">
      <b>Participants :</b>
      <div v-if="event && event.registered && event.registered.length > 0" class="participants-list">
        <div v-for="user in participantsInfo" :key="user.uid || user.id" class="participant-item">
          <img :src="user.photoURL" class="participant-avatar" :alt="user.fullName" />
          <span class="participant-name">{{ user.prenom }} {{ user.nom }}</span>
        </div>
      </div>
      <div v-else>Aucun inscrit.</div>
    </div>
    <div class="event-detail-actions">
      <Button icon="pi pi-user-plus"
        :label="isUserRegistered ? 'Inscrit !' : 'S\'inscrire'"
        class="p-button-rounded p-button-primary"
        :severity="isUserRegistered ? 'success' : 'primary'"
        @click="$emit('register', event)" />
      <Button icon="pi pi-heart"
        :label="event && event.likes ? event.likes.toString() : ''"
        class="p-button-rounded p-button-text p-button-danger"
        :severity="event && event.liked ? 'danger' : undefined"
        @click="$emit('like', event)" />

      <!-- Boutons d'administration (seulement pour le créateur) -->
      <div v-if="canManageEvent" class="admin-actions">
        <Button icon="pi pi-pencil"
          label="Modifier"
          class="p-button-rounded p-button-warning"
          @click="$emit('edit', event)" />
        <Button icon="pi pi-trash"
          label="Supprimer"
          class="p-button-rounded p-button-danger"
          @click="confirmDelete" />
      </div>

      <Button icon="pi pi-times" label="Fermer" class="p-button-text p-button-danger ml-3" @click="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { ref, watch, onMounted, computed } from 'vue';
import { getDatabase, ref as dbRef, get } from 'firebase/database';

const props = defineProps({
  event: { type: Object, required: true },
  userId: { type: String, required: false }
});

const defaultAvatar = 'https://ui-avatars.com/api/?name=Utilisateur';

const participantsInfo = ref([]);

// Computed pour vérifier si l'utilisateur est inscrit
const isUserRegistered = computed(() => {
  if (!props.event?.registered || !props.userId) return false;
  // Vérifier dans les UIDs simples (ancien format)
  if (props.event.registered.includes(props.userId)) return true;
  // Vérifier dans les objets utilisateur (nouveau format)
  return props.event.registered.some(item =>
    typeof item === 'object' && item.uid === props.userId
  );
});

const canManageEvent = computed(() => {
  // L'utilisateur peut gérer l'événement s'il en est le créateur
  return props.event && props.userId && props.event.admin === props.userId;
});

async function fetchParticipantsInfo(registeredData) {
  if (!registeredData || registeredData.length === 0) {
    participantsInfo.value = [];
    return;
  }

  const db = getDatabase();
  const fetches = registeredData.map(async (item) => {
    try {
      // Si l'item est déjà un objet avec les infos complètes (nouveau format)
      if (typeof item === 'object' && item.uid) {
        return {
          uid: item.uid,
          nom: item.nom || '',
          prenom: item.prenom || '',
          fullName: `${item.prenom} ${item.nom}`.trim() || 'Utilisateur inconnu',
          photoURL: item.photoURL || defaultAvatar
        };
      }

      // Sinon, c'est un UID simple (ancien format) - récupérer depuis Firebase
      const uid = typeof item === 'string' ? item : item.uid;
      const userRef = dbRef(db, `Users/${uid}`);
      const snap = await get(userRef);
      if (snap.exists()) {
        const u = snap.val();
        console.log('User fetched for uid', uid, u);
        const prenom = u.Prenom || '';
        const nom = u.Nom || '';
        return {
          uid,
          nom: nom,
          prenom: prenom,
          fullName: `${prenom} ${nom}`.trim() || 'Utilisateur inconnu',
          photoURL: u.PhotoURL || u.photoURL || u.avatar || defaultAvatar
        };
      } else {
        return { uid, nom: '', prenom: '', fullName: 'Utilisateur inconnu', photoURL: defaultAvatar };
      }
    } catch (e) {
      const uid = typeof item === 'string' ? item : (item.uid || 'unknown');
      return { uid, nom: '', prenom: '', fullName: 'Utilisateur inconnu', photoURL: defaultAvatar };
    }
  });
  participantsInfo.value = await Promise.all(fetches);
}

watch(() => props.event && props.event.registered, (val) => {
  fetchParticipantsInfo(val || []);
}, { immediate: true });

onMounted(() => {
  fetchParticipantsInfo((props.event && props.event.registered) || []);
});

function formatDate(date) {
  if (!date) return '';
  if (typeof date === 'string') return new Date(date).toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
  return date.toLocaleDateString('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getUserAvatar(uid) {
  // À brancher plus tard (photo réelle)
  return 'https://ui-avatars.com/api/?name=' + uid;
}

function confirmDelete() {
  if (confirm(`Voulez-vous vraiment supprimer l'événement "${props.event.title}" ?`)) {
    emit('delete', props.event);
  }
}
</script>

<style scoped>
.event-detail-content {
  padding: 1.2em;
  min-width: 260px;
  padding-bottom: 2em;
}
.event-detail-image {
  margin-bottom: 1em;
}
.event-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}
.event-image-placeholder {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 10px;
}
.event-detail-date {
  color: #ffc700;
  margin-bottom: 0.6em;
  font-weight: 600;
}
.event-detail-description {
  margin-bottom: 1.2em;
  color: #232b4a;
}
.event-detail-type {
  margin-bottom: 1em;
}
.event-type-badge {
  display: inline-block;
  padding: 0.1em 0.8em;
  border-radius: 1em;
  font-size: 0.93em;
  font-weight: 600;
  background: #ffc700;
  color: #232b4a;
}
.event-type-badge.private {
  background: #ff5577;
  color: #fff;
}
.event-type-badge.public {
  background: #ffc700;
  color: #232b4a;
}
.event-detail-participants {
  margin: 1.2em 0;
}
.participants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
  margin-top: 0.6em;
}
.participant-item {
  display: flex;
  align-items: center;
}
.participant-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffc700;
  margin-right: 0.4em;
}
.participant-name {
  font-size: 0.8em;
  color: #fff;
}
.event-detail-actions {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1.8em;
}
.admin-actions {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
