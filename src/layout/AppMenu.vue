<script setup>
import { ref } from 'vue';

import AppSubMenu from './AppSubMenu.vue';

const model = ref([
    {
        label: 'Listes',
        icon: 'pi pi-home',
        items: [
            {
                label: 'Étudiant',
                icon: 'pi pi-users',
                to: '/etudiant_list'
            },
            {
                label: 'Profil Users Admin',
                icon: 'pi pi-users',
                to: '/profilAdmin/4qoWztDujictoqTEJvJK6xF1Zcr1'
            },
            {
                label: 'Institution',
                icon: 'pi pi-home',
                to: '/institution_list'
            },
            {
              label: 'Enseignant',
              icon: 'pi pi-flag',
              to: '/enseignent_list'
            },
            {
              label: 'Praticien formateur',
              icon: 'pi pi-check-circle',
              to: '/praticien_formateur_list'
            },
            {
              label: 'Utilisateur',
              icon: 'pi pi-user',
              to: '/user_list'
            }
        ]
    },
    {
        label: 'Outils',
        icon: 'pi pi-fw pi-cog',
        items: [
            {
                label: 'Votation',
                icon: 'pi pi-check-square',
                items: [
                {
                  label: 'Management Offres',
                  icon: 'pi pi-cog',
                  to: '/management_offre'
                },

                {
                  label: 'Management Votation Lese',
                  icon: 'pi pi-cog',
                  to: '/management_votation_lese'
                },

                {
                  label: 'Management Votation Etudiant',
                  icon: 'pi pi-cog',
                  to: '/management_votation_etudiants'
                }
                ]
            },
            {
              label: 'PFP',
              icon: 'pi pi-fw pi-comment',
              items: [
                {
                  label: 'Création PFP',
                  icon: 'pi pi-fw pi-image',
                  to: '/pfp_details'
                },
                {
                  label: 'Gantt PFP',
                  icon: 'pi pi-fw pi-image',
                  to: '/gantt'
                },
                {
                  label: 'Management Places',
                  icon: 'pi pi-cog',
                  to: '/management_places'
                },
              
                {
                  label: 'Management Places Safe',
                  icon: 'pi pi-cog',
                  to: '/management_places_safe'
                },
                {
                  label: 'Stage Repartition',
                  icon: 'pi pi-cog',
                  to: '/stage_repartition'
                }
           
              ]
            },
            {
              label: 'Télécharger données',
              icon: 'pi pi-download',
              to: 'exportDataToJSON' // ajouter le lien pour le téléchargement des données
            }
        ]
    },
    {
        label: 'Informations',
        icon: 'pi pi-fw pi-star-fill',
        items: [
            {
              label: 'Statistiques',
              icon: 'pi pi-chart-bar',
              to: '/statistiques'
            },
            {
              label: 'FAQ',
              icon: 'pi pi-question',
              to: '/faq_admin'
            },
            {
              label: 'Documentation',
              icon: 'pi pi-fw pi-info-circle',
              to: '/documentation'
            }
        ]
    },
]);
</script>

<template>
    <AppSubMenu :model="model" />
</template>

<style lang="scss" scoped></style>
