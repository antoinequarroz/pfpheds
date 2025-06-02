<template>
  <div class="stories-bar">
    <!-- Bouton d'ajout de story -->
    <div class="story-item add-story-container">
      <!--
        Sur mobile : redirige vers /create (page dédiée)
        Sur desktop : ouvre la dialog AddStory
      -->
      <div class="add-story" @click="handleAddStoryClick">
        <span class="add-icon">+</span>
      </div>
      <p>Créer</p>
    </div>
    <!-- Liste des stories -->
    <div
      v-for="user in uniqueUsers"
      :key="user.userId"
      class="story-item"
      @click="openStory(user.stories)"
    >
      <img
        :src="user.userAvatar || defaultAvatar"
        alt="avatar"
        class="avatar"
        :class="{ 'unseen-story': user.hasUnseenStory }"
      />
      <p>{{ user.userName }}</p>
    </div>
    <!-- Sur desktop uniquement, dialog AddStory -->
    <AddStory v-if="showAddStory && !isMobile" @close="showAddStory = false" @uploaded="fetchStories" />
    <StoryModal v-if="selectedStory" :story="selectedStory" @close="closeStory" @refreshStories="fetchStories" />
  </div>
</template>

<script>
import AddStory from './AddStory.vue';
import StoryModal from './StoryModal.vue';
import { db } from '../../../../firebase';
import { ref as dbRef, onValue, update, get } from 'firebase/database';
import { getCurrentUser } from './Utils/authUser.js';
import { useRouter } from 'vue-router';
import eventBus from '@/event-bus';

export default {
  name: 'StoriesBar',
  components: { AddStory, StoryModal },
  data() {
    return {
      stories: [], // toutes les stories non expirées
      uniqueUsers: [], // stories groupées par utilisateur
      showAddStory: false,
      selectedStory: null,
      defaultAvatar: 'https://ui-avatars.com/api/?name=User',
      currentUser: null,
      isMobile: window.innerWidth <= 768,
    };
  },
  watch: {
    selectedStory(newVal) {
      // Synchronise l'état story-modal avec App.vue via eventBus
      if (newVal) {
        console.log('[StoriesBar] story ouverte, eventBus emit TRUE');
        eventBus.emit('story-opened', true);
      } else {
        console.log('[StoriesBar] story fermée, eventBus emit FALSE');
        eventBus.emit('story-opened', false);
      }
    },
  },
  async mounted() {
    this.currentUser = await getCurrentUser();
    this.fetchStories();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    // Affiche le nom complet sans modification
    getUserDisplayName(userName) {
      return userName || 'Utilisateur';
    },
    async fetchStories() {
      const storiesRef = dbRef(db, 'stories');
      onValue(storiesRef, async (snapshot) => {
        const allStories = snapshot.val() || {};
        const now = Date.now();
        const users = [];
        const userPromises = Object.entries(allStories).map(async ([userId, userStories]) => {
          const userStoriesArr = Object.values(userStories || {})
            .filter(story => story.expiresAt > now)
            .sort((a, b) => b.timestamp - a.timestamp);
          if (userStoriesArr.length > 0) {
            // Fallback multi-source pour nom/avatar
            let userName = userStoriesArr[0].userName || 'Utilisateur';
            let userAvatar = userStoriesArr[0].userAvatar || this.defaultAvatar;
            try {
              const userSnap = await get(dbRef(db, 'Users/' + userId));
              const userData = userSnap.val();
              console.log('Profil récupéré pour', userId, ':', userData);
              if (userData) {
                userName = userData.displayName || userName;
                userAvatar = userData.photoURL || userAvatar;
              }
            } catch (e) { console.error(e); }
            // Si toujours rien, fallback ui-avatars
            if (!userAvatar) {
              userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName || 'Utilisateur')}`;
            }
            users.push({
              userId,
              userName,
              userAvatar,
              stories: userStoriesArr,
              hasUnseenStory: true
            });
          }
        });
        await Promise.all(userPromises);
        this.uniqueUsers = users;
      });
    },
    async openStory(stories) {
      this.selectedStory = stories;
      // eventBus.emit('story-opened', true); // -> Désormais géré par le watcher
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
    },
    async closeStory() {
      this.selectedStory = null;
      // eventBus.emit('story-opened', false); // -> Désormais géré par le watcher
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
    handleAddStoryClick() {
      // Mobile : redirige vers la page /create, Desktop : ouvre la dialog
      if (this.isMobile) {
        this.$router.push('/create');
      } else {
        this.showAddStory = true;
      }
    },
  }
};
</script>

<style scoped>
.stories-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
  gap: 16px;
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 90px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  max-width: 880px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.1rem;

}

@media (max-width: 900px) {
  .stories-bar {
    max-width: 98vw;
  }
}

.stories-bar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Styles pour les stories */
.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;
  cursor: pointer;
  position: relative;
  outline: none;
}

.story-item:active::after {
  content: '';
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%,-50%) scale(1.5);
  width: 80%; height: 80%;
  border-radius: 32%;
  background: rgba(33,150,243,0.11);
  animation: ripple-story 0.4s linear;
  pointer-events: none;
  z-index: 1;
}

@keyframes ripple-story {
  0% { opacity: 1; transform: translate(-50%,-50%) scale(0.8); }
  100% { opacity: 0; transform: translate(-50%,-50%) scale(1.6); }
}

.story-item .avatar {
  width: 50px;
  height: 50px;
  border-radius: 32%;
  margin-bottom: 5px;
  object-fit: cover;
  border: 2px solid var(--primary-color, #2196f3);
  transition: box-shadow 0.22s, border 0.22s;
  background: linear-gradient(135deg, #e3f2fd 0%, #fff 100%);
  position: relative;
}

.story-item .avatar.active, .story-item .avatar.unseen {
  border: 3px solid;
  border-image: linear-gradient(120deg, #2196f3 60%, #ffb300 100%) 1;
  box-shadow: 0 0 0 3px #fff, 0 0 12px 2px #2196f3;
}

.story-item .avatar:hover {
  box-shadow: 0 0 0 2px var(--primary-color, #2196f3), 0 0 3px 2px #d49f3f;
}

.story-item p {
  margin: 0;
  margin-top: 2px;
  font-size: 1.07rem;
  color: var(--primary-color, #1976d2);
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 2px rgba(33,150,243,0.07);
}

.add-story-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8px;
  cursor: pointer;
}

.add-story {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 32%;
  background: var(--surface-card, #f8fafd);
  box-shadow: 0 4px 16px 0 rgba(33,150,243,0.11);
  color: #fff;
  font-size: 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  margin-bottom: 5px;
  position: relative;
  transition: box-shadow 0.2s, background 0.2s;
}

.add-story:hover {
  box-shadow: 0 0 0 3px var(--primary-color, #2196f3), 0 4px 16px 0 rgba(33,150,243,0.11);
}

.add-story:focus-visible {
  box-shadow: 0 0 0 3px var(--primary-color, #2196f3), 0 4px 16px 0 rgba(33,150,243,0.11);
}

.add-story .plus-icon {
  font-size: 2.1rem;
  font-weight: bold;
  text-shadow: 0 2px 8px rgba(33,150,243,0.13);
  color: #fff;
}

.add-icon {
  font-size: 2rem;
  color: var(--primary-color, #2196f3);
}

.story-item p, .add-story-container p {
  font-size: 0.8rem;
  text-align: center;
  word-break: break-word;
}

@media (max-width: 768px) {
  .stories-bar {
    padding: 10px;
    gap: 12px;
    min-height: 80px;
    border-radius: 0.8rem;
    margin-bottom: 0.6rem;
  }
  
  .story-item .avatar,
  .add-story {
    width: 45px;
    height: 45px;
  }
  
  .add-icon {
    font-size: 1.7rem;
  }
  
  .story-item p, .add-story-container p {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .stories-bar {
    padding: 8px;
    gap: 10px;
    min-height: 70px;
  }
  
  .story-item .avatar,
  .add-story {
    width: 40px;
    height: 40px;
  }
  
  .add-icon {
    font-size: 1.5rem;
  }
}
</style>
