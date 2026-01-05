$files = Get-ChildItem "promotions" -File | Where-Object { $_.Extension -in '.png','.jpg','.jpeg','.mp4' } | Select-Object -ExpandProperty Name
$quoted = $files | ForEach-Object { "'promotions/$_'" }
$array = $quoted -join ','
$content = "export const carouselFiles = [$array];"
Set-Content -Path "carouselFiles.js" -Value $content