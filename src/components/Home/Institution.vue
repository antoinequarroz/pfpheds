<template>
  <Navbar />
  <section class=" px-4 py-8 md:px-6 lg:px-8">
    <div class="container flex">
      <!-- Colonne pour les cartes -->
      <div class="flex-grow">
        <h1 class="text-900 font-bold text-5xl text-center">Institutions</h1>
        <p class="text-600 font-normal text-xl text-center">Découvrez les institutions partenaires de notre réseau</p>

        <!-- Barre de recherche, alignée à droite -->
        <div class="flex justify-end my-4">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <InputText v-model="searchTerm" placeholder="Rechercher par nom" style="width: 300px;" />
          </span>
        </div>

        <div class="grid flex justify-center">
          <!-- Boucle sur les institutions filtrées et paginées -->
          <div class="col-12 md:col-6 xl:col-3 p-3 flex justify-center" v-for="(institution, index) in paginatedFilteredInstitutions" :key="institution.InstitutionId">
            <Card class="institution-card surface-card " style="width: 20rem; height: 100%;">
              <template #header>
                <div style="position: relative;">
                  <!-- Image de l'institution avec URL par défaut si absente -->
                  <img :src="institution.ImageURL || '/default-image.jpg'" alt="institution" class="card-image" />
                  <!-- Affichage du canton sous forme de tag -->
                  <Tag style="position: absolute; top: 20px; left: 20px;">{{ institution.Canton }}</Tag>
                </div>
                <!-- Nom de l'institution -->
                <p ref="institutionName" class="text-center text-xl text-900 font-bold m-1 mt-1">{{ institution.Name }}</p>
              </template>
              <template #subtitle>
                <div class="text-center">
                  <!-- Localité et langue -->
                  <p>{{ institution.Locality }} <Tag severity="secondary">{{ institution.Language }}</Tag></p>
                  <!-- Description avec une limite de caractères -->
                  <p :class="descriptionClass" class="m-0">{{ truncateText(institution.Description, 100) }}</p>
                </div>
              </template>
              <template #content>
                <div class="button-container">
                  <!-- Bouton vers les détails de l'institution -->
                  <Button @click="goToDetails(institution.InstitutionId)" label="Détails" icon="pi pi-info-circle" outlined />
                  <!-- Lien vers le site web de l'institution -->
                  <a :href="institution.URL || '#'" target="_blank" class="p-button p-component" rel="noopener noreferrer">
                    <span class="p-button-icon pi pi-external-link"></span>
                    <span class="p-button-label ml-2">Site web</span>
                  </a>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <!-- Pagination des institutions -->
        <Paginator :rows="itemsPerPage" :totalRecords="totalFilteredInstitutions" :rowsPerPageOptions="[12, 24, 36, 48, 60, 72, 84]" @page="onPageChange"></Paginator>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script>
import { db } from '../../../firebase.js';
import { ref as dbRef, onValue } from "firebase/database";
import AppDarkAndLightMode from '@/layout/AppDarkAndLightMode.vue';
import Navbar from '@/components/Utils/Navbar.vue';
import InputText from 'primevue/inputtext'; // Assurez-vous d'importer InputText pour la barre de recherche

export default {
  components: { Navbar, AppDarkAndLightMode, InputText },
  data() {
    return {
      allInstitutions: [],  // Toutes les institutions récupérées depuis Firebase
      institutionDetailsPath: '/Institution/',
      currentPage: 1,  // Page courante pour la pagination
      itemsPerPage: 12,  // Nombre d'institutions par page
      totalInstitutions: 0,  // Total des institutions récupérées
      descriptionClass: 'description',  // Classe par défaut pour la description
      searchTerm: '',  // Terme de recherche pour filtrer par nom
    };
  },
  computed: {
    // Filtrer les institutions en fonction de la recherche
    filteredInstitutions() {
      if (!this.searchTerm) {
        return this.allInstitutions;  // Pas de filtre si la barre de recherche est vide
      }
      return this.allInstitutions.filter(institution =>
        institution.Name && institution.Name.toLowerCase().includes(this.searchTerm.toLowerCase())  // Filtrer par nom de l'institution
      );
    },
    // Institutions affichées sur la page courante après filtrage
    paginatedFilteredInstitutions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredInstitutions.slice(start, end);
    },
    // Nombre total d'institutions filtrées
    totalFilteredInstitutions() {
      return this.filteredInstitutions.length;
    },
  },
  methods: {
    // Fonction pour tronquer un texte à une certaine longueur
    truncateText(text, length) {
      if (text && text.length > length) {
        return text.substring(0, length) + '...';
      }
      return text;
    },
    // Récupération des institutions depuis Firebase
    fetchInstitutionsFromFirebase() {
      const institutionsRef = dbRef(db, 'Institutions/');
      onValue(institutionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.allInstitutions = Object.keys(data).map(key => ({
            InstitutionId: key,  // Clé de chaque institution
            ...data[key],  // Fusionne les données de l'institution
            ImageURL: data[key].ImageURL || '/default-image.jpg',  // Image par défaut si absente
            Description: data[key].Description || 'Pas de description disponible',  // Description par défaut si absente
          }));
          this.totalInstitutions = this.allInstitutions.length;  // Met à jour le nombre total d'institutions
          this.$nextTick(() => {
            this.adjustDescriptionHeight();
          });
        } else {
          this.allInstitutions = [];  // Aucun résultat trouvé
          this.totalInstitutions = 0;  // Réinitialise le nombre total d'institutions
        }
      });
    },
    // Ajustement de la hauteur de la description pour une apparence cohérente
    adjustDescriptionHeight() {
      const nameElements = this.$refs.institutionName;
      if (nameElements && Array.isArray(nameElements)) {
        nameElements.forEach((nameElement) => {
          const lineHeight = parseInt(getComputedStyle(nameElement).lineHeight, 10);
          const nameHeight = nameElement.clientHeight;

          if (nameHeight > lineHeight * 2) {
            this.descriptionClass = 'description-two-lines';
          } else {
            this.descriptionClass = 'description';
          }
        });
      }
    },
    // Changement de page dans la pagination
    onPageChange(event) {
      this.currentPage = event.page + 1;  // Met à jour la page courante
      this.itemsPerPage = event.rows;  // Met à jour le nombre d'éléments par page
    },
    // Redirection vers la page de détails d'une institution
    goToDetails(id) {
      if (id) {
        this.$router.push({ name: 'InstitutionView', params: { id: id } });
      } else {
        console.error("L'ID est indéfini pour cette institution.");
      }
    },
  },
  mounted() {
    // Appel de la fonction pour récupérer les données lors du montage du composant
    this.fetchInstitutionsFromFirebase();
  }
}
</script>

<style scoped>
.card-image {
  width: 100%;
  height: 15rem;
  object-fit: cover;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Afficher seulement trois lignes */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: calc(3 * 1.5em); /* Ajuster la hauteur pour trois lignes */
}

.description-two-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Afficher seulement deux lignes */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: calc(2 * 1.5em); /* Ajuster la hauteur pour deux lignes */
}

.institution-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.button-container {
  margin-top: auto; /* Pousser les boutons en bas */
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

@media (min-width: 992px) {
  .container {
    display: flex;
    justify-content: center;
  }

  .grid {
    justify-content: center;
  }
}
</style>
