@echo off
setlocal enabledelayedexpansion

:::::::::::::::::::::::::::::::::::::::::::::::::::::
:: directory of this file
set SCRIPT_DIR=%~dp0
cd %SCRIPT_DIR%

set EXE_NAME=prog.exe
set ZIP_NAME=prog.zip
set zip=%SCRIPT_DIR%bin\7z.exe a -tzip

:::::::::::::::::::::::::::::::::::::::::::::::::::::
if exist %EXE_NAME% del /f %EXE_NAME%
if exist %ZIP_NAME% del /f %ZIP_NAME%
%zip% %ZIP_NAME% @zip-content.txt
copy /b bin\zipsfx + bin\options-begin.txt + zip-exe-options.txt + bin\options-end.txt + %ZIP_NAME% %EXE_NAME%
if exist %ZIP_NAME% del /f %ZIP_NAME%