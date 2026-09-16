@echo off
cd /d "%~dp0"

echo Dang khoi dong API (NestJS)...
start "HTSV API" cmd /k "pnpm dev:api"

echo Dang khoi dong Web (Vite)...
start "HTSV WEB" cmd /k "pnpm dev:web"

echo Doi server khoi dong...
timeout /t 8 /nobreak >nul

start http://localhost:5173/

echo.
echo Da mo trinh duyet. Neu trang khong hien thi, xem cua so "HTSV WEB"
echo de biet dung cong nao (vi du 5174, 5175 neu 5173 dang ban).
pause
