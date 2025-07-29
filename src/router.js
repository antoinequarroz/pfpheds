import { createRouter, createWebHistory } from 'vue-router';
import { ref as dbRef, get as dbGet } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase'; // Import your Firebase configuration

// ========================================
// AUTHENTIFICATION & ACCUEIL // View
// ========================================
import LoginHome from '@/views/auth/LoginHome.vue'; // avec firebase
import LoginHome2 from '@/views/auth/LoginHome2.vue' // avec supabase
import NewPasswordView from '@/views/auth/NewPasswordView.vue' // avec supabase
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue';
import VerificationView from '@/views/auth/VerificationView.vue';
import LockScreenView from '@/views/auth/LockScreenView.vue';
import AccessView from '@/views/auth/AccessView.vue';
import AuthErrorView from '@/views/auth/AuthErrorView.vue';

// ========================================
// PAGES PRINCIPALES & NAVIGATION
// ========================================
import Map from "@/views/home/MapView.vue";
import Institution from "@/views/institutions/InstitutionListView.vue";
import Place from "@/views/institutions/PlaceListView.vue";
import Faq from "@/views/home/FaqView.vue";
import TermsOfUse from "@/views/home/TermsView.vue";
import InfoExterne from "@/views/home/InfoExterneView.vue";
import HistoriquePFP from '@/views/home/HistoryView.vue'
import DocumentsPFP from '@/views/home/DocumentsView.vue'

// ========================================
// PROFILS & UTILISATEURS
// ========================================
import Profile from "@/views/users/ProfileView.vue";
import ProfileAdmin from '@/views/admin/ProfileAdminView.vue'
import SettingView from '@/views/users/SettingsView.vue'

// ========================================
// DASHBOARD & ADMINISTRATION
// ========================================
import DashboardView from '@/views/admin/DashboardView.vue';

// ========================================
// SOCIAL & COMMUNICATION
// ========================================
import FeedView from '@/views/social/FeedView.vue';
import MentionView from '@/views/social/MentionView.vue';
import HashtagView from '@/views/social/HashtagView.vue';
import CommunitiesView from '@/views/social/CommunitiesView.vue';
import CommunityView from '@/views/social/CommunityView.vue';
import CommunityInfoView from '@/views/social/CommunityInfoView.vue';

// ========================================
// GESTION UTILISATEURS - LISTES
// ========================================
import ListUser from '@/views/user-management/ListUser.vue';
import UserListView from "@/views/admin/users/UserListView.vue";
import StudentListView from "@/views/admin/users/StudentListView.vue";
import TeacherListView from "@/views/admin/users/TeacherListView.vue";
import TrainerListView from "@/views/admin/users/TrainerListView.vue";
import InstitutionListView from "@/views/admin/institutions/InstitutionListView.vue";

// ========================================
// FORMULAIRES DE CRÉATION/MODIFICATION
// ========================================
import NewUserForm from "@/components/Dashboard/DashboardForms/NewUserForm.vue";
import NewUserFormModif from "@/components/Dashboard/DashboardForms/NewUserFormModif.vue";
import EtudiantForm from "@/components/Dashboard/DashboardForms/EtudiantForm.vue";
import EtudiantFormModif from "@/components/Dashboard/DashboardForms/EtudiantFormModif.vue";
import EnseignentForm from "@/components/Dashboard/DashboardForms/EnseignentForm.vue";
import EnseignentFormModif from "@/components/Dashboard/DashboardForms/EnseignentFormModif.vue";
import PraticienFormateurForm from "@/components/Dashboard/DashboardForms/PraticienFormateurForm.vue";
import PraticienFormateurFormModif from "@/components/Dashboard/DashboardForms/PraticienFormateurFormModif.vue";
import InstitutionForm from "@/components/Dashboard/DashboardForms/InstitutionForm.vue";
import InstitutionFormModif from "@/components/Dashboard/DashboardForms/InstitutionFormModif.vue";
import AffectationStageEtudiant from '@/components/Dashboard/DashboardForms/AffectationStageEtudiant.vue'

// ========================================
// INSTITUTIONS & DÉTAILS
// ========================================
import InstitutionView from '@/components/Institutions/InstitutionView.vue';
import InstitutionDetailsView from "@/views/admin/institutions/InstitutionDetailsView.vue";
import EtudiantDetails from "@/components/Dashboard/DashboardDetails/EtudiantDetails.vue";
import PlaceDetails from "@/components/Dashboard/DashboardDetails/PlaceDetails.vue";
import PFPDetails from "@/components/Dashboard/DashboardDetails/PFPDetails.vue";

// ========================================
// VOTATIONS & GESTION
// ========================================
import VotationView from "@/views/admin/votations/VotationView.vue";
import VotationPreview from "@/components/Dashboard/DashboardDetails/Votation_preview.vue";
import VotationLese from '@/components/Dashboard/DashboardDetails/VotationLese.vue';
import VotationManagementView from '@/views/admin/votations/VotationManagementView.vue';
import Management_votation_lese from '@/components/Dashboard/DashboardDetails/Management_votation_lese.vue';
import Management_votation_etudiants from '@/components/Dashboard/DashboardDetails/Management_votation_etudiants.vue';

// ========================================
// GESTION DES PLACES & STAGES
// ========================================
import PlaceManagementView from '@/views/admin/places/PlaceManagementView.vue';
import ManagementPlacesSafe from '@/components/Dashboard/DashboardDetails/ManagementPlacesSafe.vue';
import OffreDePlace from '@/components/Dashboard/DashboardDetails/OffreDePlac3BA22PFP4.vue';
import PlaceAssignmentView from '@/views/admin/places/PlaceAssignmentView.vue';
import PlacesAssigned from '@/components/Dashboard/DashboardDetails/PlacesAssigned.vue';
import StageRepartitionBA2 from '@/components/Dashboard/DashboardDetails/StageRepartitionBA2.vue';
import ManagementPFPEnCours from '@/components/Dashboard/DashboardDetails/ManagementPFPEnCours.vue';

// ========================================
// VALIDATION & RÉCEPTION
// ========================================
import ValidationView from "@/views/admin/validation/ValidationView.vue";
import ReceptionView from "@/views/admin/validation/ReceptionView.vue";
import InfoRepondant from '@/components/Dashboard/DashboardDetails/Info_repondant.vue';
import ManagementRepondant from '@/components/Dashboard/DashboardDetails/Management_repondant.vue';

// ========================================
// STATISTIQUES & RÉSULTATS
// ========================================
import VotationResultsView from '@/views/admin/votations/VotationResultsView.vue';
import PlaceStatsView from '@/views/admin/places/PlaceStatsView.vue';

// ========================================
// APPLICATIONS & OUTILS
// ========================================
import Index from '@/views/apps/tasklist/Index.vue'
import IndexChat from '@/views/apps/chat/IndexChat.vue'
import ListComponent from '@/components/Bibliotheque/SoundBox/ListComponent.vue'
import SearchResults from '@/components/Utils/SearchResults.vue'
import Outils from '@/views/Outils.vue';
import Game from '@/views/Game.vue';
import NotesWorkspace from '@/views/NotesWorkspace.vue';
import ChatBotSI from '@/views/ChatBotSI.vue'

// ========================================
// MOBILE SPÉCIFIQUE
// ========================================
import CreateContentMobile from '@/components/Bibliotheque/Social/CreateContentMobile.vue';
import MobileLangApps from '@/views/MobileLangApps.vue';

// ========================================
// COMPOSANTS SPÉCIAUX & UTILITAIRES
// ========================================
import Ventriglisse3D from '@/ventriglisse3d/Ventriglisse3D.vue';
import QrCodeGenerator from '@/components/QrCodeGenerator.vue'

// ========================================
// ERREURS & CATCH-ALL
// ========================================
import Error404 from "@/components/Utils/Error404.vue";

// Define your routes
const routes = [
  // ========================================
  // AUTHENTIFICATION & ACCUEIL
  // ========================================
  { path: '/', component: LoginHome, name: 'LoginHome', props: true },
  { path: '/home', component: LoginHome, name: 'LoginHome', props: true },
  { path: '/home2', component: LoginHome2, name: 'LoginHome2', props: true },
  { path: '/new-password', component: NewPasswordView, name: 'NewPassword' },
  { path: '/login', component: LoginView, name: 'LoginView' },
  { path: '/register', component: RegisterView, name: 'RegisterView' },
  { path: '/forgot-password', component: ForgotPasswordView, name: 'ForgotPasswordView' },
  { path: '/verification', component: VerificationView, name: 'VerificationView' },
  { path: '/lock-screen', component: LockScreenView, name: 'LockScreenView' },
  { path: '/access', component: AccessView, name: 'AccessView' },
  { path: '/auth-error', component: AuthErrorView, name: 'AuthErrorView' },

  // ========================================
  // PAGES PRINCIPALES & NAVIGATION
  // ========================================
  { path: '/map', component: Map, name: 'Map', meta: { requiresAuth: true } },
  { path: '/institution', component: Institution, name: 'Institution', meta: { requiresAuth: true } },
  { path: '/place', component: Place, name: 'Place', meta: { requiresAuth: true } },
  { path: '/faq', component: Faq, name: 'Faq', meta: { requiresAuth: true } },
  { path: '/terms_of_use', component: TermsOfUse, name: 'TermsOfUse', meta: { requiresAuth: true } },
  { path: '/info_externe', component: InfoExterne, name: 'InfoExterne', meta: { requiresAuth: true } },
  { path: '/history', component: HistoriquePFP, name: 'HistoriquePFP', meta: { requiresAuth: true } },
  { path: '/documents', component: DocumentsPFP, name: 'DocumentsPFP', meta: { requiresAuth: true } },

  // ========================================
  // PROFILS & UTILISATEURS
  // ========================================
  { path: '/profile/:id', component: Profile, name: 'Profile', meta: { requiresAuth: true } },
  { path: '/profilAdmin/:id', component: ProfileAdmin, name: 'ProfileAdmin', meta: { requiresAuth: true, requiredRole: ['admin'] } },
  { path: '/settings', component: SettingView, name: 'SettingView', meta: { requiresAuth: true } },

  // ========================================
  // DASHBOARD & ADMINISTRATION
  // ========================================
  { path: '/admin', component: DashboardView, name: 'DashboardView', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },

  // ========================================
  // SOCIAL & COMMUNICATION
  // ========================================
  { path: '/feed', component: FeedView, name: 'FeedView', props: true, meta: { requiresAuth: true } },
  { path: '/mention/:group', component: MentionView, name: 'MentionView', props: true, meta: { requiresAuth: true, requiredRole: true } },
  { path: '/hashtag/:hashtag', component: HashtagView, name: 'HashtagView', props: true, meta: { requiresAuth: true } },
  { path: '/communities', component: CommunitiesView, name: 'CommunitiesView', props: true, meta: { requiresAuth: true } },
  { path: '/communities/:id', component: CommunityView, name: 'CommunityView', props: true },
  { path: '/communities/info/:id', component: CommunityInfoView, name: 'CommunityInfoView' },

  // ========================================
  // GESTION UTILISATEURS - LISTES
  // ========================================
  { path: '/listUser', component: ListUser, name: 'ListUser', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/user_list', component: UserListView, name: 'UserListView', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/etudiant_list', component: StudentListView, name: 'StudentListView', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/enseignent_list', component: TeacherListView, name: 'TeacherListView', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/praticien_formateur_list', component: TrainerListView, name: 'TrainerListView', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/institution_list', component: InstitutionListView, name: 'InstitutionListView', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },

  // ========================================
  // FORMULAIRES DE CRÉATION/MODIFICATION
  // ========================================
  { path: '/new_user_form', component: NewUserForm, name: 'NewUserForm', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/new_user_form_modif/:userId', component: NewUserFormModif, name: 'NewUserFormModif', props: true, meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/etudiant_form', component: EtudiantForm, name: 'EtudiantForm', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/etudiant/:etuId/modif', component: EtudiantFormModif, name: 'EtudiantFormModif', props: true, meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/enseignent_form', component: EnseignentForm, name: 'EnseignentForm', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/enseignent_form_modif/:enseignantId', component: EnseignentFormModif, name: 'EnseignentFormModif', props: true, meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/praticien_formateur_form', component: PraticienFormateurForm, name: 'PraticienFormateurForm', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/praticien_formateur_form_modif/:praticienFormateurId', component: PraticienFormateurFormModif, name: 'PraticienFormateurFormModif', props: true, meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/institution_form', component: InstitutionForm, name: 'InstitutionForm', props: true, meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/institution_form_modif/:id', component: InstitutionFormModif, name: 'InstitutionFormModif', props: true, meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/affectation_stage_etudiant', component: AffectationStageEtudiant, name: 'AffectationStageEtudiant', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },

  // ========================================
  // INSTITUTIONS & DÉTAILS
  // ========================================
  { path: '/institution/:id', component: InstitutionView, name: 'InstitutionView', props: true, meta: { requiresAuth: true } },
  { path: '/institution_details/:id', component: InstitutionDetailsView, name: 'InstitutionDetails', props: true, meta: { requiresAuth: true } },
  { path: '/etudiant/:id/details', component: EtudiantDetails, name: 'EtudiantDetails', props: true, meta: { requiresAuth: true } },
  { path: '/place_details', component: PlaceDetails, name: 'place-details', meta: { requiresAuth: true } },
  { path: '/pfp_details', component: PFPDetails, name: 'pfp-details', meta: { requiresAuth: true } },

  // ========================================
  // VOTATIONS & GESTION
  // ========================================
  { path: '/votation', component: VotationView, name: 'VotationView', meta: { requiresAuth: true } },
  { path: '/votation_preview', component: VotationPreview, name: 'VotationPreview', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/votation_lese', component: VotationLese, name: 'VotationLese', meta: { requiresAuth: true, requiredRole: 'lese' } },
  { path: '/votation_management', component: VotationManagementView, name: 'VotationManagementView', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/management_votation_lese', component: Management_votation_lese, name: 'Management_votation_lese', meta: { requiresAuth: true, requiredRole: 'lese' } },
  { path: '/management_votation_etudiants', component: Management_votation_etudiants, name: 'Management_votation_etudiants', meta: { requiresAuth: true, requiredRole: 'admin' } },

  // ========================================
  // GESTION DES PLACES & STAGES
  // ========================================
  { path: '/management_places', component: PlaceManagementView, name: 'PlaceManagementView', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/management_places_safe', component: ManagementPlacesSafe, name: 'ManagementPlacesSafe', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/management_offre', component: OffreDePlace, name: 'Management_offre', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/places_assignment', component: PlaceAssignmentView, name: 'PlaceAssignmentView', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/places_assigned', component: PlacesAssigned, name: 'PlacesAssigned', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/stage_repartition', component: StageRepartitionBA2, name: 'StageRepartitionBA2', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/management_pfpencours', component: ManagementPFPEnCours, name: 'ManagementPFPEnCours', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/historique_pfp', component: HistoriquePFP, name: 'HistoriquePFP', meta: { requiresAuth: true } },
  { path: '/documents_pfp', component: DocumentsPFP, name: 'DocumentsPFP', meta: { requiresAuth: true } },

  // ========================================
  // VALIDATION & RÉCEPTION
  // ========================================
  { path: '/validation', component: ValidationView, name: 'ValidationView', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/reception', component: ReceptionView, name: 'ReceptionView', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/info_repondant', component: InfoRepondant, name: 'InfoRepondant', meta: { requiresAuth: true, requiredRole: ['admin', 'enseignant'] } },
  { path: '/management_repondant', component: ManagementRepondant, name: 'Management_repondant', meta: { requiresAuth: true, requiredRole: 'admin' } },

  // ========================================
  // STATISTIQUES & RÉSULTATS
  // ========================================
  { path: '/result_preview_votation', component: VotationResultsView, name: 'VotationResultsView', meta: { requiresAuth: true, requiredRole: 'admin' } },
  { path: '/stats_place_pfp', component: PlaceStatsView, name: 'PlaceStatsView', meta: { requiresAuth: true, requiredRole: 'admin' } },

  // ========================================
  // APPLICATIONS & OUTILS
  // ========================================
  { path: '/tasklist', component: Index, name: 'Index', meta: { requiresAuth: true, requiredRole: ['editor', 'admin'] } },
  { path: '/chat', component: IndexChat, name: 'IndexChat', meta: { requiresAuth: true } },
  { path: '/list', component: ListComponent, name: 'ListComponent', meta: { requiresAuth: true, requiredRole: ['editor', 'admin'] } },
  { path: '/template-test', component: () => import('@/views/TemplateTest.vue'), name: 'TemplateTest' },

  // ========================================
  // MOBILE SPÉCIFIQUE
  // ========================================
  { path: '/create', component: () => import('@/components/Bibliotheque/Social/CreateContentMobile.vue'), name: 'CreateContentMobile', meta: { mobileOnly: true } },
  { path: '/mobile-outils', component: () => import('./views/MobileOutils.vue'), name: 'MobileOutils', meta: { mobileOnly: true } },
  { path: '/mobile-search', component: () => import('./views/MobileSearch.vue'), name: 'MobileSearch', meta: { mobileOnly: true } },

  // ========================================
  // ROUTES SPÉCIALES & LAZY LOADING
  // ========================================
  { path: '/validate-pfp1a', component: () => import('@/components/Dashboard/DashboardDetails/ValidatePFP1A.vue'), name: 'ValidatePFP1A', meta: { requiresAuth: true, requiredRole: ['admin', 'editor'] } },
  { path: '/ventriglisse3d', component: Ventriglisse3D, name: 'Ventriglisse3D', meta: { requiresAuth: false } },
  { path: '/qr', component: () => import('@/components/QrCodeGenerator.vue'), name: 'QRCodePage', meta: { requiresAuth: false } },
  { path: '/lang-apps', component: MobileLangApps, name: 'MobileLangApps', meta: { mobileOnly: true } },
  { path: '/notes', component: NotesWorkspace, name: 'NotesWorkspace', meta: { requiresAuth: true } },
  { path: '/outils', component: Outils, name: 'Outils', meta: { requiresAuth: true } },
  { path: '/game', component: Game, name: 'Game', meta: { requiresAuth: true } },
  { path: '/chatbotsi', component: ChatBotSI, name: 'ChatBotSI', meta: { requiresAuth: true, requiredRole: ['admin', 'chatbotSi'] } },

  // ========================================
  // ERREURS & CATCH-ALL
  // ========================================
  { path: '/:pathMatch(.*)*', component: Error404, name: 'Error404' }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Ajouter un guard de navigation
let isAuthStateChecked = false;

router.beforeEach(async (to, from, next) => {
  // Vérifiez si l'état d'authentification est déjà récupéré
  if (!isAuthStateChecked) {
    await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        isAuthStateChecked = true;
        resolve(user); // Continue une fois que l'état est chargé
      });
    });
  }

  const user = auth.currentUser;

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
      const rolesRef = dbRef(db, `Users/${userId}/Roles`);
      const snapshot = await dbGet(rolesRef);
      const roles = snapshot.val();
      console.log(roles);

      if (roles) {
        const userRoles = Object.keys(roles).filter(role => roles[role]); // Récupération des rôles actifs de l'utilisateur

        if (to.meta.requiredRole) {
          const requiredRoles = Array.isArray(to.meta.requiredRole)
            ? to.meta.requiredRole
            : [to.meta.requiredRole]; // Assurez-vous que `requiredRole` est un tableau

          // Vérifiez si l'utilisateur a au moins un des rôles requis
          if (requiredRoles.some(role => userRoles.includes(role))) {
            return next(); // Autoriser l'accès
          } else {
            import('primevue/usetoast').then(({ useToast }) => {
              const toast = useToast();
              toast.add({ severity: 'error', summary: 'Accès refusé', detail: "Vous n'avez pas les permissions requises.", life: 4000 });
            });
            return next('/'); // Redirigez vers une page par défaut
          }
        } else {
          return next(); // Aucune vérification de rôle requise, autorisez l'accès
        }
      } else {
        import('primevue/usetoast').then(({ useToast }) => {
          const toast = useToast();
          toast.add({ severity: 'error', summary: 'Accès refusé', detail: 'Aucun rôle trouvé.', life: 4000 });
        });
        return next('/home'); // Redirigez vers une page par défaut
      }
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