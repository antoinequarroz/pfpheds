# Script pour restaurer les fichiers vides avec Git
Write-Host "=== RESTAURATION AVEC GIT ===" -ForegroundColor Green

# Lire la liste des fichiers vides
if (Test-Path "empty-files-list.txt") {
    $emptyFiles = Get-Content "empty-files-list.txt"
    
    Write-Host "Restauration de $($emptyFiles.Count) fichiers..." -ForegroundColor Yellow
    
    $restored = 0
    $failed = 0
    
    foreach ($file in $emptyFiles) {
        if ([string]::IsNullOrWhiteSpace($file)) { continue }
        
        # Convertir le chemin Windows en chemin Git
        $gitPath = $file.Replace("\", "/")
        
        Write-Host "Restauration: $gitPath" -ForegroundColor Cyan
        
        try {
            # Restaurer le fichier depuis Git
            $result = git checkout HEAD -- $gitPath 2>&1
            
            # Verifier si le fichier a ete restaure
            if (Test-Path $file) {
                $content = Get-Content $file -Raw -ErrorAction SilentlyContinue
                if (-not [string]::IsNullOrWhiteSpace($content) -and $content.Length -gt 50) {
                    Write-Host "  ✓ RESTAURE avec succes" -ForegroundColor Green
                    $restored++
                } else {
                    Write-Host "  ⚠ Toujours vide apres restauration" -ForegroundColor Yellow
                    $failed++
                }
            } else {
                Write-Host "  ✗ Fichier non trouve" -ForegroundColor Red
                $failed++
            }
        } catch {
            Write-Host "  ✗ Erreur: $($_.Exception.Message)" -ForegroundColor Red
            $failed++
        }
    }
    
    Write-Host "`n=== RESUME ===" -ForegroundColor Cyan
    Write-Host "Fichiers restaures: $restored" -ForegroundColor Green
    Write-Host "Echecs: $failed" -ForegroundColor Red
    
} else {
    Write-Host "Fichier empty-files-list.txt non trouve!" -ForegroundColor Red
    Write-Host "Executez d'abord find-empty-files.ps1" -ForegroundColor Yellow
}

Write-Host "`nRestauration terminee!" -ForegroundColor Green
