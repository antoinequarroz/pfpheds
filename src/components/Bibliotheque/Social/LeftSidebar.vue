<template>
  <div class="sidebar card">
    <!-- Partie supérieure fixe -->
    <div class="fixed-content">
      <!-- Profil utilisateur -->
      <div class="user-profile flex">

        <img
          :src="userPhotoURL"
          alt="Avatar"
          class="m-2 col-6"
          style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;"
        />
        <h4 class="m-2 mt-5">
          <a @click="goToProfile" class="profile-link">{{ userFullName }}</a>
        </h4>
      </div>

      <!-- Liens supplémentaires -->
      <div class="profile-links">
        <ul>
          <li @click="goToDocumentPFP">
            <i class="pi pi-file link-icon"></i>
            <span>Documents PFP</span>
          </li>
        </ul>
      </div>
      <h4>Messagerie</h4>

      <hr>
    </div>

    <!-- Partie inférieure scrollable -->
    <div class="scrollable-content">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :user="user"
        @click="openChat(user)"
      />


    </div>
  </div>
</template>
<script>
import Avatar from "primevue/avatar";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref as dbRef, get } from "firebase/database";
import ChatSidebar from '@/views/apps/chat/ChatSidebar.vue'
import UserCard from '@/views/apps/chat/UserCard.vue'

const defaultAvatar = '../../../public/assets/images/avatar/01.jpg';

export default {
  name: "LeftSidebar",
  components: { UserCard, ChatSidebar, Avatar },
  data() {
    return {
      user: {
        Prenom: "",
        Nom: "",
        PhotoURL: "" || defaultAvatar,
        id: "" // Ajout de l'ID utilisateur
      },
      users: [] // Liste de tous les utilisateurs
    };
  },
  computed: {
    userFullName() {
      return `${this.user.prenom} ${this.user.nom}`.trim() || "Utilisateur";
    },
    userPhotoURL() {
      return this.user.PhotoURL;
    },
    userInitials() {
      const { prenom, nom } = this.user;
      return (
        (prenom ? prenom[0].toUpperCase() : "") +
        (nom ? nom[0].toUpperCase() : "")
      );
    },
  },
  methods: {
    async fetchUserProfile(uid) {
      const db = getDatabase();
      const userRef = dbRef(db, `Users/${uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("Utilisateur trouvé :", userData); // Debugging
        this.user = {
          prenom: userData.Prenom || "",
          nom: userData.Nom || "",
          PhotoURL: userData.PhotoURL || defaultAvatar,
          id: uid
        };
      } else {
        console.log("Aucun utilisateur trouvé avec l'UID :", uid);
      }
    },
    async fetchAllUsers() {
      const db = getDatabase();
      const usersRef = dbRef(db, 'Users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const usersData = snapshot.val();
        this.users = Object.keys(usersData).map(key => ({
          id: key,
          ...usersData[key]
        }));
      } else {
        console.log("Aucun utilisateur trouvé.");
      }
    },
    goToProfile() {
      this.$router.push("/profile/" + this.user.id);
    },
    goToPfpHistory() {
      this.$router.push("/historique_pfp");
    },
    goToDocumentPFP() {
      this.$router.push("/documents_pfp");
    },
    async goToLogout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("Utilisateur déconnecté");
        this.$router.push("/"); // Redirection à la page d'accueil
      } catch (error) {
        console.error("Erreur de déconnexion:", error);
      }
    },
    openChat(user) {
      this.$router.push(`/chat?user=${encodeURIComponent(user.id)}`);
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("Utilisateur connecté :", authUser); // Debugging
        this.fetchUserProfile(authUser.uid);
        this.fetchAllUsers();
      } else {
        console.log("Aucun utilisateur connecté."); // Debugging
      }
    });
  },
};
</script>
<style scoped>
/* Styles généraux pour la sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Assure que la sidebar occupe toute la hauteur de la fenêtre */
  background: var(--surface-card);
  padding: 1rem;
}

/* Partie supérieure fixe */
.fixed-content {
  flex: 0 0 auto; /* Ne grandit pas */
  /* Optionnel : pour qu'elle reste bien visible lors du scroll, vous pouvez utiliser sticky */
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--surface-card);
  padding-bottom: 1rem;
}

/* Partie inférieure scrollable */
.scrollable-content {
  flex: 1 1 auto; /* Prend le reste de l'espace */
  overflow-y: auto;
  /* Masquer la scrollbar pour Chrome, Edge, Safari */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE et Edge Legacy */
}

.scrollable-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari et Opera */
}

/* Liens du profil */
.profile-link {
  text-decoration: none;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s ease;
}

.profile-link:hover {
  color: var(--primary-color);
}

/* Liens supplémentaires */
.profile-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-links li {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.profile-links li:hover {
  color: var(--primary-color);
  background-color: var(--surface-hover);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.link-icon {
  font-size: 1.25rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  color: var(--primary-color);
}

/* Styles supplémentaires pour UserCard, etc. peuvent rester inchangés */
</style>
