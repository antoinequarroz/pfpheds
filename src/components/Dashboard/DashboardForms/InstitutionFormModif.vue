<template>
  <Navbar />
  <div class="px-4 py-8 md:px-6 lg:px-8">
    <section class="text-center py-5 rounded-lg mb-5 text-white">
      <h1 class="text-5xl font-bold">Modifier l'institution</h1>
    </section>

    <div class="grid">
      <div class="col-12 lg:col-12">
        <div class="card p-4 shadow-lg">
          <h1 class="mb-4">{{ institution.Name }}</h1>
          <div class="flex align-items-center mb-4">
            <h2 class="me-3 mb-0">{{ institution.Locality }}</h2>
            <Badge :value="institution.Canton" class="p-mr-2 p-ml-auto" />
          </div>

          <div class="p-fluid grid">
            <!-- Nom -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="name">Nom</label>
                <InputText id="name" v-model="institution.Name" />
              </div>
            </div>

            <!-- Téléchargement du PDF pour Cyberlearn -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="cyberlearn">Descriptif FP (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  @change="onPdfChange"
                  class="p-button-outlined p-mt-2"
                />
                <p v-if="institution.CyberleanURL" class="mt-2">
                  PDF actuel :
                  <a :href="institution.CyberleanURL" target="_blank"
                  >Voir le PDF</a
                  >
                </p>
              </div>
            </div>

            <!-- Lieu -->
            <div class="col-12 md:col-4">
              <div class="p-field">
                <label for="locality">Lieu</label>
                <InputText id="locality" v-model="institution.Locality" />
              </div>
            </div>

            <!-- Canton -->
            <div class="col-12 md:col-4">
              <div class="p-field">
                <label for="canton">Canton</label>
                <Dropdown
                  id="canton"
                  v-model="institution.Canton"
                  :options="cantons"
                  optionLabel="name"
                  optionValue="code"
                  class="w-full"
                />
              </div>
            </div>

            <!-- Langue -->
            <div class="col-12 md:col-4">
              <div class="p-field">
                <label for="langue">Langue</label>
                <Dropdown
                  id="langue"
                  v-model="institution.Language"
                  :options="langues"
                  optionLabel="name"
                  optionValue="code"
                  class="w-full"
                />
              </div>
            </div>

            <!-- Rue -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="address">Adresse</label>
                <InputText id="address" v-model="institution.Address" />
              </div>
            </div>

            <!-- URL -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="url">URL</label>
                <InputGroup>
                  <InputGroupAddon>www</InputGroupAddon>
                  <InputText
                    id="url"
                    v-model="institution.URL"
                    placeholder="Site Web"
                  />
                </InputGroup>
              </div>
            </div>

            <!-- Catégorie -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="category">Catégorie</label>
                <InputText
                  id="category"
                  v-model="institution.Category"
                  class="w-full"
                />
              </div>
            </div>

            <!-- Téléchargement des images -->
            <div class="col-12">
              <h4>Médias de l'institution</h4>
              <Divider />
              <div class="text-center">
                <div class="border-2 border-dashed surface-border rounded-lg p-5 mb-3">
                  <i class="pi pi-image text-5xl"></i>
                  <h6 class="mt-2">
                    Téléchargez les images de l'institution ici, ou
                    <a href="#!" class="text-primary" @click="triggerImageInput"
                    >Parcourir</a
                    >
                  </h6>
                  <input
                    ref="imageInput"
                    type="file"
                    accept="image/*"
                    multiple
                    class="hidden"
                    @change="onImageChange"
                  />
                  <p class="mt-2">
                    Seulement JPG, JPEG et PNG. Dimensions suggérées: 600px *
                    450px.
                  </p>
                </div>
                <div v-if="institution.ImageURL.length" class="image-preview">
                  <div
                    v-for="(imageURL, index) in institution.ImageURL"
                    :key="index"
                    class="mb-4"
                  >
                    <img
                      :src="imageURL"
                      alt="Image de l'institution"
                      class="w-full h-auto mb-2"
                    />
                    <Button
                      type="button"
                      label="Supprimer l'image"
                      class="p-button-danger"
                      icon="pi pi-trash"
                      @click="removeImage(index)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="col-12 md:col-12">
              <div class="p-field">
                <label for="description">Description</label>
                <Textarea
                  id="description"
                  v-model="institution.Description"
                />
              </div>
            </div>

            <!-- Convention -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="convention">Date de Convention</label>
                <Calendar
                  id="convention"
                  v-model="institution.ConventionDate"
                  dateFormat="dd-mm-yy"
                />
              </div>
            </div>

            <!-- Accord Cadre -->
            <div class="col-12 md:col-6">
              <div class="p-field">
                <label for="accordCadre">Date de l'Accord Cadre</label>
                <Calendar
                  id="accordCadre"
                  v-model="institution.AccordCadreDate"
                  dateFormat="dd-mm-yy"
                />
              </div>
            </div>

            <!-- Remarque sur la convention / accord cadre -->
            <div class="col-12 md:col-12">
              <div class="p-field">
                <label for="note">Remarque convention / accord cadre</label>
                <Textarea id="note" v-model="institution.Note" />
              </div>
            </div>

            <!-- Informations du responsable physique -->
            <div class="field col-4">
              <label for="nomChef">Nom, Prénom resp phy</label>
              <InputText
                id="nomChef"
                v-model="institution.NomChef"
                class="w-full"
              />
            </div>
            <div class="field col-4">
              <label for="phoneChef">Téléphone resp phy</label>
              <InputText
                id="phoneChef"
                v-model="institution.PhoneChef"
                class="w-full"
              />
            </div>
            <div class="field col-4">
              <label for="mailChef">Mail resp phy</label>
              <InputText
                id="mailChef"
                v-model="institution.MailChef"
                class="w-full"
              />
            </div>

            <!-- Boutons de soumission -->
            <div class="col-12">
              <Button
                label="Mettre à jour l'institution"
                class="p-button-warning mt-3 btn-small"
                @click="updateInstitution"
              />
              <Button
                label="Retour"
                class="p-button-secondary mt-3 btn-small"
                @click="goBack"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage } from "../../../../firebase.js";
import { ref, onValue, update } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Badge from "primevue/badge";
import Calendar from "primevue/calendar";
import Textarea from "primevue/textarea";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Navbar from "@/components/Utils/Navbar.vue";
import Divider from "primevue/divider";

// --- Fonctions utilitaires pour parser/formatter la date dd-mm-yyyy ---
function parseDDMMYYYY(str) {
  // Evite les erreurs si str est vide
  if (!str) return null;
  const [dd, mm, yyyy] = str.split("-");
  // Crée l'objet Date (mois commence à 0)
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}

function formatDDMMYYYY(date) {
  if (!date) return "";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default {
  name: "InstitutionFormModif",
  components: {
    Navbar,
    InputText,
    Dropdown,
    Button,
    Badge,
    Calendar,
    Textarea,
    InputGroup,
    InputGroupAddon,
    Divider,
  },
  data() {
    return {
      institution: {
        CyberleanURL: "",
        Name: "",
        Locality: "",
        Canton: "",
        Address: "",
        URL: "",
        Category: "",
        Language: "",
        ImageURL: [],
        Description: "",
        ConventionDate: "",
        AccordCadreDate: "",
        Note: "",
        MailChef: "",
        PhoneChef: "",
        NomChef: "",
      },
      pdfFile: null, // Fichier PDF sélectionné
      imageFiles: [], // Tableau de fichiers images sélectionnés
      cantons: [
        { code: "AG", name: "Argovie" },
        { code: "AI", name: "Appenzell Rhodes-Intérieures" },
        { code: "AR", name: "Appenzell Rhodes-Extérieures" },
        { code: "BE", name: "Berne" },
        { code: "FR", name: "Fribourg" },
        { code: "VS", name: "Valais" },
        { code: "VD", name: "Vaud" },
        { code: "GE", name: "Genève" },
        { code: "ZH", name: "Zurich" },
        { code: "NE", name: "Neuchâtel" },
        { code: "JU", name: "Jura" },
        { code: "LU", name: "Lucerne" },
        { code: "ET", name: "Étranger" },
      ],
      categories: [
        { label: "Institution valaisanne", value: "Institution valaisanne" },
        { label: "Cabinet privé valaisan", value: "Cabinet privé valaisan" },
        { label: "Institution hors canton", value: "Institution hors canton" },
        { label: "Cabinet privé hors canton", value: "Cabinet privé hors canton" },
      ],
      langues: [
        { code: "FR", name: "Français" },
        { code: "ALL", name: "Allemand" },
        { code: "IT", name: "Italien" },
        { code: "ANG", name: "Anglais" },
        { code: "BIL", name: "Bilingue" },
      ],
    };
  },
  methods: {
    // Déclenche le sélecteur de fichier pour les images
    triggerImageInput() {
      this.$refs.imageInput.click();
    },

    // Met à jour l'institution dans Firebase
    async updateInstitution() {
      try {
        console.log("Starting institution update...");
        const instRef = ref(db, "Institutions/" + this.$route.params.id);

        // Gestion du téléchargement du PDF
        if (this.pdfFile) {
          console.log("Uploading PDF...");
          const pdfRef = storageRef(
            storage,
            `Institutions/${this.$route.params.id}/cyberlearn.pdf`
          );
          const pdfSnapshot = await uploadBytes(pdfRef, this.pdfFile);
          const pdfURL = await getDownloadURL(pdfSnapshot.ref);
          this.institution.CyberleanURL = pdfURL;
          console.log("PDF uploaded:", pdfURL);
        }

        // Gestion du téléchargement des images
        if (this.imageFiles.length > 0) {
          console.log("Uploading images...");
          const uploadPromises = this.imageFiles.map(async (file, index) => {
            const uniqueSuffix = Date.now() + "_" + index;
            const imageRef = storageRef(
              storage,
              `Institutions/${this.$route.params.id}/image_${uniqueSuffix}`
            );
            const imageSnapshot = await uploadBytes(imageRef, file);
            const imageURL = await getDownloadURL(imageSnapshot.ref);
            return imageURL;
          });

          const imageURL = await Promise.all(uploadPromises);
          this.institution.ImageURL = [
            ...(this.institution.ImageURL || []),
            ...imageURL,
          ];
        }

        // Prépare les dates pour le stockage en dd-mm-yyyy
        const conventionDateStr = formatDDMMYYYY(this.institution.ConventionDate);
        const accordCadreDateStr = formatDDMMYYYY(this.institution.AccordCadreDate);

        // Mise à jour des détails de l'institution dans Firebase
        await update(instRef, {
          Name: this.institution.Name || "",
          Locality: this.institution.Locality || "",
          Canton: this.institution.Canton || "",
          Address: this.institution.Address || "",
          URL: this.institution.URL || "",
          Category: this.institution.Category || "",
          Language: this.institution.Language || "",
          Description: this.institution.Description || "",
          ConventionDate: conventionDateStr,
          AccordCadreDate: accordCadreDateStr,
          Note: this.institution.Note || "",
          CyberleanURL: this.institution.CyberleanURL || "",
          ImageURL: this.institution.ImageURL || [],
          MailChef: this.institution.MailChef || "",
          PhoneChef: this.institution.PhoneChef || "",
          NomChef: this.institution.NomChef || "",
        });

        console.log("Institution updated successfully!");
        alert("Institution mise à jour avec succès.");
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        alert("Erreur lors de la mise à jour de l’institution.");
      }
    },

    // Récupération du PDF sélectionné
    onPdfChange(event) {
      this.pdfFile = event.target.files[0];
    },

    // Récupération des images sélectionnées
    onImageChange(event) {
      const files = Array.from(event.target.files);
      if (!this.localPreviews) {
        // On peut stocker les aperçus locaux ici si nécessaire
        this.localPreviews = [];
      }

      files.forEach((file) => {
        const safeName = file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
        const alreadyAdded = this.imageFiles.some(
          (f) => f.name === safeName && f.size === file.size
        );

        if (!alreadyAdded) {
          const newFile = new File([file], safeName, { type: file.type });
          this.imageFiles.push(newFile);

          // Génère un aperçu local (optionnel)
          const previewURL = URL.createObjectURL(newFile);
          this.localPreviews.push(previewURL);
        }
      });
    },

    // Suppression d'une image
    removeImage(index) {
      this.institution.ImageURL.splice(index, 1);
      // Si vous souhaitez aussi supprimer les fichiers locaux non uploadés,
      // vous pouvez le faire ici si vous gérez la correspondance index/fichier.
    },

    // Retour à la page précédente
    goBack() {
      this.$router.go(-1);
    },

    // Chargement des données de l'institution depuis Firebase
    loadInstitutionData() {
      const instRef = ref(db, "Institutions/" + this.$route.params.id);
      onValue(instRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convertir les chaînes dd-mm-yyyy en objets Date
          if (data.ConventionDate) {
            data.ConventionDate = parseDDMMYYYY(data.ConventionDate);
          }
          if (data.AccordCadreDate) {
            data.AccordCadreDate = parseDDMMYYYY(data.AccordCadreDate);
          }

          this.institution = {
            ...data,
            ImageURL: data.ImageURL || [],
          };
        }
      });
    },
  },
  mounted() {
    this.loadInstitutionData();
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

.image-preview img {
  max-width: 30%;
  height: auto;
  border-radius: 8px;
}

.btn-small {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
}
</style>
