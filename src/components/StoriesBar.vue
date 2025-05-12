<template>
  <div class="stories-bar p-d-flex p-ai-center p-px-2" style="gap: 1rem; overflow-x: auto;">
    <!-- Bouton d'ajout de story -->
    <Button icon="pi pi-plus" label="Votre story" class="p-button-rounded p-button-outlined p-mr-2" @click="showAddStory = true" />
    <!-- Liste des stories -->
    <div v-for="user in uniqueUsers" :key="user.userId" class="p-d-flex p-flex-column p-ai-center story-avatar-col" style="min-width: 70px;">
      <Avatar
        :image="user.userAvatar || defaultAvatar"
        :class="['p-mb-1', { 'p-shadow-4': user.hasUnseenStory }]"
        shape="circle"
        size="large"
        style="border: 2px solid var(--primary-color); cursor: pointer;"
        @click="selectStory(user.stories)"
      />
      <small class="story-username p-text-center p-text-truncate">{{ getUserDisplayName(user.userName) }}</small>
    </div>
    <Dialog v-model:visible="showAddStory" modal header="Ajouter une story" :closable="true" dismissableMask style="width: 400px">
      <AddStory @close="showAddStory = false" @uploaded="fetchStories" />
    </Dialog>
    <Dialog v-model:visible="showStoryDialog" modal header="Story" :closable="true" dismissableMask style="width: 400px" @hide="onStoryDialogHide">
      <StoryModal v-if="selectedStory" :story="selectedStory" @close="onStoryDialogHide" @refreshStories="fetchStories" />
    </Dialog>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Dialog from 'primevue/dialog';
import AddStory from './AddStory.vue';
import StoryModal from './StoryModal.vue';
import { db } from 'root/firebase';
import { ref as dbRef, onValue, update } from 'firebase/database';
import { getCurrentUser } from './Utils/authUser.js';

export default {
  name: 'StoriesBar',
  components: { AddStory, StoryModal, Button, Avatar, Dialog },
  data() {
    return {
      stories: [], // toutes les stories non expirées
      uniqueUsers: [], // stories groupées par utilisateur
      showAddStory: false,
      selectedStory: null,
      showStoryDialog: false,
      defaultAvatar: 'https://ui-avatars.com/api/?name=User',
      currentUser: null,
    };
  },
  async mounted() {
    this.currentUser = await getCurrentUser();
    this.fetchStories();
  },
  methods: {
    getUserDisplayName(userName) {
      if (!userName) return '';
      if (userName.includes('@')) {
        return userName.split('@')[0];
      }
      return userName;
    },
    fetchStories() {
      // Récupère les stories non expirées depuis la RTDB
      const now = Date.now();
      const storiesRef = dbRef(db, 'stories');
      onValue(storiesRef, (snapshot) => {
        const data = snapshot.val();
        let stories = [];
        if (data) {
          const storyEntries = Object.entries(data)
            .map(([id, story]) => ({ id, ...story }))
            .filter(story => story.expiresAt > now)
            .sort((a, b) => b.expiresAt - a.expiresAt);
         // Pour chaque story, récupère la photo utilisateur depuis /Users/{userId}/PhotoURL
         const promises = storyEntries.map(async (story) => {
           if (story.userId) {
             try {
               const userRef = dbRef(db, `Users/${story.userId}/PhotoURL`);
               const snapshot = await new Promise(resolve => onValue(userRef, resolve, { onlyOnce: true }));
               const photoURL = snapshot.val();
               return { ...story, userAvatar: photoURL || story.userAvatar || this.defaultAvatar };
             } catch {
               return { ...story, userAvatar: story.userAvatar || this.defaultAvatar };
             }
           }
           return { ...story, userAvatar: story.userAvatar || this.defaultAvatar };
         });
         Promise.all(promises).then(storiesWithAvatars => {
            this.stories = storiesWithAvatars;
            // Grouper les stories par utilisateur
            const userMap = {};
            storiesWithAvatars.forEach(story => {
              if (!userMap[story.userId]) {
                userMap[story.userId] = [];
              }
              userMap[story.userId].push(story);
            });
            this.uniqueUsers = Object.values(userMap).map(stories => {
              // Trier les stories de l'utilisateur par date
              stories.sort((a, b) => b.timestamp - a.timestamp);
              // Vérifier si l'utilisateur courant a vu toutes les stories de cet utilisateur
              const hasUnseenStory = this.currentUser
                ? stories.some(story => !(story.viewers || []).includes(this.currentUser.uid))
                : false;
              // Utiliser la plus récente pour l'avatar/nom
              return {
                userId: stories[0].userId,
                userName: stories[0].userName,
                userAvatar: stories[0].userAvatar,
                stories: stories,
                hasUnseenStory
              };
            });
          });
         return;
        }
        this.stories = stories;
      });
    },
    selectStory(stories) {
      this.selectedStory = stories;
      this.showStoryDialog = true;
    },
    onStoryDialogHide() {
      this.showStoryDialog = false;
      this.selectedStory = null;
    },
    async openStory(stories) {
      // stories = tableau de stories de l'utilisateur
      this.selectedStory = stories;
      // Marquer toutes les stories comme vues pour l'utilisateur courant
      if (this.currentUser) {
        for (const story of stories) {
          if (!(story.viewers || []).includes(this.currentUser.uid)) {
            const storyRef = dbRef(db, `stories/${story.id}/viewers`);
            // Ajoute l'uid dans viewers (évite les doublons)
            const newViewers = [...(story.viewers || []), this.currentUser.uid];
            await update(dbRef(db, `stories/${story.id}`), { viewers: newViewers });
          }
        }
        // Refresh stories to update seen status
        setTimeout(() => this.fetchStories(), 500);
      }
    }
  }
};
</script>

<style scoped>
.stories-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem 1rem;
}
.story-avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
}
.story-username {
  margin-top: 4px;
  max-width: 200px;
  text-align: center;
  word-break: break-word;
}
</style>
