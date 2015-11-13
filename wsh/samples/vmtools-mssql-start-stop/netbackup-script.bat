@rem script for net backup
@rem by nt.gocha@gmail.com
@echo off
setlocal enabledelayedexpansion

:: directory of this file
set SCRIPT_DIR=%~dp0

set LOGDIR=%SCRIPT_DIR%
set EXEDIR=%SCRIPT_DIR%

:: scripts
set SHUTDOWN_MSSQL="%EXEDIR%mssql-stop.exe"
set STARTUP_MSSQL="%EXEDIR%mssql-start.exe"

set HANDLE=yes
set HANDLE_EXE="%EXEDIR%sysinternals-handle.EXE"
set HANDLE_BEFORE_DOWN_LOG="%LOGDIR%handle-before-shutdown.log"
set HANDLE_AFTER_DOWN_LOG="%LOGDIR%handle-after-shutdown.log"
set HANDLE_BEFORE_UP_LOG="%LOGDIR%handle-before-startup.log"
set HANDLE_AFTER_UP_LOG="%LOGDIR%handle-after-startup.log"

set LOG="%LOGDIR%netbackup.log"
echo prepare mssql for netbackup %1 > %LOG%
date /T >> %LOG%
time /T >> %LOG%
echo.   >> %LOG%

:: =====================================================
:: parse args
if "%1%" == "freeze"     goto doFreeze
if "%1%" == "thaw"       goto doThaw
goto end

:: =====================================================
:: shutdown mssql
:doFreeze

if "%HANDLE%" == "yes" (
	%HANDLE_EXE% > %HANDLE_BEFORE_DOWN_LOG%
)

echo shutdown mssql
echo shutdown mssql >> %LOG%

%SHUTDOWN_MSSQL% >> %LOG%

if errorlevel 0 (
	if "%HANDLE%" == "yes" (
		%HANDLE_EXE% > %HANDLE_AFTER_DOWN_LOG%
	)
	
	goto End
)
goto error

:: =====================================================
:: startup mssql
:doThaw

if "%HANDLE%" == "yes" (
	%HANDLE_EXE% > %HANDLE_BEFORE_UP_LOG%
)

echo startup mssql
echo startup mssql >> %LOG%
%STARTUP_MSSQL% >> %LOG%

if errorlevel 0 (
	if "%HANDLE%" == "yes" (
		%HANDLE_EXE% > %HANDLE_AFTER_UP_LOG%
	)

	goto End
)
goto error

:end
echo SUCCESS
echo SUCCESS >> %LOG%

date /T >> %LOG%
time /T >> %LOG%
echo.   >> %LOG%

exit /b 0

:error
echo ERROR 
echo ERROR >> %LOG%

date /T >> %LOG%
time /T >> %LOG%
echo.   >> %LOG%

exit /b 1