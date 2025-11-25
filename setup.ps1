# Quick Setup Script for Aura Application
# Run this in PowerShell from the project root

Write-Host "🌟 Aura Application - Quick Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js installed: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL is accessible
Write-Host "Checking PostgreSQL..." -ForegroundColor Yellow
try {
    psql --version | Out-Null
    Write-Host "✓ PostgreSQL client found" -ForegroundColor Green
} catch {
    Write-Host "⚠ PostgreSQL client not found in PATH" -ForegroundColor Yellow
    Write-Host "  You can either:" -ForegroundColor Yellow
    Write-Host "  1. Install PostgreSQL locally" -ForegroundColor Yellow
    Write-Host "  2. Use Docker: docker run --name aura-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aura_db -p 5432:5432 -d postgres:16" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Frontend installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location server
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Backend installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

# Setup environment files
Write-Host ""
Write-Host "📝 Setting up environment files..." -ForegroundColor Yellow

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created server/.env from template" -ForegroundColor Green
    Write-Host "⚠ IMPORTANT: Edit server/.env with your PostgreSQL credentials" -ForegroundColor Yellow
} else {
    Write-Host "✓ server/.env already exists" -ForegroundColor Green
}

Set-Location ..

if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env from template" -ForegroundColor Green
} else {
    Write-Host "✓ .env already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🗄️ Database Setup" -ForegroundColor Yellow
Write-Host "Before proceeding, ensure PostgreSQL is running and accessible." -ForegroundColor Cyan
Write-Host ""
$response = Read-Host "Do you want to initialize the database now? (Y/N)"

if ($response -eq 'Y' -or $response -eq 'y') {
    Set-Location server
    
    Write-Host "Generating Prisma client..." -ForegroundColor Cyan
    npm run prisma:generate
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Prisma client generated" -ForegroundColor Green
        
        Write-Host "Running database migrations..." -ForegroundColor Cyan
        npm run prisma:migrate
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Database migrations completed" -ForegroundColor Green
        } else {
            Write-Host "✗ Database migration failed" -ForegroundColor Red
            Write-Host "  Check your DATABASE_URL in server/.env" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✗ Prisma client generation failed" -ForegroundColor Red
    }
    
    Set-Location ..
} else {
    Write-Host "⚠ Skipping database setup. Run these commands later:" -ForegroundColor Yellow
    Write-Host "  cd server" -ForegroundColor Cyan
    Write-Host "  npm run prisma:generate" -ForegroundColor Cyan
    Write-Host "  npm run prisma:migrate" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To start the application:" -ForegroundColor Cyan
Write-Host ""
Write-Host "Terminal 1 - Backend:" -ForegroundColor Yellow
Write-Host "  cd server" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Frontend:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  - INTEGRATION_GUIDE.md - Setup and integration details" -ForegroundColor White
Write-Host "  - DEPLOYMENT.md - Deployment instructions" -ForegroundColor White
Write-Host "  - server/README.md - API documentation" -ForegroundColor White
Write-Host ""
