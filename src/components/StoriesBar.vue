<template>
  <div class="stories-bar p-d-flex p-ai-center p-px-2" style="gap: 1rem; overflow-x: auto">
    <!-- Bouton d'ajout de story sous forme de rond -->
    <div class="story-avatar-col add-story-avatar" @click="showAddStory = true">
      <Avatar shape="circle" size="large" class="add-story-avatar-inner">
        <span class="pi pi-plus plus-icon" />
      </Avatar>
      <small class="story-username p-text-center p-text-truncate">Votre story</small>
    </div>
    <!-- Liste des stories -->
    <div
      v-for="user in uniqueUsers"
      :key="user.userId"
      class="p-d-flex p-flex-column p-ai-center story-avatar-col"
      style="min-width: 70px"
    >
      <Avatar
        :image="user.userAvatar || defaultAvatar"
        :class="['p-mb-1', { 'p-shadow-4': user.hasUnseenStory }]"
        shape="circle"
        size="large"
        style="border: 2px solid var(--primary-color); cursor: pointer"
        @click="selectStory(user.stories)"
      />
      <small class="story-username p-text-center p-text-truncate">{{ getUserDisplayName(user.userName) }}</small>
    </div>
    <Dialog
      v-model:visible="showAddStory"
      modal
      header="Ajouter une story"
      :closable="true"
      dismissableMask
      style="width: 400px"
    >
      <AddStory @close="showAddStory = false" @uploaded="fetchStories" />
    </Dialog>
    <Dialog
      v-model:visible="showStoryDialog"
      modal
      header="Story"
      :closable="true"
      dismissableMask
      style="width: 400px"
      @hide="onStoryDialogHide"
    >
      <StoryModal
        v-if="selectedStory"
        :story="selectedStory"
        @close="onStoryDialogHide"
        @refreshStories="fetchStories"
      />
    </Dialog>
  </div>
</template>

<script>
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Dialog from 'primevue/dialog'
import AddStory from './AddStory.vue'
import StoryModal from './StoryModal.vue'
import { db } from 'root/firebase'
import { ref as dbRef, onValue, update } from 'firebase/database'
import { getCurrentUser } from './Utils/authUser.js'

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
      currentUser: null
    }
  },
  async mounted() {
    this.currentUser = await getCurrentUser()
    this.fetchStories()
  },
  methods: {
    getUserDisplayName(userName) {
      if (!userName) return ''
      if (userName.includes('@')) {
        return userName.split('@')[0]
      }
      return userName
    },
    fetchStories() {
      // Récupère les stories non expirées depuis la RTDB
      const now = Date.now()
      const storiesRef = dbRef(db, 'stories')
      onValue(storiesRef, (snapshot) => {
        const data = snapshot.val()
        let stories = []
        if (data) {
          const storyEntries = Object.entries(data)
            .map(([id, story]) => ({ id, ...story }))
            .filter((story) => story.expiresAt > now)
            .sort((a, b) => b.expiresAt - a.expiresAt)
          // Pour chaque story, récupère la photo utilisateur depuis /Users/{userId}/PhotoURL
          const promises = storyEntries.map(async (story) => {
            if (story.userId) {
              try {
                const userRef = dbRef(db, `Users/${story.userId}/PhotoURL`)
                const snapshot = await new Promise((resolve) =>
                  onValue(userRef, resolve, { onlyOnce: true })
                )
                const photoURL = snapshot.val()
                return { ...story, userAvatar: photoURL || story.userAvatar || this.defaultAvatar }
              } catch {
                return { ...story, userAvatar: story.userAvatar || this.defaultAvatar }
              }
            }
            return { ...story, userAvatar: story.userAvatar || this.defaultAvatar }
          })
          Promise.all(promises).then((storiesWithAvatars) => {
            this.stories = storiesWithAvatars
            // Grouper les stories par utilisateur
            const userMap = {}
            storiesWithAvatars.forEach((story) => {
              if (!userMap[story.userId]) {
                userMap[story.userId] = []
              }
              userMap[story.userId].push(story)
            })
            this.uniqueUsers = Object.values(userMap).map((stories) => {
              // Trier les stories de l'utilisateur par date
              stories.sort((a, b) => b.timestamp - a.timestamp)
              // Vérifier si l'utilisateur courant a vu toutes les stories de cet utilisateur
              const hasUnseenStory = this.currentUser
                ? stories.some((story) => !(story.viewers || []).includes(this.currentUser.uid))
                : false
              // Utiliser la plus récente pour l'avatar/nom
              return {
                userId: stories[0].userId,
                userName: stories[0].userName,
                userAvatar: stories[0].userAvatar,
                stories: stories,
                hasUnseenStory
              }
            })
          })
          return
        }
        this.stories = stories
      })
    },
    selectStory(stories) {
      this.selectedStory = stories
      this.showStoryDialog = true
    },
    onStoryDialogHide() {
      this.showStoryDialog = false
      this.selectedStory = null
    },
    async openStory(stories) {
      // stories = tableau de stories de l'utilisateur
      this.selectedStory = stories
      // Marquer toutes les stories comme vues pour l'utilisateur courant
      if (this.currentUser) {
        for (const story of stories) {
          if (!(story.viewers || []).includes(this.currentUser.uid)) {
            const storyRef = dbRef(db, `stories/${story.id}/viewers`)
            // Ajoute l'uid dans viewers (évite les doublons)
            const newViewers = [...(story.viewers || []), this.currentUser.uid]
            await update(dbRef(db, `stories/${story.id}`), { viewers: newViewers })
          }
        }
        // Refresh stories to update seen status
        setTimeout(() => this.fetchStories(), 500)
      }
    }
  }
}
</script>

<style scoped>
.stories-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  flex-wrap: nowrap;
  padding: 0.5rem 0;
  box-sizing: border-box;
}
.story-avatar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.story-username {
  margin-top: 4px;
  max-width: 200px;
  text-align: center;
  word-break: break-word;
}
.add-story-avatar {
  cursor: pointer;
  min-width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.add-story-avatar-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color, #2196f3);
  color: #fff;
  font-size: 2rem;
  border: 2px solid var(--primary-color, #2196f3);
  width: 54px;
  height: 54px;
  transition: width 0.18s, height 0.18s, font-size 0.18s;
}
.plus-icon {
  font-size: 2rem;
}
@media (max-width: 600px) {
  .add-story-avatar-inner,
  .story-avatar-col .p-avatar {
    width: 40px !important;
    height: 40px !important;
    font-size: 1.2rem !important;
  }
  .story-avatar-col {
    min-width: 48px;
  }
  .story-username {
    max-width: 60px;
    font-size: 0.85rem;
  }
  .stories-bar {
    gap: 1.1rem;
  }
  .story-avatar-col {
    margin-left: 0.2rem;
    margin-right: 0.2rem;
  }
}
</style>
