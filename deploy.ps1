# 1-Click Git & Deployment Automation Script for Portfolio V1
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Deploying Portfolio V1 (High-Performance Engine)       " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check if git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Error: Git is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# 2. Check if git repository is initialized
if (-not (Test-Path ".git")) {
    Write-Host "[1/4] Initializing Git repository..." -ForegroundColor Green
    git init
    git branch -M main
} else {
    Write-Host "[1/4] Git repository already initialized." -ForegroundColor Green
}

# 3. Stage all files
Write-Host "[2/4] Staging updated portfolio files..." -ForegroundColor Green
git add .

# 4. Commit changes
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
$commitMsg = "Portfolio V1 Upgrade: Zero-lag performance, real GitHub projects, Netlify config ($timestamp)"
Write-Host "[3/4] Committing with message: '$commitMsg'..." -ForegroundColor Green
git commit -m "$commitMsg"

# 5. Remote instructions
Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Build & Commit Complete!                               " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "To push to your GitHub repository (e.g., computech34/MyPortifolio):" -ForegroundColor White
Write-Host "  git remote add origin https://github.com/computech34/YOUR_REPO.git" -ForegroundColor Yellow
Write-Host "  git push -u origin main --force" -ForegroundColor Yellow
Write-Host ""
Write-Host "To deploy to Netlify:" -ForegroundColor White
Write-Host "  1. Open app.netlify.com" -ForegroundColor White
Write-Host "  2. Drag and drop this 'Portfolio V1' folder into the Netlify Deploys tab!" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

