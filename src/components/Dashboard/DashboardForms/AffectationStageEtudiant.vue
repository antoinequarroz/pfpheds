<template>
  <Navbar />
  <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
    <section class="text-white text-center py-5 rounded-lg">
      <h1 class="text-4xl font-bold mb-4">Affecter un stage à un étudiant</h1>
    </section>
    <section class="mt-5">
      <div class="card p-4 max-w-2xl mx-auto">
        <form @submit.prevent="affecterStage">
          <div class="field mb-4">
            <label for="etudiant" class="block mb-2">Étudiant</label>
            <Dropdown id="etudiant" v-model="selectedEtudiant" :options="etudiantsOptions" optionLabel="nom" optionValue="id" class="w-full" placeholder="Sélectionnez un étudiant" filter filterPlaceholder="Rechercher un étudiant..."/>
          </div>
          <div class="field mb-4">
            <label for="stage" class="block mb-2">Stage(s)</label>
            <MultiSelect id="stage" v-model="selectedStages" :options="stagesOptions" optionLabel="titre" optionValue="id" class="w-full" placeholder="Sélectionnez un ou plusieurs stages" filter filterPlaceholder="Rechercher un stage..."/>
          </div>
          <div class="flex justify-content-end">
            <Button type="submit" label="Affecter" class="p-button-success" :disabled="!selectedEtudiant || selectedStages.length === 0" />
          </div>
        </form>
        <Divider class="my-5" />
        <div class="mb-4">
          <h3 class="mb-2">Ajouter un étudiant</h3>
          <div class="flex gap-2 mb-2">
            <InputText v-model="newEtudiant.nom" placeholder="Nom" />
            <InputText v-model="newEtudiant.prenom" placeholder="Prénom" />
            <InputText v-model="newEtudiant.id" placeholder="ID unique" />
            <Button label="Ajouter" class="p-button-sm p-button-info" @click="ajouterEtudiant" />
          </div>
        </div>
        <div class="mb-4">
          <h3 class="mb-2">Ajouter une place de stage</h3>
          <div class="flex gap-2 mb-2">
            <InputText v-model="newStage.titre" placeholder="Titre du stage" />
            <InputText v-model="newStage.id" placeholder="ID unique" />
            <Button label="Ajouter" class="p-button-sm p-button-info" @click="ajouterStage" />
          </div>
        </div>
        <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Utils/Navbar.vue';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { db } from '../../../../firebase.js';
import { ref, onValue, update } from "firebase/database";

export default {
  name: 'AffectationStageEtudiant',
  components: { Navbar, Dropdown, MultiSelect, Button, Divider, InputText },
  data() {
    return {
      etudiantsOptions: [], // [{ id, nom }]
      stagesOptions: [],    // [{ id, titre }]
      selectedEtudiant: null,
      selectedStages: [],
      message: '',
      newEtudiant: { nom: '', prenom: '', id: '' },
      newStage: { titre: '', id: '' },
    };
  },
  mounted() {
    // Charger les étudiants (IDs)
    onValue(ref(db, 'Students'), (snapshot) => {
      const studentsData = snapshot.val() || {};
      // Charger les noms/prénoms depuis Users
      onValue(ref(db, 'Users'), (usersSnap) => {
        const usersData = usersSnap.val() || {};
        this.etudiantsOptions = Object.entries(studentsData).map(([id, val]) => {
          const user = usersData[id];
          let label = id;
          if (user && user.Nom && user.Prenom) label = user.Nom + ' ' + user.Prenom;
          else if (user && user.Nom) label = user.Nom;
          else if (user && user.Prenom) label = user.Prenom;
          return { id, nom: label };
        });
      });
    });
    // Charger les places de stage avec infos d'institution
    onValue(ref(db, 'Places'), (snapshot) => {
      const placesData = snapshot.val() || {};
      onValue(ref(db, 'Institutions'), (institSnap) => {
        const institutionsData = institSnap.val() || {};
        this.stagesOptions = Object.entries(placesData).map(([id, val]) => {
          // Affiche : institution.Name – domaine – NomPlace | Critères validés : ...
          let institutionId = val.InstitutionId || val.IDInstitution || '';
          let institution = institutionsData[institutionId] || {};
          let institutionName = institution.Name || '';
          let domaine = institution.Category || '';
          let nomPlace = val.NomPlace || '';
          // Critères validés
          const criteriaKeys = ['MSQ','NEUROGER','REHAB','AMBU','FR','AIGU','DE','SYSINT'];
          let validCriteria = criteriaKeys.filter(k => val[k] === true || (typeof val[k] === 'string' && val[k].toLowerCase() === 'true'));
          let label = institutionName;
          if (domaine) label += ' – ' + domaine;
          if (nomPlace) label += ' – ' + nomPlace;
          if (validCriteria.length) label += ' | Critères validés : ' + validCriteria.join(', ');
          return { id, titre: label, institutionName, domaine };
        });
      });
    });
  },
  methods: {
    async affecterStage() {
      if (!this.selectedEtudiant || this.selectedStages.length === 0) return;
      try {
        // Place juste le nom et l'id dans PFP_2
        const pfp2 = [];
        for (const stageId of this.selectedStages) {
          const place = this.stagesOptions.find(opt => opt.id === stageId);
          if (!place) continue;
          pfp2.push({
            id: stageId,
            nom: place.titre || ''
          });
        }
        await update(ref(db, `Students/${this.selectedEtudiant}`), { PFP_2: pfp2 });
        this.message = "Stage(s) affecté(s) avec succès !";
      } catch (e) {
        this.message = "Erreur lors de l'affectation.";
      }
    },
    async ajouterEtudiant() {
      if (!this.newEtudiant.nom || !this.newEtudiant.prenom || !this.newEtudiant.id) return;
      await update(ref(db, `Students/${this.newEtudiant.id}`), { Nom: this.newEtudiant.nom, Prenom: this.newEtudiant.prenom });
      this.newEtudiant = { nom: '', prenom: '', id: '' };
    },
    async ajouterStage() {
      if (!this.newStage.titre || !this.newStage.id) return;
      await update(ref(db, `Places/${this.newStage.id}`), { Titre: this.newStage.titre });
      this.newStage = { titre: '', id: '' };
    }
  }
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
</style>
