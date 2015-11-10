@rem compile and start scripts.
@rem by nt.gocha@gmail.com
@echo off
setlocal enabledelayedexpansion

:::::::::::::::::::::::::::::::::
:: Parse args
set NOLOG=
set SCRIPT_ARGS=
for %%a in (%*) do (
	if "%%a"=="/nolog" (
		set NOLOG=REM
	) else (
		set arg=%%a
		set SCRIPT_ARGS=!SCRIPT_ARGS! %%a
	)
)

:::::::::::::::::::::::::::::::::
:: Config
:: directory of this file
set SCRIPT_DIR=%~dp0

:: compiled java script file
set COMPILED_JS=%SCRIPT_DIR%_compiled.js

:::::::::::::::::::::::::::::::
:: check compiled java script file, remove if exist
if exist "!COMPILED_JS!" (
	del /F "!COMPILED_JS!"
)

:: generate file
%NOLOG% echo compile in !COMPILED_JS!
echo // Automatic generated file > !COMPILED_JS!

:: search java script file
%NOLOG% echo search .js in !SCRIPT_DIR!

for /R "%SCRIPT_DIR%jslib\" %%i in ( "*.js" ) do (
::	echo found "%%i"
	if not "%%i"=="!COMPILED_JS!" (
		type "%%i" >> !COMPILED_JS! 
%NOLOG% echo include %%i
	)
)

for %%i in ( "%SCRIPT_DIR%*.js" ) do (
	if not "%%i"=="!COMPILED_JS!" (
		type "%%i" >> !COMPILED_JS! 
%NOLOG% echo include %%i
	)
)

:: execute
:: true / false
set DELETE_COMPILED_JS=false
CScript "!COMPILED_JS!" //Nologo %SCRIPT_ARGS%
::if errorlevel 1 ( 
::	echo "aaa"
::	set DELETE_COMPILED_JS=false
::)
::echo error = %ERRORLEVEL%
::if not "%ERRORLEVEL%"=="0" (
::	echo "ERROR"
::)

:: check compiled java script file, remove if exist
if !DELETE_COMPILED_JS!==true (
	if exist "!COMPILED_JS!" (
%NOLOG% echo delete !COMPILED_JS!
		del /F "!COMPILED_JS!"	
	)
)