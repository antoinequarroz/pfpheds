<template>
  <div class="flex flex-column lg:flex-row justify-content-center align-items-center h-screen bg-surface-ground px-2 lg:px-0">
    <!-- Conteneur principal -->
    <div class="flex flex-column lg:flex-row w-full max-w-7xl rounded-md overflow-hidden">
      <!-- Section gauche -->
      <div class="flex flex-column justify-content-center align-items-center w-full lg:w-6 text-white p-5">
        <img
          src="/assets/images/FR-DE_HEdS_rvb_neg.png"
          alt="Logo"
          class="mb-3 h-8rem lg:h-15rem" />
      </div>

      <!-- Section droite -->
      <div class="flex flex-column justify-content-center align-items-center w-full lg:w-3 p-4 lg:p-7">
        <h1 class="text-4xl lg:text-6xl text-left mb-4">La formation pratique, clé de votre avenir.</h1>

        <!-- Formulaire de connexion -->
        <form @submit.prevent="submitForm" class="w-full max-w-25rem">
          <div class="mb-4">
            <InputText
              id="email"
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full "
              :class="{ 'p-invalid': emailError }"
            />
            <small v-if="emailError" class="p-error">Veuillez entrer une adresse e-mail valide.</small>
          </div>
          <div class="flex flex-column lg:flex-row align-items-center mb-4 ">
            <Password
              id="password"
              placeholder="Mot de passe"
              v-model="password"
              class="w-full"
              inputClass="w-full "
              :feedback="false"
              :class="{ 'p-invalid': passwordError }"
              toggleMask
            />
            <small v-if="passwordError" class="p-error">Le mot de passe est requis.</small>
          </div>
          <div class="flex align-items-center mb-4">
            <Checkbox v-model="rememberMe" inputId="remember-me" binary class="mr-2" />
            <label for="remember-me" class="text-sm">Se souvenir de moi</label>
          </div>
          <Button label="Se connecter" type="submit" class="w-full p-button-raised inputcolor" />
        </form>

        <!-- Lien mot de passe oublié -->
        <p class="mt-4 text-sm text-center">
          <a type="button" @click="resetPassword" class="text-primary font-bold hover:underline bg-transparent border-0 cursor-pointer p-0">Mot de passe oublié ?</a>
        </p>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

// Variables réactives
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const router = useRouter();
const auth = getAuth();
const toast = useToast();

// Méthode pour gérer la soumission du formulaire
const submitForm = async () => {
  emailError.value = !email.value || !email.value.includes("@");
  passwordError.value = !password.value;

  if (emailError.value || passwordError.value) {
    toast.add({
      severity: "warn",
      summary: "Champs invalides",
      detail: "Veuillez corriger les erreurs pour continuer.",
      life: 3000,
    });
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    toast.add({
      severity: "success",
      summary: "Connexion réussie",
      detail: "Vous êtes connecté ! Redirection en cours...",
      life: 3000,
    });
    setTimeout(() => router.push("/feed"), 1500);
  } catch (error) {
    console.error(error);
    const messages = {
      "auth/user-not-found": "Utilisateur introuvable.",
      "auth/wrong-password": "Mot de passe incorrect.",
      "auth/invalid-email": "Adresse e-mail invalide.",
      "auth/user-disabled": "Ce compte est désactivé.",
    };
    toast.add({
      severity: "error",
      summary: "Erreur de connexion",
      detail: messages[error.code] || "Une erreur est survenue.",
      life: 5000,
    });
  }
};

// Méthode pour réinitialiser le mot de passe
const resetPassword = async () => {
  emailError.value = !email.value || !email.value.includes("@");
  if (emailError.value) {
    toast.add({
      severity: "warn",
      summary: "Email requis",
      detail: "Veuillez entrer votre email pour recevoir un lien de réinitialisation.",
      life: 3000,
    });
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email.value);
    toast.add({
      severity: "success",
      summary: "Email envoyé",
      detail: "Un lien de réinitialisation a été envoyé à votre adresse email.",
      life: 4000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: error.message || "Erreur lors de l'envoi de l'email.",
      life: 4000,
    });
  }
};
</script>

<style scoped>
/* Adaptations pour mobile */
@media (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }

  img {
    max-height: 8rem;
  }
}

.inputcolor {
  background: linear-gradient(90deg, #F3C300 0%, #D49F3F 100%);
  color: #222;
  border: none;
}

.p-password .p-password-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
  font-size: 1.25rem;
  cursor: pointer;
}

.p-error {
  font-size: 0.875rem;
  color: var(--red-500);
}
</style>
