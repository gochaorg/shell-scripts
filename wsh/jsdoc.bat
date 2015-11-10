::@echo off
setlocal enabledelayedexpansion

:: directory of this file
set SCRIPT_DIR=%~dp0

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Settings

:: directory of JSDOC
set JSDOC_DIR=%SCRIPT_DIR%jsdoc-toolkit\

:: encoding
set ENCODING=windows-1251

::-Djsdoc.template.dir=$JSDOCTEMPLATEDIR
set TEMPLATE_DIR=%JSDOC_DIR%templates\jsdoc\

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: create launch

set JVMOPT=-Djsdoc.dir=%JSDOC_DIR% -Djsdoc.template.dir=%TEMPLATE_DIR%
set OPTS=--encoding=%ENCODING% --verbose

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: help for jsdoc
:: USAGE: java -jar jsrun.jar app/run.js [OPTIONS] <SRC_DIR> <SRC_FILE> ...
::
::OPTIONS:
::  -a or --allfunctions
::          Include all functions, even undocumented ones.
::
::  -c or --conf
::          Load a configuration file.
::
::  -d=<PATH> or --directory=<PATH>
::          Output to this directory (defaults to "out").
::
::  -D="myVar:My value" or --define="myVar:My value"
::          Multiple. Define a variable, available in JsDoc as JSDOC.opt.D.myVar.
::
::  -e=<ENCODING> or --encoding=<ENCODING>
::          Use this encoding to read and write files.
::
::  -E="REGEX" or --exclude="REGEX"
::          Multiple. Exclude files based on the supplied regex.
::
::  -h or --help
::          Show this message and exit.
::
::  -m or --multiples
::          Don't warn about symbols being documented more than once.
::
::  -n or --nocode
::          Ignore all code, only document comments with @name tags.
::
::  -o=<PATH> or --out=<PATH>
::          Print log messages to a file (defaults to stdout).
::
::  -p or --private
::          Include symbols tagged as private, underscored and inner symbols.
::
::  -q or --quiet
::          Do not output any messages, not even warnings.
::
::  -r=<DEPTH> or --recurse=<DEPTH>
::          Descend into src directories.
::
::  -s or --suppress
::          Suppress source code output.
::
::  -S or --securemodules
::          Use Secure Modules mode to parse source code.
::
::  -t=<PATH> or --template=<PATH>
::          Required. Use this template to format the output.
::
::  -T or --test
::          Run all unit tests and exit.
::
::  -u or --unique
::          Force file names to be unique, but not based on symbol names.
::
::  -v or --verbose
::          Provide verbose feedback about what is happening.
::
::  -x=<EXT>[,EXT]... or --ext=<EXT>[,EXT]...
::          Scan source files with the given extension/s (defaults to js).

java %JVMOPT% -jar %JSDOC_DIR%jsrun.jar %JSDOC_DIR%app\run.js %OPTS% %*