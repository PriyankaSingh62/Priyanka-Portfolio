@echo off
echo Starting Portfolio Website Server...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python found, starting server on port 8000...
    python -m http.server 8000
    goto :end
)

REM Check if Node.js is available  
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js found, starting server on port 8000...
    node server.js
    goto :end
)

echo ERROR: Neither Python nor Node.js found!
echo.
echo Please install either Python or Node.js to run the local server.
echo Alternatively, you can manually open the HTML files, but some features may not work properly.
echo.
echo To test the new tab functionality:
echo 1. Right-click on index.html and select "Open with" -> your browser
echo 2. When clicking links, right-click and select "Open in new tab"
echo.
pause

:end