# Script pour creer du contenu minimal pour les fichiers vides
Write-Host "=== CREATION DE CONTENU MINIMAL ===" -ForegroundColor Green

# Liste des fichiers a traiter
$files = @(
    "src/views/auth/AccessView.vue",
    "src/views/auth/AuthErrorView.vue", 
    "src/views/home/MapView.vue",
    "src/views/institutions/InstitutionListView.vue",
    "src/views/social/HashtagView.vue",
    "src/components/ui/buttons/ButtonNavbar.vue",
    "src/components/ui/buttons/SwitchColor.vue"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
        if ([string]::IsNullOrWhiteSpace($content)) {
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file)
            $componentName = $baseName -replace "View$", ""
            
            $minimal = @"
<template>
  <div class="$($componentName.ToLower())-container">
    <h2>$componentName</h2>
    <p>Composant en cours de développement</p>
  </div>
</template>

<script>
export default {
  name: '$baseName'
}
</script>

<style scoped>
.$($componentName.ToLower())-container {
  padding: 20px;
  text-align: center;
}
</style>
"@
            
            Set-Content -Path $file -Value $minimal -Encoding UTF8
            Write-Host "Contenu minimal cree pour: $file" -ForegroundColor Green
        }
    }
}

Write-Host "Termine!" -ForegroundColor Green
