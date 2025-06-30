<template>
  <div class="event-detail-content">
    <h3>{{ event.title }}</h3>
    <div class="event-detail-date"><i class="pi pi-calendar"></i> {{ formatDate(event.startDate) }}<span v-if="event.endDate"> – {{ formatDate(event.endDate) }}</span></div>
    <div class="event-detail-description">{{ event.description }}</div>
    <div class="event-detail-type">
      <span class="event-type-badge" :class="event.type">{{ event.type === 'private' ? 'Privé' : 'Public' }}</span>
      <span v-if="event.type === 'private' && event.role">| Rôle : {{ event.role }}</span>
    </div>
    <div class="event-detail-participants">
      <b>Participants :</b>
      <div class="event-avatars">
        <span v-if="event.registered && event.registered.length === 0">Aucun inscrit.</span>
        <img v-for="uid in (event.registered || [])" :key="uid" :src="getUserAvatar(uid)" class="avatar" :alt="'Inscrit '+uid" />
      </div>
    </div>
    <div class="event-detail-actions">
      <Button icon="pi pi-user-plus"
        :label="event.registered && event.registered.includes(userId) ? 'Inscrit !' : 'S\'inscrire'"
        class="p-button-rounded p-button-primary"
        :severity="event.registered && event.registered.includes(userId) ? 'success' : 'primary'"
        @click="$emit('register', event)" />
      <Button icon="pi pi-heart"
        :label="event.likes.toString()"
        class="p-button-rounded p-button-text p-button-danger"
        :severity="event.liked ? 'danger' : undefined"
        @click="$emit('like', event)" />
      <Button icon="pi pi-times" label="Fermer" class="p-button-text p-button-danger ml-3" @click="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
const props = defineProps({
  event: { type: Object, required: true },
  userId: { type: String, required: false }
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
</script>

<style scoped>
.event-detail-content {
  padding: 1.2em;
  min-width: 260px;
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
.event-avatars {
  display: flex;
  gap: 0.4em;
  margin-top: 0.5em;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ffc70066;
}
.event-detail-actions {
  display: flex;
  align-items: center;
  gap: 1em;
  margin-top: 1.8em;
}
</style>
