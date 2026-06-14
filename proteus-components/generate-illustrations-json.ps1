# generate-illustrations-json.ps1
# Lee todos los SVGs de illustrations-svg/ y genera illustrations-svg.json
# Uso: .\generate-illustrations-json.ps1

$folder = Join-Path $PSScriptRoot "illustrations-svg"
$output = Join-Path $PSScriptRoot "illustrations-svg.json"

$files = Get-ChildItem -Path $folder -Filter "*.svg" | Sort-Object Name

if ($files.Count -eq 0) {
    Write-Error "No se encontraron archivos SVG en $folder"
    exit 1
}

$entries = @{}
foreach ($file in $files) {
    $slug = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $entries[$slug] = $content
}

$json = $entries | ConvertTo-Json -Depth 2
$json | Out-File -FilePath $output -Encoding utf8 -NoNewline

Write-Output "Generado: $output"
Write-Output "Ilustraciones incluidas ($($files.Count)):"
$files | ForEach-Object { Write-Output "  - $([System.IO.Path]::GetFileNameWithoutExtension($_.Name))" }
