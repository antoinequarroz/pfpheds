# Script pour restaurer les fichiers corrompus depuis Git
Write-Host "Restauration des fichiers corrompus..." -ForegroundColor Green

# Fonction pour restaurer un fichier depuis Git
function Restore-FileFromGit {
    param($OldPath, $NewPath)
    
    try {
        Write-Host "Restauration: $OldPath -> $NewPath" -ForegroundColor Yellow
        git show "HEAD:$OldPath" > "temp_restore.vue"
        Copy-Item "temp_restore.vue" $NewPath -Force
        Remove-Item "temp_restore.vue" -Force -ErrorAction SilentlyContinue
        Write-Host "Restaure: $NewPath" -ForegroundColor Green
    }
    catch {
        Write-Host "Erreur lors de la restauration de $OldPath : $_" -ForegroundColor Red
    }
}

# Liste des fichiers a restaurer (ancien chemin -> nouveau chemin)
$filesToRestore = @{
    "src/components/Notes/NotebookSidebar.vue" = "src/components/editor/notes/NotebookSidebar.vue"
    "src/components/Notes/PageList.vue" = "src/components/editor/notes/PageList.vue"
    "src/components/Notes/TiptapSimpleEditor.vue" = "src/components/editor/notes/TiptapSimpleEditor.vue"
    "src/components/Utils/SearchResults.vue" = "src/components/common/utils/SearchResults.vue"
    "src/components/Utils/VersionningComponent.vue" = "src/components/common/utils/VersionningComponent.vue"
    "src/components/Utils/GlobalSearch.vue" = "src/components/common/utils/GlobalSearch.vue"
    "src/components/Bibliotheque/Social/MainFeed.vue" = "src/components/social/library/MainFeed.vue"
    "src/components/Bibliotheque/Social/LeftSidebar.vue" = "src/components/social/library/LeftSidebar.vue"
    "src/components/Bibliotheque/Social/RightSidebar.vue" = "src/components/social/library/RightSidebar.vue"
}

# Restaurer chaque fichier
foreach ($oldPath in $filesToRestore.Keys) {
    $newPath = $filesToRestore[$oldPath]
    
    # Verifier si le fichier de destination existe et est vide ou tres petit
    if (Test-Path $newPath) {
        $fileSize = (Get-Item $newPath).Length
        if ($fileSize -lt 100) {  # Fichier probablement vide ou corrompu
            Restore-FileFromGit $oldPath $newPath
        }
    } else {
        Restore-FileFromGit $oldPath $newPath
    }
}

Write-Host "Restauration terminee!" -ForegroundColor Green
