@echo off
setlocal enabledelayedexpansion

:: directory of this file
set SCRIPT_DIR=%~dp0
set rm=%SCRIPT_DIR%bin\rm.exe

%rm% -rfv %SCRIPT_DIR%doc\*
call jsdoc.bat --directory=%SCRIPT_DIR%doc\ %SCRIPT_DIR%\jslib