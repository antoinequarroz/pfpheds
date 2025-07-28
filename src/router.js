import { createRouter, createWebHistory } from 'vue-router';

// --- Dashboard (Admin) ---
import AdminSidebar from '@/features/dashboard/Dashboard/DashboardList/AdminSidebar.vue';
import InstitutionList from '@/features/dashboard/Dashboard/DashboardList/InstitutionList.vue';
import EtudiantList from '@/features/dashboard/Dashboard/DashboardList/EtudiantList.vue';
import EnseignentList from '@/features/dashboard/Dashboard/DashboardList/EnseignentList.vue';
import PraticienFormateurList from '@/features/dashboard/Dashboard/DashboardList/PraticienFormateurList.vue';
import UserList from '@/features/dashboard/Dashboard/DashboardList/UserList.vue';
import InstitutionForm from '@/features/dashboard/Dashboard/DashboardForms/InstitutionForm.vue';
import InstitutionFormModif from '@/features/dashboard/Dashboard/DashboardForms/InstitutionFormModif.vue';
import EtudiantForm from '@/features/dashboard/Dashboard/DashboardForms/EtudiantForm.vue';
import EtudiantFormModif from '@/features/dashboard/Dashboard/DashboardForms/EtudiantFormModif.vue';
import EnseignentForm from '@/features/dashboard/Dashboard/DashboardForms/EnseignentForm.vue';
import EnseignentFormModif from '@/features/dashboard/Dashboard/DashboardForms/EnseignentFormModif.vue';
import PraticienFormateurForm from '@/features/dashboard/Dashboard/DashboardForms/PraticienFormateurForm.vue';
import PraticienFormateurFormModif from '@/features/dashboard/Dashboard/DashboardForms/PraticienFormateurFormModif.vue';
import NewUserForm from '@/features/dashboard/Dashboard/DashboardForms/NewUserForm.vue';
import NewUserFormModif from '@/features/dashboard/Dashboard/DashboardForms/NewUserFormModif.vue';

// --- Dashboard Details ---
import InstitutionDetails from '@/features/dashboard/Dashboard/DashboardDetails/InstitutionDetails.vue';
import EtudiantDetails from '@/features/dashboard/Dashboard/DashboardDetails/EtudiantDetails.vue';
import PlaceDetails from '@/features/dashboard/Dashboard/DashboardDetails/PlaceDetails.vue';
import PFPDetails from '@/features/dashboard/Dashboard/DashboardDetails/PFPDetails.vue';
import VotationView from '@/features/dashboard/Dashboard/DashboardDetails/VotationView.vue';
import VotationPreview from '@/features/dashboard/Dashboard/DashboardDetails/Votation_preview.vue';
import Validation from '@/features/dashboard/Dashboard/DashboardDetails/Validation.vue';
import Reception from '@/features/dashboard/Dashboard/DashboardDetails/Reception.vue';
import Management_votation from '@/features/dashboard/Dashboard/DashboardDetails/Management_votation.vue';
import Management_votation_lese from '@/features/dashboard/Dashboard/DashboardDetails/Management_votation_lese.vue';
import Management_votation_etudiants from '@/features/dashboard/Dashboard/DashboardDetails/Management_votation_etudiants.vue';
import ManagementPlace from '@/features/dashboard/Dashboard/DashboardDetails/Management_place.vue';
import OffreDePlace from '@/features/dashboard/Dashboard/DashboardDetails/OffreDePlac3BA22PFP4.vue';
import ManagementPlacesSafe from '@/features/dashboard/Dashboard/DashboardDetails/ManagementPlacesSafe.vue';
import VotationLese from '@/features/dashboard/Dashboard/DashboardDetails/VotationLese.vue';
import StageRepartitionBA2 from '@/features/dashboard/Dashboard/DashboardDetails/StageRepartitionBA2.vue';
import ResultPreviewVotation from '@/features/dashboard/Dashboard/DashboardDetails/ResultPreviewVotation.vue';
import StatsPlacePFP from '@/features/dashboard/Dashboard/DashboardDetails/StatsPlacePFP.vue';
import PlacesAssignment from '@/features/dashboard/Dashboard/DashboardDetails/PlacesAssignment.vue';
import PlacesAssigned from '@/features/dashboard/Dashboard/DashboardDetails/PlacesAssigned.vue';
import ManagementPFPEnCours from '@/features/dashboard/Dashboard/DashboardDetails/ManagementPFPEnCours.vue';
import ManagementRepondant from '@/features/dashboard/Dashboard/DashboardDetails/Management_repondant.vue';
import Info_repondant from '@/features/dashboard/Dashboard/DashboardDetails/Info_repondant.vue';
import InfoRepondantEtudiants from '@/features/dashboard/Dashboard/DashboardDetails/InfoRepondantEtudiants.vue';
import InfoRepondantSignature from '@/features/dashboard/Dashboard/DashboardDetails/InfoRepondantSignature.vue';

// --- Events ---
import EventCard from '@/features/events/Events/EventCard.vue';
import EventDetail from '@/features/events/Events/EventDetail.vue';
import EventForm from '@/features/events/Events/EventForm.vue';

// --- Pages ---
import HomePage from '@/features/pages/pages/HomePage.vue';
import Login from '@/features/pages/pages/auth/Login.vue';
import Register from '@/features/pages/pages/auth/Register.vue';
import NewPassword from '@/features/pages/pages/auth/NewPassword.vue';
import NotFound from '@/features/pages/pages/NotFound.vue';

// --- Views ---
import EventManagement from '@/views/EventManagement.vue';
import NotesWorkspace from '@/views/NotesWorkspace.vue';
import ChatBotSI from '@/views/ChatBotSI.vue';
import Game from '@/views/Game.vue';
import MobileLangApps from '@/views/MobileLangApps.vue';
import MobileOutils from '@/views/MobileOutils.vue';
import MobileSearch from '@/views/MobileSearch.vue';
import Outils from '@/views/Outils.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import TemplateTest from '@/views/TemplateTest.vue';

const routes = [
  // Auth & Main
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/new-password', component: NewPassword, name: 'NewPassword' },

  // Dashboard/Admin
  { path: '/admin', component: AdminSidebar, name: 'AdminSidebar' },
  { path: '/institution_list', component: InstitutionList },
  { path: '/etudiant_list', component: EtudiantList },
  { path: '/enseignent_list', component: EnseignentList },
  { path: '/praticien_formateur_list', component: PraticienFormateurList },
  { path: '/user_list', component: UserList },
  { path: '/institution_form', component: InstitutionForm },
  { path: '/institution_form_modif', component: InstitutionFormModif },
  { path: '/etudiant_form', component: EtudiantForm },
  { path: '/etudiant_form_modif', component: EtudiantFormModif },
  { path: '/enseignent_form', component: EnseignentForm },
  { path: '/enseignent_form_modif', component: EnseignentFormModif },
  { path: '/praticien_formateur_form', component: PraticienFormateurForm },
  { path: '/praticien_formateur_form_modif', component: PraticienFormateurFormModif },
  { path: '/new_user_form', component: NewUserForm },
  { path: '/new_user_form_modif', component: NewUserFormModif },

  // Dashboard Details
  { path: '/institution_details', component: InstitutionDetails },
  { path: '/etudiant_details', component: EtudiantDetails },
  { path: '/place_details', component: PlaceDetails },
  { path: '/pfp_details', component: PFPDetails },
  { path: '/votation', component: VotationView },
  { path: '/votation_preview', component: VotationPreview },
  { path: '/validation', component: Validation },
  { path: '/reception', component: Reception },
  { path: '/management_votation', component: Management_votation },
  { path: '/management_votation_lese', component: Management_votation_lese },
  { path: '/management_votation_etudiants', component: Management_votation_etudiants },
  { path: '/management_places', component: ManagementPlace },
  { path: '/offre_de_place', component: OffreDePlace },
  { path: '/management_places_safe', component: ManagementPlacesSafe },
  { path: '/votation_lese', component: VotationLese },
  { path: '/stage_repartition', component: StageRepartitionBA2 },
  { path: '/result_preview_votation', component: ResultPreviewVotation },
  { path: '/stats_place_pfp', component: StatsPlacePFP },
  { path: '/places_assignment', component: PlacesAssignment },
  { path: '/places_asssigned', component: PlacesAssigned },
  { path: '/management_pfpencours', component: ManagementPFPEnCours },
  { path: '/management_repondant', component: ManagementRepondant },
  { path: '/info_repondant', component: Info_repondant },
  { path: '/info_repondant_etudiants', component: InfoRepondantEtudiants },
  { path: '/info_repondant_signature', component: InfoRepondantSignature },

  // Events
  { path: '/events', component: EventCard },
  { path: '/events/:id', component: EventDetail, props: true },
  { path: '/events/new', component: EventForm },

  // Views
  { path: '/event-management', component: EventManagement },
  { path: '/notes-workspace', component: NotesWorkspace },
  { path: '/chatbot', component: ChatBotSI },
  { path: '/game', component: Game },
  { path: '/mobile-lang-apps', component: MobileLangApps },
  { path: '/mobile-outils', component: MobileOutils },
  { path: '/mobile-search', component: MobileSearch },
  { path: '/outils', component: Outils },
  { path: '/reset-password', component: ResetPassword },
  { path: '/template-test', component: TemplateTest },

  // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ajouter un guard de navigation
let isAuthStateChecked = false;

router.beforeEach(async (to, from, next) => {
  // Vérifiez si l'état d'authentification est déjà récupéré
  if (!isAuthStateChecked) {
    await new Promise((resolve) => {
      // onAuthStateChanged(auth, (user) => {
      //   isAuthStateChecked = true;
      //   resolve(user); // Continue une fois que l'état est chargé
      // });
      resolve(null);
    });
  }

  const user = null; // auth.currentUser;

  // Gestion spécifique pour la route "/"
  if (to.path === '/') {
    if (user) {
      // Si l'utilisateur est connecté, redirigez vers /feed
      return next('/feed');
    }
    // Sinon, continuez vers la page de login ("/")
    return next('/home');
  }

  // Gestion des routes nécessitant une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      const userId = user.uid;
      console.log(userId);
      // const rolesRef = dbRef(db, `Users/${userId}/Roles`);
      // const snapshot = await dbGet(rolesRef);
      // const roles = snapshot.val();
      // console.log(roles);

      // if (roles) {
      //   const userRoles = Object.keys(roles).filter(role => roles[role]); // Récupération des rôles actifs de l'utilisateur

      //   if (to.meta.requiredRole) {
      //     const requiredRoles = Array.isArray(to.meta.requiredRole)
      //       ? to.meta.requiredRole
      //       : [to.meta.requiredRole]; // Assurez-vous que `requiredRole` est un tableau

      //     // Vérifiez si l'utilisateur a au moins un des rôles requis
      //     if (requiredRoles.some(role => userRoles.includes(role))) {
      //       return next(); // Autoriser l'accès
      //     } else {
      //       import('primevue/usetoast').then(({ useToast }) => {
      //         const toast = useToast();
      //         toast.add({ severity: 'error', summary: 'Accès refusé', detail: "Vous n'avez pas les permissions requises.", life: 4000 });
      //       });
      //       return next('/'); // Redirigez vers une page par défaut
      //     }
      //   } else {
      //     return next(); // Aucune vérification de rôle requise, autorisez l'accès
      //   }
      // } else {
      //   import('primevue/usetoast').then(({ useToast }) => {
      //     const toast = useToast();
      //     toast.add({ severity: 'error', summary: 'Accès refusé', detail: 'Aucun rôle trouvé.', life: 4000 });
      //   });
      //   return next('/home'); // Redirigez vers une page par défaut
      // }
    } else {
      import('primevue/usetoast').then(({ useToast }) => {
        const toast = useToast();
        toast.add({ severity: 'warn', summary: 'Connexion requise', detail: 'Vous devez être connecté pour accéder à cette page.', life: 4000 });
      });
      return next('/'); // Redirigez vers la page de connexion
    }
  } else {
    return next(); // Aucune authentification requise, autorisez l'accès
  }
});

export default router;
