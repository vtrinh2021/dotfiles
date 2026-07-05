# Deploys the Confidante theme (vae-theme/) to the VAÉ Shopify store.
# Usage:  powershell -ExecutionPolicy Bypass -File deploy-confidante.ps1
# Prompts for the app's client secret unless SHOPIFY_CLIENT_SECRET is set.

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Store      = '3e69v2-8h.myshopify.com'
$ApiVersion = '2025-01'
$ThemeName  = 'Confidante'
$ThemeDir   = Join-Path $PSScriptRoot 'vae-theme'

$ClientId = $env:SHOPIFY_CLIENT_ID
if (-not $ClientId) { $ClientId = '62e3a4d9184976a9e27a0aa151411eb7' }
$ClientSecret = $env:SHOPIFY_CLIENT_SECRET
if (-not $ClientSecret) {
  $sec = Read-Host 'Shopify app client secret (shpss_...)' -AsSecureString
  $ClientSecret = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
}

if (-not (Test-Path $ThemeDir)) {
  throw "vae-theme folder not found next to this script. Run from the dotfiles repo on branch claude/quirky-curie-pulm3m."
}

Add-Type -AssemblyName System.Web.Extensions
$Json = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$Json.MaxJsonLength = 67108864

function Invoke-ShopifyJson {
  param([string]$Method, [string]$Path, $BodyObject = $null, [int]$Attempt = 1)
  $uri = "https://$Store/admin/api/$ApiVersion/$Path"
  $headers = @{ 'X-Shopify-Access-Token' = $script:AccessToken }
  try {
    if ($null -ne $BodyObject) {
      # UTF-8 bytes, not a string: keeps VAÉ, em-dashes, etc. intact.
      $bytes = [System.Text.Encoding]::UTF8.GetBytes($Json.Serialize($BodyObject))
      return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers `
        -ContentType 'application/json; charset=utf-8' -Body $bytes
    }
    return Invoke-RestMethod -Method $Method -Uri $uri -Headers $headers
  } catch {
    $status = $null
    try { $status = [int]$_.Exception.Response.StatusCode } catch {}
    if ($status -eq 429 -and $Attempt -le 5) {
      Start-Sleep -Seconds (2 * $Attempt)
      return Invoke-ShopifyJson -Method $Method -Path $Path -BodyObject $BodyObject -Attempt ($Attempt + 1)
    }
    $detail = ''
    try {
      $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
      $detail = $reader.ReadToEnd()
    } catch {}
    throw "Shopify API $Method $Path failed (HTTP $status): $detail"
  }
}

Write-Host "==> Requesting access token..." -ForegroundColor Cyan
$tokenResp = Invoke-RestMethod -Method Post -Uri "https://$Store/admin/oauth/access_token" `
  -ContentType 'application/x-www-form-urlencoded' `
  -Body "grant_type=client_credentials&client_id=$ClientId&client_secret=$ClientSecret"
$script:AccessToken = $tokenResp.access_token
if (-not $script:AccessToken) { throw 'No access_token in response.' }
Write-Host "    Token OK (scopes: $($tokenResp.scope))"

Write-Host "==> Creating unpublished theme '$ThemeName'..." -ForegroundColor Cyan
$existing = (Invoke-ShopifyJson GET 'themes.json').themes | Where-Object { $_.name -eq $ThemeName }
if ($existing) {
  $theme = $existing | Select-Object -First 1
  Write-Host "    Reusing existing theme id $($theme.id) (files will be overwritten)."
} else {
  $theme = (Invoke-ShopifyJson POST 'themes.json' @{ theme = @{ name = $ThemeName; role = 'unpublished' } }).theme
  Write-Host "    Created theme id $($theme.id)."
}
$themeId = $theme.id

# Sections must exist before the JSON templates that reference them.
$uploadOrder = @('assets', 'snippets', 'sections', 'layout', 'config', 'locales', 'templates')
$files = @()
foreach ($folder in $uploadOrder) {
  $dir = Join-Path $ThemeDir $folder
  if (Test-Path $dir) {
    $files += Get-ChildItem $dir -Recurse -File | Sort-Object FullName
  }
}

Write-Host "==> Uploading $($files.Count) files..." -ForegroundColor Cyan
$failed = @()
foreach ($file in $files) {
  $key = $file.FullName.Substring($ThemeDir.Length + 1) -replace '\\', '/'
  $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  try {
    Invoke-ShopifyJson PUT "themes/$themeId/assets.json" @{ asset = @{ key = $key; value = $content } } | Out-Null
    Write-Host "    ok  $key"
  } catch {
    Write-Host "    FAIL $key -> $_" -ForegroundColor Red
    $failed += $key
  }
  Start-Sleep -Milliseconds 400
}

if ($failed.Count -gt 0) {
  Write-Host "==> DONE WITH ERRORS. Failed files:" -ForegroundColor Red
  $failed | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
} else {
  Write-Host "==> All files uploaded." -ForegroundColor Green
}

Write-Host ""
Write-Host "Preview:  https://$Store/?preview_theme_id=$themeId" -ForegroundColor Green
Write-Host "Editor:   https://admin.shopify.com/store/3e69v2-8h/themes/$themeId/editor" -ForegroundColor Green

Write-Host ""
Write-Host "==> Product images on the store (paste this whole block back to Claude):" -ForegroundColor Cyan
try {
  $products = (Invoke-ShopifyJson GET 'products.json?limit=250&fields=id,title,handle,images').products
  $lines = @()
  foreach ($p in $products) {
    foreach ($img in $p.images) {
      $line = "$($p.title) | $($img.src)"
      $lines += $line
      Write-Host "    $line"
    }
  }
  $lines | Set-Content -Encoding UTF8 (Join-Path $PSScriptRoot 'product-images.txt')
  Write-Host "    (also saved to product-images.txt)"
} catch {
  Write-Host "    Could not list products (does the app have read_products scope?): $_" -ForegroundColor Yellow
}
