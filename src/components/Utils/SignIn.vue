<template>
  <main>
    <section class="p-0 d-flex align-items-center position-relative overflow-hidden">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
            <div class="p-3 p-lg-5">
              <div class="text-center">
                <h2 class="fw-bold">Bienvenue sur la plateforme</h2>
              </div>
              <img src="../../../public/assets/images/element/02.svg" class="mt-5" alt="">
            </div>
          </div>
          <div class="col-12 col-lg-6 m-auto">
            <div class="row my-5">
              <div class="col-sm-10 col-xl-8 m-auto">
                <span class="mb-0 fs-1">👋</span>
                <h1 class="fs-2">Se connecter</h1>
                <p class="lead mb-4">Ravi de vous voir! Veuillez vous connecter avec votre compte.</p>
                <form @submit.prevent="submitForm">
                  <div class="mb-4">
                    <label for="email" class="form-label">Email *</label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="E-mail" required>
                  </div>
                  <div class="mb-4">
                    <label for="password" class="form-label">Mot de passe *</label>
                    <input type="password" class="form-control" id="password" v-model="password" placeholder="Mot de passe" required>
                    <div id="passwordHelpBlock" class="form-text">
                      Votre mot de passe doit comporter au moins 8 caractères.
                    </div>
                  </div>
                  <div class="d-grid">
                    <button class="btn btn-primary" type="submit">Login</button>
                  </div>
                </form>
                <div class="mt-4 text-center">
                  <!--
                  <span>
                    Vous n'avez pas de compte <a href="/sign_up">enregistrez-vous ici</a>
                  </span>
                  -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref('');
const password = ref('');
const router = useRouter();
const auth = getAuth();

const submitForm = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('HomePage');
  } catch (error) {
    console.error("Erreur de connexion: ", error.message);
  }
};
</script>

<style scoped>
</style>
