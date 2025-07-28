<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';
import { usePrimeVue } from 'primevue/config';

const $primevue = usePrimeVue();

defineExpose({
  $primevue
});

const router = useRouter();

const isHidden = ref(false);

const toggleHidden = () => {
  isHidden.value = !isHidden.value;
};

const { layoutConfig } = useLayout();

const darkMode = computed(() => {
  return layoutConfig.colorScheme.value !== 'light';
});

const smoothScroll = (id) => {
  document.querySelector(id).scrollIntoView({
    behavior: 'smooth'
  });
};

const navigateToDashboard = () => {
  router.push('/');
};
</script>

<template>
    <div class="relative overflow-hidden flex flex-column justify-content-center">
        <div class="bg-circle opacity-50" :style="{ top: '-200px', left: '-700px' }"></div>
        <div class="bg-circle hidden lg:flex" :style="{ top: '50px', right: '-800px', transform: 'rotate(60deg)' }"></div>
        <div class="landing-wrapper">

            <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 z-2">
                <div id="home" class="grid grid-nogutter justify-content-between align-items-center mb-6 py-6 md:mb-8 md:py-8">
                    <div class="col-12 md:col-5 flex flex-column gap-4 flex-order-1 md:flex-order-0 align-items-center md:align-items-start text-center md:text-left">
                        <span class="block text-900 font-bold text-7xl">Plateforme de formation pratique</span>
                        <span class="block text-700 text-lg">Retrouver les différentes places de formation pratique de la filière physiothérapie de la HES-SO Valais-Wallis.</span>
                        <Button type="button" label="Plus d'info" icon="pi pi-arrow-right" iconPos="right" class="w-12rem" outlined></Button>
                    </div>

                    <div class="col-12 md:col-5 flex-order-0 md:flex-order-1 mb-6 md:mb-0 border-round">
                        <img :src="`/demo/images/landing/${darkMode ? 'LBB_batiment-dark' : 'LBB_batiment-light'}.jpg`" alt="" class="h-30rem border-round shadow-2 animation-duration-1000 fadeinright" />
                    </div>
                </div>

              <div id="features" class="my-6 py-6 md:my-3 md:py-3"> <!-- Changer l'id de la page -->
                <span class="text-900 block font-bold text-5xl mb-4 text-center">Informations</span>
                <span class="text-700 block text-xl mb-2 text-center line-height-3">Quelques chiffres sur la formation pratique au sein de la Haute École de Santé Valais-Wallis</span>
              </div>

              <!-- Ajouter une animation aux chiffres -->

              <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
                <div class="grid">
                  <div class="col-12 md:col-6 lg:col-3">
                    <div class="surface-card shadow-2 p-3 border-round">
                      <div class="flex justify-content-between mb-2 mt-2">
                        <div>
                          <span class="block text-900 font-medium mb-3 text-4xl">120</span>
                          <div class="text-500 font-medium text-2xl">Places de stages</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 md:col-6 lg:col-3">
                    <div class="surface-card shadow-2 p-3 border-round">
                      <div class="flex justify-content-between mb-2 mt-2">
                        <div>
                          <span class="block text-900 font-medium mb-3 text-4xl">115</span>
                          <div class="text-500 font-medium text-2xl">Institutions</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 md:col-6 lg:col-3">
                    <div class="surface-card shadow-2 p-3 border-round">
                      <div class="flex justify-content-between mb-2 mt-2">
                        <div>
                          <span class="block text-900 font-medium mb-3 text-4xl">270</span>
                          <div class="text-500 font-medium text-2xl">Élèves</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="col-12 md:col-6 lg:col-3">
                    <div class="surface-card shadow-2 p-3 border-round">
                      <div class="flex justify-content-between mb-2 mt-2">
                        <div>
                          <span class="block text-900 font-medium mb-3 text-4xl">323</span>
                          <div class="text-500 font-medium text-2xl">Formateurs</div>
                        </div>
                        <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                          <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          <!-- Bienvenue sur la plateforme de choix de stage -->
              <div class="surface-ground px-4 py-5 md:px-6 lg:px-8 mb-2">
                <div class="grid grid-nogutter surface-section text-800 shadow-2 border-round">
                  <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                      <span class="block text-6xl font-bold mb-1">Bienvenue sur la plateforme</span>
                      <div class="text-6xl text-primary font-bold mb-3">de choix de stage</div>
                      <p class="mt-0 mb-4 text-700 line-height-3">Choisissez votre prochain lieu de formation pratique pour vos future PFP.</p>

                      <Button label="En savoir plus" type="button" class="mr-3" raised></Button>
                      <Button label="Vidéo explicative" type="button" outlined></Button>  <!-- Ajouter Plyr et la vidéo de la capsule d'explication -->
                    </section>
                  </div>
                  <div class="col-12 md:col-6 overflow-hidden">
                    <img src="/demo/images/heds/LLB2.jpg" alt="Image" class="md:ml-auto block md:h-30rem border-round-right" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
                  </div>
                </div>
              </div>



              <div class="surface-ground px-4 py-8 md:px-6 lg:px-8 overflow-hidden">
                <div class="font-bold text-900 text-3xl mb-3 text-center">Comment utilisé la plateforme</div>
                <div class="text-700 text-center mb-5 line-height-3">Christophe président.</div>
                <div class="flex lg:justify-content-center mb-5">
                  <div class="py-3 pr-8 pl-3 w-30rem hidden lg:block">
                    <img src="/public/demo/images/blocks/feature/feature-timeline-1.png" alt="Image" class="w-full mr-8">
                  </div>
                  <div class="flex flex-column align-items-center w-2rem">
                    <span class="bg-blue-500 text-0 flex align-items-center justify-content-center border-circle" style="min-width:2.5rem; min-height: 2.5rem">1</span>
                    <div class="h-full bg-blue-500" style="width: 2px; min-height: 4rem"></div>
                  </div>
                  <div class="py-3 pl-5 lg:pl-8 pl-3 lg:w-30rem">
                    <div class="text-900 text-xl mb-2 font-medium">Se connecter</div>
                    <span class="block text-700 line-height-3 mb-3">Se connecter avec son compte utilisateur donné au début de l'année.</span>
                    <div class="pt-3 border-top-1 border-300">
                      <div class="mb-2 line-height-3"><span class="text-900 font-medium">Sed lectus vestibulum</span> mattis ullamcorper velit. Laoreet sit amet cursus sit.</div>
                    </div>
                    <img src="/public/demo/images/blocks/feature/feature-timeline-1.png" alt="Image" class="w-full mt-3 block lg:hidden" />
                  </div>
                </div>
                <div class="flex justify-content-center mb-5">
                  <div class="py-3 pl-5 pr-3 lg:pr-8 lg:pl-3 lg:w-30rem flex-order-1 lg:flex-order-0">
                    <div class="text-900 text-xl mb-2 font-medium">Choisir sa place de stage</div>
                    <span class="block text-700 line-height-3 mb-3">Rechercher les différentes instituions sur la carte avec leur point GPS ou directement dans l'onglet institutions.</span>
                    <div class="pt-3 border-top-1 border-300">
                      <div class="mb-2 line-height-3">Ajouter au panier les places de stages désirées.</div>
                    </div>
                    <img src="/public/demo/images/blocks/feature/feature-timeline-2.png" alt="Image" class="w-full mt-3 block lg:hidden" />
                  </div>
                  <div class="flex flex-column align-items-center w-2rem flex-order-0 lg:flex-order-1">
                    <span class="bg-yellow-500 text-0 flex align-items-center justify-content-center border-circle" style="min-width:2.5rem; min-height: 2.5rem">2</span>
                    <div class="h-full bg-yellow-500" style="width: 2px; min-height: 4rem"></div>
                  </div>
                  <div class="py-3 pl-8 pr-3 w-30rem hidden lg:block flex-order-2">
                    <img src="/public/demo/images/blocks/feature/feature-timeline-2.png" alt="Image" class="w-full mr-8" />
                  </div>
                </div>
                <div class="flex justify-content-center">
                  <div class="py-3 pr-8 pl-3 w-30rem hidden lg:block">
                    <img src="/public/demo/images/blocks/feature/feature-timeline-3.png" alt="Image" class="w-full mr-8" />
                  </div>
                  <div class="flex flex-column align-items-center w-2rem">
                    <span class="bg-cyan-500 text-0 flex align-items-center justify-content-center border-circle" style="min-width:2.5rem; min-height: 2.5rem">3</span>
                    <div class="h-full bg-cyan-500" style="width: 2px; min-height: 4rem"></div>
                  </div>
                  <div class="py-3 pl-5 lg:pl-8 pl-3 lg:w-30rem">
                    <div class="text-900 text-xl mb-2 font-medium">Votre profil en temps réel</div>
                    <span class="block text-700 line-height-3 mb-3">Retrouver votre cursus en temps réel.</span>
                    <div class="pt-3 border-top-1 border-300">
                      <div class="mb-2 line-height-3"><span class="text-900 font-medium">Egestas dui id</span> ornare arcu odio ut. Mi bibendum neque egestas congue.</div>
                    </div>
                    <img src="/public/demo/images/blocks/feature/feature-timeline-3.png" alt="Image" class="w-full mt-3 block lg:hidden" />
                  </div>
                </div>
                <div class="flex justify-content-center mb-5">
                  <div class="py-3 pl-5 pr-3 lg:pr-8 lg:pl-3 lg:w-30rem flex-order-1 lg:flex-order-0">
                    <div class="text-900 text-xl mb-2 font-medium">Contact</div>
                    <span class="block text-700 line-height-3 mb-3">Contacter votre professeur référent pour tout types de questions.</span>
                    <div class="pt-3 border-top-1 border-300">
                      <div class="mb-2 line-height-3"><span class="text-900 font-medium">Quis hendrerit dolor</span> magna eget est. Pellentesque pulvinar pellentesque.</div>
                    </div>
                    <img src="/public/demo/images/blocks/feature/feature-timeline-4.png" alt="Image" class="w-full mt-3 block lg:hidden" />
                  </div>
                  <div class="flex flex-column align-items-center w-2rem flex-order-0 lg:flex-order-1">
                    <span class="bg-purple-500 text-0 flex align-items-center justify-content-center border-circle" style="min-width:2.5rem; min-height: 2.5rem">2</span>
                    <div class="h-full bg-purple-500" style="width: 2px; min-height: 4rem"></div>
                  </div>
                  <div class="py-3 pl-8 pr-3 w-30rem hidden lg:block flex-order-2">
                    <img src="/public/demo/images/blocks/feature/feature-timeline-4.png" alt="Image" class="w-full mr-8" />
                  </div>
                </div>
              </div>


            <!--
                <div id="apps" class="my-6 md:my-8">
                    <span class="text-900 block font-bold text-5xl mb-4 text-center">Apps</span>
                    <span class="text-700 block text-xl mb-8 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</span>

                    <div class="flex flex-column lg:flex-row align-items-center justify-content-between mt-8 gap-8">
                        <div class="flex flex-column align-items-center">
                            <img :src="`/demo/images/landing/${darkMode ? 'chat-dark' : 'chat-light'}.png`" alt="chat" class="w-full h-full border-round surface-border shadow-2 animation-duration-500 scalein origin-top" />
                            <span class="block text-900 text-lg font-semibold mt-4">Chat</span>
                        </div>
                        <div class="flex flex-column align-items-center">
                            <img :src="`/demo/images/landing/${darkMode ? 'mail-dark' : 'mail-light'}.png`" alt="chat" class="w-full h-full border-round surface-border shadow-2 animation-duration-500 scalein origin-top" />
                            <span class="block text-900 text-lg font-semibold mt-4">Mail</span>
                        </div>
                    </div>
                </div> -->


              <faq/>

                <div class="grid justify-content-between my-6 pt-4 md:my-8">
                    <div class="col-12 md:col-2 text-center md:text-left">
                        <a class="cursor-pointer" href="#">
                            <svg width="124" height="22" viewBox="0 0 124 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4851 0L0 20.9465H3.53702L10.4856 6.07843L17.2944 20.9465H20.9715L10.4851 0Z" fill="var(--primary-color)" />
                                <path d="M13.84 15.7927L16.2077 21.0016H11.7682L13.84 15.7927Z" fill="var(--primary-color)" />
                                <path d="M9.04645 21.0016L6.67875 15.7927L4.60701 21.0016H9.04645Z" fill="var(--primary-color)" />
                                <path d="M40.9033 14.5217H34.771L33.1753 18.0007H30.8467L37.9346 2.77661L44.772 18.0007H42.4062L40.9033 14.5217ZM40.022 12.49L37.8975 7.61938L35.6709 12.49H40.022Z" fill="var(--primary-color)" />
                                <path
                                    d="M52.4927 12.1838V18.0007H50.3311V3.67651H52.7803C53.9802 3.67651 54.8862 3.76001 55.4985 3.927C56.117 4.09399 56.6613 4.40942 57.1314 4.87329C57.954 5.67733 58.3652 6.69165 58.3652 7.91626C58.3652 9.22746 57.9261 10.2665 57.0479 11.0334C56.1696 11.8004 54.9852 12.1838 53.4946 12.1838H52.4927ZM52.4927 10.1799H53.2998C55.2852 10.1799 56.2778 9.4161 56.2778 7.88843C56.2778 6.41024 55.2542 5.67114 53.207 5.67114H52.4927V10.1799Z"
                                    fill="var(--primary-color)"
                                />
                                <path
                                    d="M63.6367 10.7737C63.6367 8.75741 64.3758 7.02563 65.854 5.57837C67.326 4.1311 69.0949 3.40747 71.1607 3.40747C73.2017 3.40747 74.952 4.13729 76.4116 5.59692C77.8775 7.05656 78.6104 8.80998 78.6104 10.8572C78.6104 12.9167 77.8744 14.664 76.4024 16.0989C74.9242 17.54 73.1398 18.2605 71.0493 18.2605C69.2001 18.2605 67.5394 17.6204 66.0674 16.3401C64.447 14.9237 63.6367 13.0683 63.6367 10.7737ZM65.8169 10.8015C65.8169 12.3848 66.3488 13.6868 67.4126 14.7073C68.4702 15.7278 69.6918 16.238 71.0772 16.238C72.5801 16.238 73.848 15.7185 74.8809 14.6794C75.9138 13.628 76.4302 12.3477 76.4302 10.8386C76.4302 9.31095 75.9199 8.03068 74.8994 6.9978C73.8851 5.95874 72.6296 5.43921 71.1328 5.43921C69.6423 5.43921 68.3836 5.95874 67.357 6.9978C66.3303 8.0245 65.8169 9.2924 65.8169 10.8015Z"
                                    fill="var(--primary-color)"
                                />
                                <path d="M87.2495 3.67651V15.969H91.4615V18.0007H85.0879V3.67651H87.2495Z" fill="var(--primary-color)" />
                                <path d="M99.4327 3.67651V15.969H103.645V18.0007H97.271V3.67651H99.4327Z" fill="var(--primary-color)" />
                                <path
                                    d="M108.146 10.7737C108.146 8.75741 108.885 7.02563 110.363 5.57837C111.835 4.1311 113.604 3.40747 115.67 3.40747C117.711 3.40747 119.461 4.13729 120.921 5.59692C122.387 7.05656 123.12 8.80998 123.12 10.8572C123.12 12.9167 122.384 14.664 120.912 16.0989C119.433 17.54 117.649 18.2605 115.559 18.2605C113.709 18.2605 112.049 17.6204 110.577 16.3401C108.956 14.9237 108.146 13.0683 108.146 10.7737ZM110.326 10.8015C110.326 12.3848 110.858 13.6868 111.922 14.7073C112.98 15.7278 114.201 16.238 115.586 16.238C117.089 16.238 118.357 15.7185 119.39 14.6794C120.423 13.628 120.94 12.3477 120.94 10.8386C120.94 9.31095 120.429 8.03068 119.409 6.9978C118.394 5.95874 117.139 5.43921 115.642 5.43921C114.152 5.43921 112.893 5.95874 111.866 6.9978C110.84 8.0245 110.326 9.2924 110.326 10.8015Z"
                                    fill="var(--primary-color)"
                                />
                            </svg>
                        </a>
                    </div>

                    <div class="col-12 md:col-10 lg:col-7">
                        <div class="grid text-center md:text-left">
                            <div class="col-12 md:col-3">
                                <h4 class="font-medium text-xl line-height-3 mb-3 text-900">Company</h4>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">About Us</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">News</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Investor Relations</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Careers</a>
                                <a class="line-height-3 block cursor-pointer text-700">Media Kit</a>
                            </div>

                            <div class="col-12 md:col-3 mt-4 md:mt-0">
                                <h4 class="font-medium text-xl line-height-3 mb-3 text-900">Resources</h4>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Get Started</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Learn</a>
                                <a class="line-height-3 block cursor-pointer text-700">Case Studies</a>
                            </div>

                            <div class="col-12 md:col-3 mt-4 md:mt-0">
                                <h4 class="font-medium text-xl line-height-3 mb-3 text-900">Community</h4>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Discord</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Events</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">FAQ</a>
                                <a class="line-height-3 block cursor-pointer text-700">Blog</a>
                            </div>

                            <div class="col-12 md:col-3 mt-4 md:mt-0">
                                <h4 class="font-medium text-xl line-height-3 mb-3 text-900">Legal</h4>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Brand Policy</a>
                                <a class="line-height-3 block cursor-pointer mb-2 text-700">Privacy Policy</a>
                                <a class="line-height-3 block cursor-pointer text-700">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <AppDarkAndLightMode simple />
</template>

<style scoped>
.bg-circle {
    width: 1000px;
    height: 1000px;
    border-radius: 50%;
    background-image: linear-gradient(140deg, var(--primary-color), var(--surface-ground) 80%);
    position: absolute;
    opacity: 0.25;
    z-index: -1;
}
</style>
