# Script pour identifier et restaurer les fichiers Vue vides
Write-Host "=== RESTAURATION DES FICHIERS VIDES ===" -ForegroundColor Green

# Fonction pour vérifier si un fichier Vue est vide ou invalide
function Test-VueFileValid {
    param($filePath)
    
    if (-not (Test-Path $filePath)) {
        return $false
    }
    
    $content = Get-Content $filePath -Raw -ErrorAction SilentlyContinue
    
    # Fichier vide
    if ([string]::IsNullOrWhiteSpace($content)) {
        return $false
    }
    
    # Fichier sans template ni script
    if ($content -notmatch '<template>' -and $content -notmatch '<script>') {
        return $false
    }
    
    return $true
}

# Trouver tous les fichiers Vue
Write-Host "`nRecherche des fichiers Vue..." -ForegroundColor Yellow
$vueFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.vue"

$emptyFiles = @()
$validFiles = @()

foreach ($file in $vueFiles) {
    if (-not (Test-VueFileValid $file.FullName)) {
        $emptyFiles += $file
        Write-Host "✗ VIDE: $($file.FullName)" -ForegroundColor Red
    } else {
        $validFiles += $file
        Write-Host "✓ OK: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "`n=== RÉSUMÉ ===" -ForegroundColor Cyan
Write-Host "Fichiers valides: $($validFiles.Count)" -ForegroundColor Green
Write-Host "Fichiers vides/invalides: $($emptyFiles.Count)" -ForegroundColor Red

if ($emptyFiles.Count -gt 0) {
    Write-Host "`n=== RESTAURATION DEPUIS GIT ===" -ForegroundColor Yellow
    
    foreach ($file in $emptyFiles) {
        $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
        Write-Host "Restauration de: $relativePath" -ForegroundColor Yellow
        
        try {
            git checkout HEAD -- $relativePath
            
            # Vérifier si la restauration a fonctionné
            if (Test-VueFileValid $file.FullName) {
                Write-Host "✓ Restauré avec succès: $relativePath" -ForegroundColor Green
            } else {
                Write-Host "⚠ Toujours vide après restauration: $relativePath" -ForegroundColor Yellow
                
                # Créer un contenu minimal
                $minimalContent = @"
<template>
  <div class="component-placeholder">
    <p>Composant en cours de développement</p>
  </div>
</template>

<script>
export default {
  name: '$($file.BaseName)'
}
</script>

<style scoped>
.component-placeholder {
  padding: 20px;
  text-align: center;
  color: #666;
}
</style>
"@
                Set-Content -Path $file.FullName -Value $minimalContent -Encoding UTF8
                Write-Host "✓ Contenu minimal créé: $relativePath" -ForegroundColor Cyan
            }
        } catch {
            Write-Host "✗ Erreur lors de la restauration: $relativePath" -ForegroundColor Red
            Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`n🎉 RESTAURATION TERMINÉE !" -ForegroundColor Green
