# Script simple pour restaurer les fichiers Vue vides
Write-Host "=== RESTAURATION FICHIERS VIDES ===" -ForegroundColor Green

# Liste des fichiers problématiques identifiés
$problematicFiles = @(
    "src/views/apps/tools/MobileToolsView.vue",
    "src/App.vue",
    "src/components/ui/BlockViewer.vue",
    "src/views/auth/AccessView.vue",
    "src/views/auth/AuthErrorView.vue",
    "src/views/home/MapView.vue",
    "src/views/institutions/InstitutionListView.vue",
    "src/views/home/HistoryView.vue",
    "src/views/admin/ProfileAdminView.vue",
    "src/views/users/ProfileView.vue",
    "src/views/social/HashtagView.vue",
    "src/views/social/MentionView.vue",
    "src/views/admin/users/UserListView.vue",
    "src/views/social/CommunityInfoView.vue",
    "src/views/admin/institutions/InstitutionListView.vue",
    "src/components/admin/forms/NewUserForm.vue",
    "src/components/admin/forms/PraticienFormateurForm.vue",
    "src/views/admin/institutions/InstitutionDetailsView.vue",
    "src/components/admin/details/EtudiantDetails.vue",
    "src/components/admin/details/VotationLese.vue",
    "src/views/admin/votations/VotationView.vue",
    "src/views/admin/votations/VotationManagementView.vue",
    "src/components/admin/details/ManagementPlacesSafe.vue",
    "src/components/admin/details/PlacesAssigned.vue",
    "src/components/admin/details/ManagementPFPEnCours.vue",
    "src/views/admin/validation/ValidationView.vue",
    "src/views/admin/places/PlaceStatsView.vue",
    "src/views/apps/chat/IndexChat.vue",
    "src/views/apps/events/EventManagementView.vue"
)

foreach ($file in $problematicFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
        if ([string]::IsNullOrWhiteSpace($content) -or $content.Length -lt 50) {
            Write-Host "Restauration: $file" -ForegroundColor Yellow
            git checkout HEAD -- $file
            
            # Verifier si ca a marche
            $newContent = Get-Content $file -Raw -ErrorAction SilentlyContinue
            if ([string]::IsNullOrWhiteSpace($newContent)) {
                Write-Host "Toujours vide, creation contenu minimal: $file" -ForegroundColor Cyan
                $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file)
                $minimal = @"
<template>
  <div>
    <p>$baseName - En cours de developpement</p>
  </div>
</template>

<script>
export default {
  name: '$baseName'
}
</script>
"@
                Set-Content -Path $file -Value $minimal -Encoding UTF8
            }
        }
    }
}

Write-Host "Restauration terminee!" -ForegroundColor Green
