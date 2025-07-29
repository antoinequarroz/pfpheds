# Script pour creer du contenu minimal pour TOUS les fichiers vides restants
Write-Host "=== CREATION CONTENU MINIMAL POUR TOUS LES FICHIERS VIDES ===" -ForegroundColor Green

# Lire la liste des fichiers vides
if (Test-Path "empty-files-list.txt") {
    $emptyFiles = Get-Content "empty-files-list.txt" | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
    
    Write-Host "Traitement de $($emptyFiles.Count) fichiers..." -ForegroundColor Yellow
    
    foreach ($file in $emptyFiles) {
        if (Test-Path $file) {
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file)
            $componentName = $baseName -replace "View$", "" -replace "Form$", "" -replace "Details$", ""
            
            # Determiner le type de composant
            $componentType = "Composant"
            if ($file -like "*View.vue") { $componentType = "Vue" }
            elseif ($file -like "*Form.vue") { $componentType = "Formulaire" }
            elseif ($file -like "*Details.vue") { $componentType = "Details" }
            elseif ($file -like "*Sidebar.vue") { $componentType = "Sidebar" }
            
            $minimal = @"
<template>
  <div class="$($componentName.ToLower())-container">
    <div class="placeholder-content">
      <h3>$componentType : $componentName</h3>
      <p>Ce composant est en cours de développement.</p>
      <p class="file-info">Fichier: $baseName.vue</p>
    </div>
  </div>
</template>

<script>
export default {
  name: '$baseName',
  data() {
    return {
      // Données du composant à implémenter
    }
  },
  methods: {
    // Méthodes du composant à implémenter
  }
}
</script>

<style scoped>
.$($componentName.ToLower())-container {
  padding: 20px;
}

.placeholder-content {
  text-align: center;
  padding: 40px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.file-info {
  font-size: 0.9em;
  color: #666;
  margin-top: 10px;
}
</style>
"@
            
            Set-Content -Path $file -Value $minimal -Encoding UTF8
            Write-Host "✓ Contenu créé pour: $file" -ForegroundColor Green
        }
    }
    
    Write-Host "`n🎉 TOUS LES FICHIERS VIDES ONT ÉTÉ TRAITÉS !" -ForegroundColor Green
} else {
    Write-Host "Fichier empty-files-list.txt non trouvé!" -ForegroundColor Red
}
