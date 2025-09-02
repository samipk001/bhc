@echo off
echo Starting video optimization process...

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed. Please install Node.js to run this script.
    exit /b 1
)

REM Create necessary directories
if not exist "..\public\videos\mobile\low" mkdir "..\public\videos\mobile\low"
if not exist "..\public\videos\mobile" mkdir "..\public\videos\mobile"
if not exist "..\public\videos\tablet" mkdir "..\public\videos\tablet"
if not exist "..\public\videos\desktop" mkdir "..\public\videos\desktop"

echo Running video optimization script...
node generate-video-versions.js

if %ERRORLEVEL% NEQ 0 (
    echo Error: Video optimization failed.
    exit /b 1
)

echo Video optimization completed successfully!
echo Optimized videos are available in the public/videos directory.