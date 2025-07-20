#!/usr/bin/env pwsh
# Start Development Environment
Write-Host "🚀 Starting MercadoLibre Development Environment..." -ForegroundColor Green

# Clean up first
Write-Host "Step 1: Cleaning up..." -ForegroundColor Cyan
& .\cleanup-ports.ps1

Start-Sleep -Seconds 2

# Start Backend
Write-Host "Step 2: Starting Backend on port 3001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Backend starting...'; npm run dev"

Start-Sleep -Seconds 5

# Start Frontend  
Write-Host "Step 3: Starting Frontend on port 5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host 'Frontend starting...'; npm run dev"

Write-Host "🎉 Development servers are starting!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host "🔧 Backend:  http://localhost:3001" -ForegroundColor Blue
Write-Host ""
Write-Host "💡 To stop all servers: .\cleanup-ports.ps1" -ForegroundColor Yellow 