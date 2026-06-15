@echo off
title V.V.P. Polytechnic Launcher & Deployer
:menu
cls
echo =======================================================
echo     V.V.P. Polytechnic Redesign Console Toolkit
echo =======================================================
echo.
echo  [1] Start Local Server (http://localhost:8080)
echo  [2] Sync Changes to GitHub (Add, Commit, Push)
echo  [3] Launch Server + Open Browser
echo  [4] Exit
echo.
echo =======================================================
set /p opt="Select an option (1-4): "

if "%opt%"=="1" goto server
if "%opt%"=="2" goto git
if "%opt%"=="3" goto launch
if "%opt%"=="4" goto exit

:server
echo.
echo Starting local web server on port 8080 (Cache disabled)...
npx http-server -p 8080 -c-1
pause
goto menu

:git
echo.
echo Staging changes...
git add .
set /p msg="Enter commit message (or press enter for default): "
if "%msg%"=="" (
    git commit -m "Update website assets and responsive layout"
) else (
    git commit -m "%msg%"
)
echo Pushing to remote main branch...
git push origin main
echo.
echo Git sync completed!
pause
goto menu

:launch
echo.
echo Launching http://localhost:8080 in default browser...
start http://localhost:8080
echo Starting local web server on port 8080 (Cache disabled)...
npx http-server -p 8080 -c-1
pause
goto menu

:exit
exit
