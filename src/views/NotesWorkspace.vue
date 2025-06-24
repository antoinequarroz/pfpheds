<template>
  <div>
    <Navbar />
    <!-- Dialog création classeur -->
    <Dialog v-model:visible="showNotebookDialog" header="Nouveau classeur" :modal="true" :closable="false">
      <div class="p-fluid">
        <InputText v-model="newNotebookName" placeholder="Nom du classeur" />
      </div>
      <template #footer>
        <Button label="Annuler" class="p-button-text" @click="showNotebookDialog = false" />
        <Button label="Créer" icon="pi pi-check" @click="addNotebook" :disabled="!newNotebookName.trim()" />
      </template>
    </Dialog>
    <!-- Dialog renommage classeur -->
    <Dialog v-model:visible="showEditNotebookDialog" header="Renommer le classeur" :modal="true" :closable="false">
      <div class="p-fluid">
        <InputText v-model="editNotebookName" placeholder="Nouveau nom du classeur" />
      </div>
      <template #footer>
        <Button label="Annuler" class="p-button-text" @click="showEditNotebookDialog = false" />
        <Button label="Renommer" icon="pi pi-check" @click="renameNotebook" :disabled="!editNotebookName.trim()" />
      </template>
    </Dialog>
    <!-- Dialog suppression classeur -->
    <Dialog v-model:visible="showDeleteNotebookDialog" header="Supprimer le classeur" :modal="true" :closable="false">
      <div class="p-mb-3">Confirmer la suppression du classeur <b>{{ notebookToDelete?.name }}</b> ?</div>
      <template #footer>
        <Button label="Annuler" class="p-button-text" @click="showDeleteNotebookDialog = false" />
        <Button label="Supprimer" icon="pi pi-trash" severity="danger" @click="deleteNotebookConfirm" />
      </template>
    </Dialog>
    <!-- Dialog création feuille -->
    <Dialog v-model:visible="showPageDialog" header="Nouvelle feuille" :modal="true" :closable="false">
      <div class="p-fluid">
        <InputText v-model="newPageTitle" placeholder="Titre de la feuille" />
      </div>
      <template #footer>
        <Button label="Annuler" class="p-button-text" @click="showPageDialog = false" />
        <Button label="Créer" icon="pi pi-check" @click="addPage" :disabled="!newPageTitle.trim()" />
      </template>
    </Dialog>
    <!-- Dialog renommage feuille -->
    <Dialog v-model:visible="showEditPageDialog" header="Renommer la feuille" :modal="true" :closable="false">
      <div class="p-fluid">
        <InputText v-model="editPageTitle" placeholder="Nouveau titre de la feuille" />
      </div>
      <template #footer>
        <Button label="Annuler" class="p-button-text" @click="showEditPageDialog = false" />
        <Button label="Renommer" icon="pi pi-check" @click="renamePage" :disabled="!editPageTitle.trim()" />
      </template>
    </Dialog>
    <!-- Dialog suppression feuille -->
    <Dialog v-model:visible="showDeletePageDialog" header="Supprimer la feuille" :modal="true" :closable="false">
      <div class="p-mb-3">Confirmer la suppression de la feuille <b>{{ pageToDelete?.title }}</b> ?</div>
      <template #footer>
        <Button label="Annuler" class="p-button-text" @click="showDeletePageDialog = false" />
        <Button label="Supprimer" icon="pi pi-trash" severity="danger" @click="deletePageConfirm" />
      </template>
    </Dialog>
    <div class="notes-workspace">
      <NotebookSidebar
        :notebooks="notebooks"
        @select="selectNotebook"
        @create-notebook="showNotebookDialog = true"
        @edit-notebook="openEditNotebook"
        @delete-notebook="openDeleteNotebook"
      />
      <PageList
        v-if="selectedNotebook"
        :pages="pages"
        @select="selectPage"
        @create-page="showPageDialog = true"
        @edit-page="openEditPage"
        @delete-page="openDeletePage"
      />
      <NoteEditor
        v-if="selectedPage"
        :page="selectedPage"
        @save="savePage"
      />
      <div v-else-if="selectedNotebook" class="empty-editor">Sélectionne ou crée une feuille</div>
      <div v-else class="empty-editor">Sélectionne ou crée un classeur</div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Utils/Navbar.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NotebookSidebar from '../components/Notes/NotebookSidebar.vue'
import PageList from '../components/Notes/PageList.vue'
import NoteEditor from '../components/Notes/NoteEditor.vue'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import * as notesService from '../service/notesService.js'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const notebooks = ref([])
const pages = ref([])
const selectedNotebook = ref(null)
const selectedPage = ref(null)

// Dialogs
const showNotebookDialog = ref(false)
const newNotebookName = ref('')
const showEditNotebookDialog = ref(false)
const editNotebookName = ref('')
let notebookToEdit = null
const showDeleteNotebookDialog = ref(false)
let notebookToDelete = null
const showPageDialog = ref(false)
const newPageTitle = ref('')
const showEditPageDialog = ref(false)
const editPageTitle = ref('')
let pageToEdit = null
const showDeletePageDialog = ref(false)
let pageToDelete = null

let notebooksUnsubscribe = null

onMounted(() => {
  // Temps réel notebooks
  try {
    notebooksUnsubscribe = notesService.onNotebooksChange(async (nbs) => {
      notebooks.value = nbs
      // Si plus de notebooks, auto-select
      if (notebooks.value.length > 0) {
        // Si le notebook sélectionné n'existe plus, sélectionne le premier
        let found = notebooks.value.find(n => selectedNotebook.value && n.id === selectedNotebook.value.id)
        if (!found) found = notebooks.value[0]
        if (found) selectNotebook(found)
      } else {
        selectedNotebook.value = null
        pages.value = []
        selectedPage.value = null
      }
    })
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur de chargement des notes', life: 4000 })
  }
})

onBeforeUnmount(() => {
  if (notebooksUnsubscribe) notebooksUnsubscribe()
})

async function loadPages(notebookId) {
  try {
    pages.value = await notesService.fetchPages(notebookId)
  } catch (e) {
    pages.value = []
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur de chargement des feuilles', life: 4000 })
  }
}

function selectNotebook(notebook) {
  selectedNotebook.value = notebook
  selectedPage.value = null
  loadPages(notebook.id)
}

function selectPage(page) {
  selectedPage.value = page
}

// CRUD notebooks
async function addNotebook() {
  if (!newNotebookName.value.trim()) return
  try {
    const id = await notesService.addNotebook(newNotebookName.value.trim())
    toast.add({ severity: 'success', summary: 'Classeur créé', life: 2000 })
    newNotebookName.value = ''
    showNotebookDialog.value = false
    // La synchro temps réel va rafraîchir la liste
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible d'ajouter le classeur", life: 4000 })
  }
}

function openEditNotebook(notebook) {
  notebookToEdit = notebook
  editNotebookName.value = notebook.name
  showEditNotebookDialog.value = true
}
async function renameNotebook() {
  if (notebookToEdit && editNotebookName.value.trim()) {
    try {
      await notesService.renameNotebook(notebookToEdit.id, editNotebookName.value.trim())
      toast.add({ severity: 'success', summary: 'Classeur renommé', life: 2000 })
    } catch (e) {
      toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible de renommer le classeur", life: 4000 })
    }
  }
  showEditNotebookDialog.value = false
}
function openDeleteNotebook(notebook) {
  notebookToDelete = notebook
  showDeleteNotebookDialog.value = true
}
async function deleteNotebookConfirm() {
  if (notebookToDelete) {
    try {
      await notesService.deleteNotebook(notebookToDelete.id)
      toast.add({ severity: 'success', summary: 'Classeur supprimé', life: 2000 })
      selectedNotebook.value = null
      pages.value = []
      selectedPage.value = null
    } catch (e) {
      toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible de supprimer le classeur", life: 4000 })
    }
  }
  showDeleteNotebookDialog.value = false
}

// CRUD pages
async function addPage() {
  if (!newPageTitle.value.trim() || !selectedNotebook.value) return
  try {
    const pageData = { title: newPageTitle.value.trim(), content: '' }
    await notesService.addPage(selectedNotebook.value.id, pageData)
    toast.add({ severity: 'success', summary: 'Feuille créée', life: 2000 })
    newPageTitle.value = ''
    showPageDialog.value = false
    await loadPages(selectedNotebook.value.id)
  } catch (e) {
    toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible d'ajouter la feuille", life: 4000 })
  }
}
function openEditPage(page) {
  pageToEdit = page
  editPageTitle.value = page.title
  showEditPageDialog.value = true
}
async function renamePage() {
  if (pageToEdit && editPageTitle.value.trim() && selectedNotebook.value) {
    try {
      await notesService.updatePage(selectedNotebook.value.id, pageToEdit.id, { ...pageToEdit, title: editPageTitle.value.trim() })
      toast.add({ severity: 'success', summary: 'Feuille renommée', life: 2000 })
      await loadPages(selectedNotebook.value.id)
      // conserve la sélection
      const p = pages.value.find(pg => pg.id === pageToEdit.id)
      if (p) selectPage(p)
    } catch (e) {
      toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible de renommer la feuille", life: 4000 })
    }
  }
  showEditPageDialog.value = false
}
function openDeletePage(page) {
  pageToDelete = page
  showDeletePageDialog.value = true
}
async function deletePageConfirm() {
  if (pageToDelete && selectedNotebook.value) {
    try {
      await notesService.deletePage(selectedNotebook.value.id, pageToDelete.id)
      toast.add({ severity: 'success', summary: 'Feuille supprimée', life: 2000 })
      await loadPages(selectedNotebook.value.id)
      if (selectedPage.value && selectedPage.value.id === pageToDelete.id) {
        selectedPage.value = null
      }
    } catch (e) {
      toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible de supprimer la feuille", life: 4000 })
    }
  }
  showDeletePageDialog.value = false
}
async function savePage({ title, content }) {
  if (selectedPage.value && selectedNotebook.value) {
    try {
      await notesService.updatePage(selectedNotebook.value.id, selectedPage.value.id, { ...selectedPage.value, title, content })
      toast.add({ severity: 'success', summary: 'Feuille sauvegardée', life: 2000 })
      await loadPages(selectedNotebook.value.id)
      // conserve la sélection
      const p = pages.value.find(pg => pg.id === selectedPage.value.id)
      if (p) selectPage(p)
    } catch (e) {
      toast.add({ severity: 'error', summary: 'Erreur', detail: "Impossible de sauvegarder la feuille", life: 4000 })
    }
  }
}
</script>

<style scoped>
.notes-workspace {
  display: flex;
  height: 100vh;
  background: #fafbfc;
}
.empty-editor {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.2rem;
}
</style>
