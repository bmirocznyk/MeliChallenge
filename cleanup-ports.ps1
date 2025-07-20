# Kill Development Servers Script
Write-Host "🧹 Cleaning up development servers..." -ForegroundColor Yellow

# Kill all Node.js processes
Write-Host "Killing Node.js processes..." -ForegroundColor Cyan
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Write-Host "✅ Node.js processes killed" -ForegroundColor Green

# Kill specific ports
Write-Host "Freeing up ports..." -ForegroundColor Cyan

# Get processes using port 3001 and 5173
$processes3001 = netstat -ano | findstr ":3001" | ForEach-Object { ($_ -split '\s+')[-1] } | Sort-Object -Unique
$processes5173 = netstat -ano | findstr ":5173" | ForEach-Object { ($_ -split '\s+')[-1] } | Sort-Object -Unique

# Kill processes on port 3001
foreach ($processId in $processes3001) {
    if ($processId -match '^\d+$') {
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Port 3001 freed (PID: $processId)" -ForegroundColor Green
    }
}

# Kill processes on port 5173
foreach ($processId in $processes5173) {
    if ($processId -match '^\d+$') {
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Write-Host "✅ Port 5173 freed (PID: $processId)" -ForegroundColor Green
    }
}

Write-Host "🎉 Cleanup complete! Ports 3001 and 5173 are now free." -ForegroundColor Green 