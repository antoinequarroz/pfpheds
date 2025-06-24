<template>
  <div class="algo-component scroll-table-container">
    <h2>Résultats en temps réel – Analyse VotationBA23PFP3</h2>
    <div v-if="loading">Chargement des résultats...</div>
    <div v-else-if="error">Erreur : {{ error }}</div>
    <div v-else>
      <div class="students-count">
        <strong>Nombre total d'étudiants ayant voté :</strong> {{ asArray.length }}
      </div>
      <!-- Sous-section : Total des votes pour chaque place -->

<!-- Sous-section : Places avec zéro vote -->
<div class="places-zero-vote" v-if="placesWithZeroVote.length">
  <h3>Places avec zéro vote</h3>
  <table class="results-table">
    <thead>
      <tr>
        <th>Institution</th>
        <th>Nom du lieu</th>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="place in placesWithZeroVote" :key="place.placeId">
        <td>{{ place.placeId }}</td>
        <td>{{ place.placeName }}</td>
        <td>{{ place.placeId }}</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="places-summary-total" v-if="placesStatsTotalSorted.length">
  <h3>Classement des places par total de votes (toutes positions confondues)</h3>
  <table class="results-table">
    <thead>
      <tr>
        <th>Institution</th>
        <th>Nom du lieu</th>
        <th>ID</th>
        <th>Total de votes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="place in placesStatsTotalSorted" :key="place.placeId">
        <td>{{ place.InstitutionName }}</td>
        <td>{{ place.placeName }}</td>
        <td>{{ place.placeId }}</td>
        <td>{{ place.count }}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Sous-section : Classement des places par position -->
      <div class="places-summary-by-position">
        <h3>Classement des places par position</h3>
        <div v-for="pos in 5" :key="pos" class="place-position-group">
          <h4>Position {{ pos }}</h4>
          <table class="results-table">
            <thead>
              <tr>
                <th>Institution</th>
                <th>Nom du lieu</th>
                <th>ID</th>
                <th>Nombre de personnes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="place in placesStatsByPositionSorted[pos]" :key="place.placeId">
                <td>{{ place.InstitutionName }}</td>
                <td>{{ place.placeName }}</td>
                <td>{{ place.placeId }}</td>
                <td>{{ place.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <template v-if="asArray && asArray.length">
        <div class="table-scroll">
          <table class="results-table">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Institution</th>
                <th>Vote 1</th>
                <th>Vote 2</th>
                <th>Vote 3</th>
                <th>Vote 4</th>
                <th>Vote 5</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in asArray" :key="i">
                <td>{{ getPrenom(row.studentId) }}</td>
                <td>{{ getNom(row.studentId) }}</td>
                <td>
                  <template v-if="row.votes && row.votes[0]">
                    <span v-if="placesCache[row.votes[0].placeId] && institutionNames[placesCache[row.votes[0].placeId]?.InstitutionId]">
                      {{ institutionNames[placesCache[row.votes[0].placeId]?.InstitutionId] }}
                    </span>
                    <span v-else>
                      <AsyncInstitutionName :place-id="row.votes[0].placeId" />
                    </span>
                  </template>
                </td>
                <td v-for="n in 5" :key="n">
                  <template v-if="row.votes && row.votes[n-1]">
                    {{ row.votes[n-1].InstitutionName }}<br />
                    {{ row.votes[n-1].placeName }} - {{ row.votes[n-1].placeId }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Tableau des places visibles pour les étudiants (logique VotationView.vue) -->
      <div class="all-places-table" v-if="expandedPFP3Data && expandedPFP3Data.length">
        <h3>Places visibles et accessibles pour les étudiants</h3>
        <table class="results-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Institution</th>
              <th>Nom Institution</th>
              <th>ID</th>
              <th>Catégorie</th>
              <th>Siège</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(place, idx) in expandedPFP3Data" :key="place.placeId + '-' + place.seatIndex">
              <td>{{ idx + 1 }}</td>
              <td>{{ place.NomPlace || place.placeName || 'Non spécifié' }}</td>
              <td>{{ place.placeId }}</td>
              <td><AsyncInstitutionName :IDPlace="place.IDPlace" /></td>
              <td>{{ place.InstitutionCategory || place.category || '' }}</td>
              <td>{{ place.seatIndex }}</td>
            </tr>
          </tbody>  
        </table>
      </div>
      <template v-else>
        <pre>{{ results }}</pre>
      </template>
    </div>
  </div>
  <div><br><br><br>
    fieldsfds
    fields
  </div>
</template>

<style scoped>
.scroll-table-container {
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: thin;
  -ms-overflow-style: auto;
}
.scroll-table-container::-webkit-scrollbar {
  width: 8px;
  background: #f5f5f5;
}
.scroll-table-container::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 4px;
}
</style>


<script setup>
import { computed } from 'vue'
import { defineComponent, h, } from 'vue'

import { ref as vueRef, onMounted, onUnmounted } from 'vue'
// Firestore v9 modular
// --- Realtime Database ---
import { getDatabase, ref as dbRef, onValue, off } from 'firebase/database'
// ou: import { database } from '@/firebase' si tu exportes la db directement

// Importer les données utilisateurs (adapter le chemin si besoin)
import usersData from '/Users/berthod/Desktop/PFPHEdS/users.json'

// Firebase imports
import { getApp } from 'firebase/app'

// Cache des noms d'institutions
const institutionNames = vueRef({})
// Cache des places
const placesCache = vueRef({})

// Fonction pour récupérer les données d'une place à partir de son ID
async function fetchPlaceData(placeId) {
  if (!placeId) return {};
  if (placesCache.value[placeId]) return placesCache.value[placeId];
  const db = getDatabase(getApp());
  const placeRef = dbRef(db, `Places/${placeId}`);
  return new Promise((resolve) => {
    onValue(placeRef, (snapshot) => {
      const place = snapshot.val() || {};
      placesCache.value = { ...placesCache.value, [placeId]: place };
      resolve(place);
    }, { onlyOnce: true });
  });
}

async function getNameInstitutionById(institutionId) {
    console.log("yainstitutionId " + institutionId);
      const institutionData =  fetchInstitutionData(institutionId);
      console.log("yaax");
      console.log("yaax"+ institutionData);
      return institutionData.Name || institutionId;
    }

function fetchInstitutionData(institutionId) {
  if (!institutionId) return Promise.resolve({});
  const institutionRef = ref(db, `Institutions/${institutionId}`);
  return new Promise((resolve) => {
    onValue(institutionRef, (snapshot) => {
      resolve(snapshot.val() || {});
    }, { onlyOnce: true });
  });
}



// Précharger les noms des institutions pour les votes affichés (pour éviter le clignotement)
onMounted(async () => {
  if (asArray.value.length) {
    const ids = new Set();
    asArray.value.forEach(row => {
      if (row.votes) {
        row.votes.forEach(v => {
          if (v && v.placeId) ids.add(v.placeId);
        });
      }
    });
    for (const id of ids) {
      await fetchPlaceData(id);
    }
  }
});

const results = vueRef(null)
const loading = vueRef(true)
const error = vueRef(null)

// Fonctions pour croiser les noms/prénoms
function getPrenom(studentId) {
  return usersData[studentId]?.Prenom || ''
}
function getNom(studentId) {
  return usersData[studentId]?.Nom || ''
}

// Pour transformer le JSON en tableau
const asArray = computed(() => {
  if (!results.value) return []
  // Si c'est déjà un tableau
  if (Array.isArray(results.value)) return results.value
  // Si c'est un objet indexé (ex : {id1: {...}, id2: {...}})
  if (typeof results.value === 'object') {
    return Object.keys(results.value).map(key => {
      return { id: key, ...results.value[key] }
    })
  }
  return []
})
const columns = computed(() => {
  if (!asArray.value.length) return []
  return Object.keys(asArray.value[0])
})

let dbListener = null



const allPlacesRaw = vueRef([])

// Génère la liste des places "étendues" (chaque siège libre) comme dans VotationView.vue
const expandedPFP3Data = computed(() => {
  const rows = []
  // Tri par nom de place pour cohérence UI
  const sorted = allPlacesRaw.value.slice().sort((a, b) => {
    const na = a.NomPlace || a.placeName || ''
    const nb = b.NomPlace || b.placeName || ''
    return na.localeCompare(nb)
  })
  sorted.forEach(place => {
    const count = parseInt(place.PFP3 || '0')
    if (!isNaN(count) && count >= 1) {
      for (let i = 1; i <= count; i++) {
        const studentKey = `selectedEtudiantBA23PFP3-${i}`
        const alreadySelected =
          (i === 1 && place.selectedEtudiant && place.selectedEtudiant.trim() !== "") ||
          (place[studentKey] && place[studentKey].trim() !== "")
        if (!alreadySelected) {
          const dynamicKey = `selectedActiveBA23PFP3-${i}`
          rows.push({
            ...place,
            seatIndex: i,
            [dynamicKey]: place[dynamicKey] !== undefined ? place[dynamicKey] : false
          })
        }
      }
    }
  })
  return rows
})

const AsyncInstitutionName = defineComponent({
  props: { IDPlace: String },
  async setup(props) {
    const name = vueRef('Chargement...')
    if (props.IDPlace) {
      name.value = await getNameInstitutionById(props.IDPlace)
    }
    return () => h('span', name.value)
  }
})

// Récupération de toutes les places Firebase (toutes, pas par siège)
function fetchAllPlacesRaw() {
  const db = getDatabase(getApp())
  const placesRef = dbRef(db, 'Places')
  onValue(placesRef, (snapshot) => {
    const placesData = snapshot.val() || {}
    const rows = []
    Object.keys(placesData).forEach(key => {
      const place = placesData[key]
      rows.push({
        ...place,
        placeId: key
      })
    })
    allPlacesRaw.value = rows
  })
}
fetchAllPlacesRaw()

// Places avec zéro vote = toutes les places du nœud 'Places' qui n'ont reçu aucun vote
const placesWithZeroVote = computed(() => {
  const votedIds = new Set(placesStatsTotal.value.map(p => p.placeId))
  return allPlacesRaw.value.filter(p => !votedIds.has(p.placeId))
})


// Sous-section : calcul du total de votes pour chaque place (toutes positions confondues)
const placesStatsTotal = computed(() => {
  const stats = {}
  asArray.value.forEach(row => {
    if (row.votes && Array.isArray(row.votes)) {
      row.votes.forEach(vote => {
        if (!vote || !vote.placeId) return
        const key = vote.placeId
        if (!stats[key]) {
          stats[key] = {
            InstitutionName: vote.InstitutionName,
            placeName: vote.placeName,
            placeId: vote.placeId,
            count: 0
          }
        }
        stats[key].count++
      })
    }
  })
  return Object.values(stats)
})
const placesStatsTotalSorted = computed(() => {
  return [...placesStatsTotal.value].sort((a, b) => a.count - b.count)
})

// Sous-section : calcul des stats par place et par position
const placesStatsByPosition = computed(() => {
  // pos: 1, 2, 3, 4, 5
  const stats = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {} }
  asArray.value.forEach(row => {
    if (row.votes && Array.isArray(row.votes)) {
      row.votes.forEach((vote, idx) => {
        if (!vote || !vote.placeId) return
        const pos = idx + 1
        if (!stats[pos][vote.placeId]) {
          stats[pos][vote.placeId] = {
            InstitutionName: vote.InstitutionName,
            placeName: vote.placeName,
            placeId: vote.placeId,
            count: 0
          }
        }
        stats[pos][vote.placeId].count++
      })
    }
  })
  // Pour chaque position, retourne un tableau de places
  const result = {}
  for (let pos = 1; pos <= 5; pos++) {
    result[pos] = Object.values(stats[pos])
  }
  return result
})
const placesStatsByPositionSorted = computed(() => {
  const sorted = {}
  for (let pos = 1; pos <= 5; pos++) {
    sorted[pos] = [...(placesStatsByPosition.value[pos] || [])].sort((a, b) => a.count - b.count)
  }
  return sorted
})

onMounted(() => {
  try {
    // Option 1 : via getApp() et getDatabase()
    const app = getApp()
    const db = getDatabase(app)
    // Option 2 : si tu as 'import { database } from ...'
    // const db = database
    const votationRef = dbRef(db, 'VotationBA23PFP3')
    dbListener = onValue(votationRef, (snapshot) => {
      results.value = snapshot.val()
      loading.value = false
    }, (err) => {
      error.value = err.message
      loading.value = false
    })
  } catch (e) {
    error.value = e.message
    loading.value = false
  }
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})
</script>

<style scoped>
.algo-component {
  padding: 2rem;
  overflow: auto;
  height: 100vh;
}
.table-scroll {
  max-width: 100%;
  overflow-x: auto;
}
.results-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}
.results-table th, .results-table td {
  border: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  text-align: center;
}
.results-table th {
  background: #f9fafb;
  font-weight: bold;
}
pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 6px;
}
</style>
