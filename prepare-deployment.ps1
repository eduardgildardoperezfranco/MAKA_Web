# MAKA Web - Hostinger Deployment Preparation Script
# This script renames files and folders for Hostinger compatibility
# Run this script in PowerShell as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MAKA Web - Hostinger Deployment Prep" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set the working directory to the script location
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
if ($scriptPath) {
    Set-Location $scriptPath
} else {
    $scriptPath = $PWD.Path
}

Write-Host "Working Directory: $scriptPath" -ForegroundColor Gray
Write-Host ""

# Create deployment folder
$deployFolder = Join-Path $scriptPath "deploy"
if (Test-Path $deployFolder) {
    Write-Host "Removing existing deploy folder..." -ForegroundColor Yellow
    Remove-Item -Path $deployFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $deployFolder | Out-Null
Write-Host "Created deploy folder: $deployFolder" -ForegroundColor Green

# Define file renames (old name -> new name)
$fileRenames = @{
    "Index.html" = "index.html"
    "Script.JS" = "script.js"
    "Style.css" = "style.css"
    "MAKA 3D.jpeg" = "maka-3d.jpeg"
    "Paraiconos.jpg" = "paraiconos.jpg"
    "Maka_Animated.mp4" = "maka-animated.mp4"
}

# Files to copy directly (no rename needed)
$filesToCopy = @(
    "translations.js",
    "galleryManager.js",
    "galleryPreview.js",
    "assetsGallery.json",
    "carouselFiles.js",
    "robots.txt",
    "sitemap.xml",
    "terms.html",
    ".htaccess",
    ".gitattributes"
)

# Copy and rename root files
Write-Host ""
Write-Host "Processing root files..." -ForegroundColor Cyan

foreach ($file in $filesToCopy) {
    $sourcePath = Join-Path $scriptPath $file
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $deployFolder -Force
        Write-Host "  Copied: $file" -ForegroundColor Green
    } else {
        Write-Host "  Not found: $file" -ForegroundColor Yellow
    }
}

# Rename and copy files
foreach ($oldName in $fileRenames.Keys) {
    $newName = $fileRenames[$oldName]
    $sourcePath = Join-Path $scriptPath $oldName
    $destPath = Join-Path $deployFolder $newName
    
    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $destPath -Force
        Write-Host "  Renamed: $oldName -> $newName" -ForegroundColor Green
    } else {
        Write-Host "  Not found: $oldName" -ForegroundColor Yellow
    }
}

# Copy the new gallery.html
$newGalleryPath = Join-Path $scriptPath "gallery-new.html"
if (Test-Path $newGalleryPath) {
    Copy-Item -Path $newGalleryPath -Destination (Join-Path $deployFolder "gallery.html") -Force
    Write-Host "  Copied: gallery-new.html -> gallery.html" -ForegroundColor Green
} else {
    # Copy original gallery.html if new one doesn't exist
    $origGallery = Join-Path $scriptPath "gallery.html"
    if (Test-Path $origGallery) {
        Copy-Item -Path $origGallery -Destination (Join-Path $deployFolder "gallery.html") -Force
        Write-Host "  Copied: gallery.html (original)" -ForegroundColor Yellow
    }
}

# Copy the new index.html
$newIndexPath = Join-Path $scriptPath "index.html"
if (Test-Path $newIndexPath) {
    Write-Host "  index.html already exists (new version)" -ForegroundColor Green
}

# Create src/assets folder structure
Write-Host ""
Write-Host "Creating folder structure..." -ForegroundColor Cyan

$srcAssetsFolder = Join-Path $deployFolder "src\assets"
$galleryPicsFolder = Join-Path $srcAssetsFolder "gallery-pictures"
$galleryVidsFolder = Join-Path $srcAssetsFolder "gallery-videos"

New-Item -ItemType Directory -Path $galleryPicsFolder -Force | Out-Null
New-Item -ItemType Directory -Path $galleryVidsFolder -Force | Out-Null
Write-Host "  Created: src\assets\gallery-pictures" -ForegroundColor Green
Write-Host "  Created: src\assets\gallery-videos" -ForegroundColor Green

# Copy and rename gallery pictures
Write-Host ""
Write-Host "Processing gallery pictures..." -ForegroundColor Cyan

$sourcePicsFolder = Join-Path $scriptPath "src\Assets\Gallery Pictures"
if (Test-Path $sourcePicsFolder) {
    $pics = Get-ChildItem -Path $sourcePicsFolder -File
    $renamedCount = 0
    
    foreach ($pic in $pics) {
        # Convert filename to lowercase and replace spaces with hyphens
        $newName = $pic.Name.ToLower() -replace ' ', '-' -replace '_', '-'
        # Remove duplicate hyphens
        $newName = $newName -replace '-+', '-'
        # Remove parentheses
        $newName = $newName -replace '\(', '' -replace '\)', ''
        
        $destPath = Join-Path $galleryPicsFolder $newName
        Copy-Item -Path $pic.FullName -Destination $destPath -Force
        $renamedCount++
    }
    
    Write-Host "  Processed $renamedCount images" -ForegroundColor Green
} else {
    Write-Host "  Source folder not found: $sourcePicsFolder" -ForegroundColor Red
}

# Copy and rename gallery videos
Write-Host ""
Write-Host "Processing gallery videos..." -ForegroundColor Cyan

$sourceVidsFolder = Join-Path $scriptPath "src\Assets\Gallery Videos"
if (Test-Path $sourceVidsFolder) {
    $vids = Get-ChildItem -Path $sourceVidsFolder -File
    $renamedCount = 0
    
    foreach ($vid in $vids) {
        # Convert filename to lowercase and replace spaces with hyphens
        $newName = $vid.Name.ToLower() -replace ' ', '-' -replace '_', '-'
        # Remove duplicate hyphens
        $newName = $newName -replace '-+', '-'
        
        $destPath = Join-Path $galleryVidsFolder $newName
        Copy-Item -Path $vid.FullName -Destination $destPath -Force
        $renamedCount++
    }
    
    Write-Host "  Processed $renamedCount videos" -ForegroundColor Green
} else {
    Write-Host "  Source folder not found: $sourceVidsFolder" -ForegroundColor Red
}

# Create a simple .htaccess for immediate fix
Write-Host ""
Write-Host "Creating minimal .htaccess for immediate fix..." -ForegroundColor Cyan

$minimalHtaccess = @"
# MAKA Web - Minimal Hostinger Configuration
# This is a minimal configuration to fix 403 errors immediately

# Directory Index - Critical for fixing 403
DirectoryIndex index.html index.htm Index.html

# Prevent directory browsing
Options -Indexes

# Set default charset
AddDefaultCharset UTF-8

# MIME types for common files
<IfModule mod_mime.c>
    AddType text/html .html .htm
    AddType text/css .css
    AddType application/javascript .js
    AddType image/jpeg .jpg .jpeg
    AddType image/png .png
    AddType video/mp4 .mp4
    AddType application/json .json
</IfModule>
"@

$htaccessPath = Join-Path $deployFolder ".htaccess"
$minimalHtaccess | Out-File -FilePath $htaccessPath -Encoding ASCII -Force
Write-Host "  Created minimal .htaccess" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "DEPLOYMENT FOLDER READY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Location: $deployFolder" -ForegroundColor White
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Upload all contents of 'deploy' folder to Hostinger public_html/" -ForegroundColor White
Write-Host "2. Set folder permissions to 755" -ForegroundColor White
Write-Host "3. Set file permissions to 644" -ForegroundColor White
Write-Host "4. Enable SSL in Hostinger control panel" -ForegroundColor White
Write-Host "5. After SSL is active, replace .htaccess with full version" -ForegroundColor White
Write-Host ""
Write-Host "IMPORTANT: The main entry point is now 'index.html' (lowercase)" -ForegroundColor Red
Write-Host ""

# Open the deploy folder in Explorer
Write-Host "Opening deploy folder in Explorer..." -ForegroundColor Gray
Start-Process "explorer.exe" -ArgumentList $deployFolder