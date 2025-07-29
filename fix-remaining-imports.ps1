# Script pour corriger les imports restants apres restructuration
Write-Host "Correction des imports restants..." -ForegroundColor Green

# Fonction pour corriger les imports dans un fichier
function Fix-ImportsInFile {
    param($FilePath)
    
    try {
        $content = Get-Content $FilePath -Raw -ErrorAction Stop
        $modified = $false
        
        # Corrections specifiques
        $replacements = @{
            'components/Bibliotheque/Social' = 'components/social/library'
            'components/Bibliotheque/Profile' = 'components/user/library'  
            'components/Bibliotheque/Buttons' = 'components/ui/buttons'
            'components/Notes/' = 'components/editor/notes/'
            'components/Profile/' = 'components/user/profile/'
            'components/Utils/' = 'components/common/utils/'
            'components/Filters/' = 'components/common/filters/'
        }
        
        foreach ($old in $replacements.Keys) {
            if ($content -match [regex]::Escape($old)) {
                $content = $content -replace [regex]::Escape($old), $replacements[$old]
                $modified = $true
            }
        }
        
        if ($modified) {
            Set-Content -Path $FilePath -Value $content -NoNewline -ErrorAction Stop
            Write-Host "Corrige: $FilePath" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "Erreur avec $FilePath : $_" -ForegroundColor Red
    }
}

# Traiter tous les fichiers Vue et JS
Get-ChildItem -Path "src" -Recurse -Include "*.vue", "*.js" | ForEach-Object {
    Fix-ImportsInFile $_.FullName
}

Write-Host "Correction terminee!" -ForegroundColor Green
