<template>
  <div class="sidebar card">
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
        <li @click="goToPfpHistory">
          <i class="pi pi-images link-icon"></i>
          <span>Historique des PFP</span>
        </li>
        <li @click="goToDocumentPFP">
          <i class="pi pi-file link-icon"></i>
          <span>Documents PFP</span>
        </li>
      </ul>
    </div>

    <hr />

    <!-- Messagerie -->
    <h4>Messagerie</h4>
    <UserCard user="user" />

    <!-- Messagerie

    <ul class="messaging-list">
      <li
        v-for="(contact, index) in contacts"
        :key="index"
        class="message-item"
        @click="openChat(contact.name)"
      >
        <Avatar
          :label="contact.initials"
          class="mr-2"
          size="large"
        />
        <div class="contact-info">
          <span class="contact-name">{{ contact.name }}</span>
          <p class="last-message">{{ contact.lastMessage }}</p>
        </div>
      </li>
    </ul>
    -->
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
      },
      contacts: [
        {
          name: "Antoine Quarroz",
          initials: "A",
          lastMessage: "Salut, tu as vu mon dernier message?",
        },
        {
          name: "Loic Berthod",
          initials: "L",
          lastMessage: "On se retrouve à 15h pour le projet.",
        },
        {
          name: "Marie Dupont",
          initials: "M",
          lastMessage: "Merci pour les infos, à bientôt !",
        },
      ],
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
        };
      } else {
        console.log("Aucun utilisateur trouvé avec l'UID :", uid);
      }
    },
    goToProfile() {
      this.$router.push("/profile/' + user.uid");
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
    openChat(name) {
      this.$router.push(`/chat?user=${encodeURIComponent(name)}`);
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        console.log("Utilisateur connecté :", authUser); // Debugging
        this.fetchUserProfile(authUser.uid);
      } else {
        console.log("Aucun utilisateur connecté."); // Debugging
      }
    });
  },
};
</script>

<style scoped>
/* Styles de la sidebar gauche */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--surface-card);
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

/* Liste des contacts */
.messaging-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.message-item:hover {
  background-color: var(--surface-hover);
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-name {
  font-weight: bold;
  color: var(--text-color);
}

.last-message {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}
</style>
