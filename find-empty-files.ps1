# Script pour identifier les fichiers Vue vides
Write-Host "=== IDENTIFICATION DES FICHIERS VIDES ===" -ForegroundColor Green

$emptyFiles = @()

# Chercher tous les fichiers Vue
Get-ChildItem -Path "src" -Recurse -Filter "*.vue" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    
    # Fichier vide ou quasi-vide
    if ([string]::IsNullOrWhiteSpace($content) -or $content.Length -lt 50) {
        $relativePath = $_.FullName.Replace((Get-Location).Path + "\", "")
        $emptyFiles += $relativePath
        Write-Host "VIDE: $relativePath" -ForegroundColor Red
    }
}

Write-Host "`nNombre de fichiers vides: $($emptyFiles.Count)" -ForegroundColor Yellow

# Sauvegarder la liste dans un fichier
$emptyFiles | Out-File -FilePath "empty-files-list.txt" -Encoding UTF8
Write-Host "Liste sauvegardee dans: empty-files-list.txt" -ForegroundColor Green
