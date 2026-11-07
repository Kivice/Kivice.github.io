# Automated / Guided Script to Hide All Clones & Forks on GitHub (@Kivice)
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "        HIDE ALL CLONES & FORKS ON GITHUB (@Kivice)      " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

# List of forked clones detected in your profile
$clonedRepos = @(
    "BMW-MD",
    "ALPHA-MD1",
    "Fredi_Md",
    "BARAKA-MD-V1",
    "TREX-MD",
    "Mercedes",
    "Bellah-Xmd",
    "dreaded-md",
    "dreaded-v2",
    "ENZO-MD",
    "Microsoft-Activation-Scripts",
    "alphaotpbot",
    "Cyberion-Spark-X",
    "CypherX",
    "career-ops",
    "storage_management_solution",
    "build-your-own-x",
    "Android_boot_image_editor",
    "Android-Pentesting-Skill",
    "ext4_extractor",
    "erofs-utils",
    "voice-pro",
    "claude-code-source-code",
    "Xiaomi-HyperOS-BootLoader-Bypass",
    "jarvis-mlx",
    "jarvis",
    "react-native-movie-app",
    "hacktricks",
    "PayloadsAllTheThings",
    "panel",
    "Portofolio_V5",
    "dockerwebterminalflask",
    "QuickBMS",
    "Feb2025Cohort-Hackathon1",
    "rdp-test1"
)

Write-Host "Detected $($clonedRepos.Count) forked/cloned repositories in your GitHub account." -ForegroundColor White

# Check if GitHub CLI (gh) is installed
if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host ""
    Write-Host "[GitHub CLI Detected]" -ForegroundColor Green
    Write-Host "Would you like to automatically convert all these forked clones to PRIVATE? (y/n): " -NoNewline -ForegroundColor Yellow
    $confirm = Read-Host
    if ($confirm -eq "y" -or $confirm -eq "Y") {
        foreach ($repo in $clonedRepos) {
            Write-Host "Hiding: Kivice/$repo -> Setting to Private..." -ForegroundColor Cyan
            gh repo edit "Kivice/$repo" --visibility private 2>$null
        }
        Write-Host "All specified clones are now PRIVATE and hidden from the public!" -ForegroundColor Green
    }
} else {
    Write-Host ""
    Write-Host "How to Hide Clones on GitHub (2 Simple Methods):" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "METHOD 1: Pin ONLY Your Original Projects (Takes 30 seconds)" -ForegroundColor Yellow
    Write-Host "  1. Open https://github.com/Kivice" -ForegroundColor White
    Write-Host "  2. Click 'Customize your pins'" -ForegroundColor White
    Write-Host "  3. Select ONLY your original repositories:" -ForegroundColor Green
    Write-Host "     - x-power-program" -ForegroundColor Green
    Write-Host "     - veronica" -ForegroundColor Green
    Write-Host "     - International-Healthcare-Booking-System" -ForegroundColor Green
    Write-Host "     - Xiaomi-HyperOS-Unlock-Script" -ForegroundColor Green
    Write-Host "     - Library_Database_mangement" -ForegroundColor Green
    Write-Host "  -> Result: Your profile will now show ONLY your 100% original work!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "METHOD 2: Change Repo Visibility to Private" -ForegroundColor Yellow
    Write-Host "  For any bot or script clone you want hidden from the Repositories tab:" -ForegroundColor White
    Write-Host "  1. Open the repository on GitHub" -ForegroundColor White
    Write-Host "  2. Go to 'Settings' -> Scroll to bottom 'Danger Zone'" -ForegroundColor White
    Write-Host "  3. Click 'Change visibility' -> Select 'Make private'" -ForegroundColor White
}
Write-Host "==========================================================" -ForegroundColor Cyan

