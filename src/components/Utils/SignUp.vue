<template>
  <section class="p-0 d-flex align-items-center position-relative overflow-hidden">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-6 d-md-flex align-items-center justify-content-center bg-primary bg-opacity-10 vh-lg-100">
          <div class="p-3 p-lg-5">
            <div class="text-center">
              <h2 class="fw-bold">Bienvenue sur la plateforme de formation pratique de la HEdS</h2>
            </div>
            <img src="@/assets/icons/svg/element/05.svg" class="mt-5" alt="">
          </div>
        </div>
        <div class="col-12 col-lg-6 m-auto">
          <div class="row my-5">
            <div class="col-sm-10 col-xl-8 m-auto">
              <img src="@/assets/icons/svg/element/03.svg" class="h-40px mb-2" alt="">
              <h2>Créez votre compte !</h2>
              <p class="lead mb-4">Ravi de vous voir! Veuillez vous inscrire avec votre compte.</p>
              <form>
                <div class="mb-4">
                  <label for="exampleInputEmail1" class="form-label">Email *</label>
                  <div class="input-group input-group-lg">
                    <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i class="bi bi-envelope-fill"></i></span>
                    <input type="email" class="form-control border-0 bg-light rounded-end ps-1" placeholder="E-mail" id="exampleInputEmail1" ref="email">

                  </div>
                </div>
                <div class="mb-4">
                  <label for="inputPassword5" class="form-label">Mot de passe *</label>
                  <div class="input-group input-group-lg">
                    <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i class="fas fa-lock"></i></span>
                    <input type="password" class="form-control border-0 bg-light rounded-end ps-1" placeholder="*********" id="inputPassword5" ref="password">
                  </div>
                </div>
                <div class="mb-4">
                  <label for="inputPassword6" class="form-label">Confirmer le mot de passe *</label>
                  <div class="input-group input-group-lg">
                    <span class="input-group-text bg-light rounded-start border-0 text-secondary px-3"><i class="fas fa-lock"></i></span>
                    <input type="password" class="form-control border-0 bg-light rounded-end ps-1" placeholder="*********" id="inputPassword5" ref="password">
                  </div>
                </div>
                <div class="mb-4">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="checkbox-1">
                    <label class="form-check-label" for="checkbox-1">En vous inscrivant, vous acceptez les<a href="#"> conditions d'utilisation</a></label>
                  </div>
                </div>
                <div class="align-items-center mt-0">
                  <div class="d-grid">
                    <button class="btn btn-primary mb-0" type="button" @click="submitForm">S'Inscrire</button>
                  </div>
                </div>
              </form>
              <div class="mt-4 text-center">
                <span>Vous avez déjà un compte?<a :href="signInPath"> Se connecter ici</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../../firebase.js';

export default {
  
  name: 'SignUp',
  data() {
    return{
      user: null,  // Ajoutez cette ligne pour définir la propriété user

      signInPath : '/sign_in',
    }
  },
  methods: {
  submitForm() {
    const auth = getAuth();
    const email = this.$refs.email.value;
    const password = this.$refs.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Utilisateur inscrit:", user);
        // ... vous pouvez rediriger l'utilisateur ou faire autre chose
        this.$router.push('/');  // Rediriger vers la page d'accueil


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Erreur:", errorCode, errorMessage);
        // ... afficher un message d'erreur ou gérer l'erreur
      });
  }
}

}
</script>

<style scoped>
/* Vos styles ici (si nécessaire) */
</style>
