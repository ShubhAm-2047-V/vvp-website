@echo off
title V.V.P. Polytechnic Server Launcher
echo =======================================================
echo     V.V.P. Polytechnic Solapur - Web Server Launcher
echo =======================================================
echo.
echo [1/2] Launching http://localhost:8080 in default browser...
start http://localhost:8080
echo.
echo [2/2] Initialising local server on port 8080...
echo (You can close this window to stop the server at any time)
echo.
npx http-server -p 8080 -c-1
pause
