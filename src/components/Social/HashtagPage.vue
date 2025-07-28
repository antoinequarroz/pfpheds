<template>
  <div>
    <UserProfile />
    <div class="container mt-4">
      <h2>Posts avec #{{ hashtag }}</h2>
      <div v-if="posts.length > 0">
        <PostItem
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :currentUser="currentUser"
        />
      </div>
      <div v-else>
        <p>Aucun post trouvé pour ce hashtag.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, onValue } from "firebase/database";
import { db, auth } from '../../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import UserProfile from '@/components/Social/UserProfile.vue';
import PostItem from '@/components/Social/PostItem.vue';

export default {
  name: 'HashtagPage',
  components: {
    UserProfile,
    PostItem
  },
  props: {
    hashtag: String
  },
  data() {
    return {
      posts: [],
      currentUser: null
    };
  },
  created() {
    this.fetchHashtagPosts();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  },
  methods: {
    fetchHashtagPosts() {
      const postsRef = dbRef(db, 'posts');
      onValue(postsRef, (snapshot) => {
        const postsData = snapshot.val();
        if (postsData) {
          this.posts = Object.entries(postsData).map(([id, post]) => ({
            ...post,
            id
          })).filter(post => post.content.includes(`#${this.hashtag}`));
        }
      });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
