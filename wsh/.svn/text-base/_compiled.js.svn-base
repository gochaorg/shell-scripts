// Automatic generated file 
/**
@class Объект для работы с сетью
*/
var net = {
	_net : null,
	_init : function(){
		if( this._net==null )this._net = WScript.CreateObject("WScript.Network");
	},
	/**
	Возвращает имя компьютера
	@returns {string} Имя компьютера
	*/
	computerName : function(){
		this._init();
		return this._net.ComputerName;
	},
	/**
	Возвращает имя пользователя в домене
	@returns {string} Имя пользователя в домене
	*/
	userDomain : function(){
		this._init();
		return this._net.UserDomain;
	},
	/**
	Возвращает имя пользователя
	@returns {string} Имя пользователя
	*/
	userName : function(){
		this._init();
		return this._net.UserName;
	},
	/**
	Добавить виндовый сетевой принтер
	@param {string} printerPath Путь к принтеру. Например: <code>"\\\\Server\\Print1"</code>
	@param {string} driver=optional Имя драйвера. Используется в Windows 9x. Параметр не обязательный.
	@param {string} port=optional порт (LPT1). Используется в Windows 9x. Параметр не обязательный.
	*/
	addWindowsPrinter : function(printerPath){
		this._init();
		if( arguments.length==3 )return this._net.AddWindowsPrinterConnection(printerPath,arguments[1],arguments[2]);
		if( arguments.length==2 )return this._net.AddWindowsPrinterConnection(printerPath,arguments[1]);
		return this._net.AddWindowsPrinterConnection(printerPath);
	},
	
	/*
	Добавляет сетевой принтер MS-DOS к вашему компьютеру.
	@param {string} localName Локальное название принтера
	@param {string} printerPath Сетевой путь к принтеру
	@param {bool} updateProfile=optional (true/false) Обновлять профиль пользователя
	@param {string} userName=optional Логин пользователя
	@param {string} password=optional Пароль пользователя
	addPrinter : function(localName,printerPath,updateProfile,userName,password){
		this._init();
		if( arguments.length==2 )
			return this._net.AddPrinterConnection( localName, printerPath );
		if( arguments.length==3 )
			return this._net.AddPrinterConnection( localName, printerPath, updateProfile );
		if( arguments.length==4 )
			return this._net.AddPrinterConnection( localName, printerPath, updateProfile, userName );
		if( arguments.length==5 )
			return this._net.AddPrinterConnection( localName, printerPath, updateProfile, userName, password );
	},
	*/
	
	/**
	Монтирует сетевой диск
	@param {string} drive - Имя диска. Например <b>"E:"</b>
	@param {string} smbPath - Сетевой путь. Например <b>"\\\\Server\\Public"</b>
	@param {bool} updateProfile=optional (true/false) обновлять профиль пользователя
	@param {string} userName=optional Логин пользователя на сервере
	@param {string} password=optional Пароль пользователя на сервере
	*/
	mountSmb : function(drive,smbPath,updateProfile,userName,password){
		this._init();
		if( arguments.length>0 ){
			if( typeof(drive)=="string" ){
				if( drive.length==1 )drive = drive + ":";
				else if( drive.length==3 )drive = drive.substr(0,2);
			}
		}
		if( arguments.length==2 )return this._net.MapNetworkDrive( drive, smbPath );
		if( arguments.length==3 )return this._net.MapNetworkDrive( drive, smbPath,updateProfile );
		if( arguments.length==4 )return this._net.MapNetworkDrive( drive, smbPath,updateProfile,userName );
		if( arguments.length==5 )return this._net.MapNetworkDrive( drive, smbPath,updateProfile,userName,password );
	},
	
	/**
	Демонтирует сетевой диск
	@param {string} drive - Имя диска. Например <b>"E:"</b>
	@param {bool} force=optional (true/false) Форсировать, даже если диск используется
	@param {bool} updateProfile=optional (true/false) обновлять профиль пользователя
	*/
	umountSmb : function( drive,force,updateProfile ){
		this._init();
		if( arguments.length>0 ){
			if( typeof(drive)=="string" ){
				if( drive.length==1 )drive = drive + ":";
				else if( drive.length==3 )drive = drive.substr(0,2);
			}
		}
		if( arguments.length==1 )return this._net.RemoveNetworkDrive( drive );
		if( arguments.length==2 )return this._net.RemoveNetworkDrive( drive,force );
		if( arguments.length==3 )return this._net.RemoveNetworkDrive( drive,force,updateProfile );
	},
	
	/**
	Возвращает ассоциативный массив смонтированных сетевых дисков
	@returns {array[string/string]} ассоциативный массив смонтированных сетевых дисков: Диск / Сетевой путь
	*/
	mountedSmb : function(){
		this._init();
		var drives = this._net.EnumNetworkDrives();
		var res = [];
		for(var i = 0; i < drives.length; i += 2) {
			res[drives.Item(i)] = drives.Item(i + 1);
        }
		return res;
	}
};/**
@class Работа с опкружением
*/
var env = {
	/**
	Возвращает массив переданных аргументов.
	@returns {string[]} массив переданных аргументов.
	*/
	args : function() {
		var res = [];
		var objArgs = WScript.Arguments;
		for (var i = 0; i < objArgs.length; i++)
		{
		   res[res.length] = objArgs(i);
		}
		return res;
	},
	
	_shell : null,
	
	_init : function(){
		if( this._shell==null )this._shell = WScript.CreateObject("WScript.Shell");
	},
	
	/**
	Возвращает ассоц-массив переменных окружения
	@returns {array[string/string]} Ассоц. массив ключ / значение переменных окружения.
	*/
	vars : function() {
		this._init();
		var res = [];
		var en = new Enumerator(this._shell.Environment);
		for( ; !en.atEnd() ; en.moveNext() ){
			var k = en.item();
			var key = "";
			for( var i=0; i<k.length; i++ ){
				var c = k.charAt(i);
				if( c=='=' )break;
				key = key + c;
			}
			var val = this._shell.Environment.Item( key );
			res[key] = val;
		}
		return res;
	},
	
	/**
	Возвращает значение специальной папки
	@param {string} name Имя папки.
	Возможные значения:
	<ul>
		<li>AllUsersDesktop</li>
		<li>AllUsersStartMenu</li>
		<li>AllUsersPrograms</li>
		<li>Desktop</li>
		<li>Favorites</li>
		<li>Fonts</li>
		<li>MyDocuments</li>
		<li>NetHood</li>
		<li>PrintHood</li>
		<li>Programs</li>
		<li>Recent</li>
		<li>SendTo</li>
		<li>StartMenu</li>
		<li>Startup</li>
		<li>Templates</li>
	</ul>
	@returns {string} Значение
	*/
	specialFolder : function( name ) {
		this._init();
		return this._shell.SpecialFolders( name );
	},
	
	/**
	Возвращает ассоциативный массив специальных папок.
	@returns {array[string/string]} ассоциативный массив специальных папок.
	*/
	specialFolders : function(){
		var res = [];
		res["AllUsersDesktop"] = this.specialFolder( "AllUsersDesktop" );
		res["AllUsersStartMenu"] = this.specialFolder( "AllUsersStartMenu" );
		res["AllUsersPrograms"] = this.specialFolder( "AllUsersPrograms" );
		res["Desktop"] = this.specialFolder( "Desktop" );
		res["Favorites"] = this.specialFolder( "Favorites" );
		res["Fonts"] = this.specialFolder( "Fonts" );
		res["MyDocuments"] = this.specialFolder( "MyDocuments" );
		res["NetHood"] = this.specialFolder( "NetHood" );
		res["PrintHood"] = this.specialFolder( "PrintHood" );
		res["Programs"] = this.specialFolder( "Programs" );
		res["Recent"] = this.specialFolder( "Recent" );
		res["SendTo"] = this.specialFolder( "SendTo" );
		res["StartMenu"] = this.specialFolder( "StartMenu" );
		res["Startup"] = this.specialFolder( "Startup" );
		res["Templates"] = this.specialFolder( "Templates" );
		return res;
	}
};
/**
Выводит на консоль текст переданный в параметрах
*/
function print(){
	var i = 0;
	for( i=0; i<arguments.length; i++ ){
		WScript.StdOut.Write( arguments[i] );
	}
}

/**
Выводит на консоль текст переданный в параметрах 
и переводит курсор на следующую строку.
*/
function println(){
	var i = 0;
	for( i=0; i<arguments.length; i++ ){
		WScript.StdOut.Write( arguments[i] );
	}
	WScript.StdOut.WriteBlankLines( 1 );
}

/**
Читает строку из консоли
@returns {string} Строка
*/
function readln(){
	return WScript.StdIn.ReadLine();
}

/**
@class Класс описывающий привод
@constructor
@param drive - Объект Scripting.FileSystemObject Drive
*/
function drive(drive){
	return {
		/** 
		Буква диска, без двоеточия.
		@memberOf drive#
		*/
		letter : drive.DriveLetter,
		
		/**
		Тип файловой системы
		@memberOf drive#
		*/
		system : drive.FileSystem,
		
		/**
		Число - тип привода. <br/>
		<b>0</b> - Фиг знает <br/>
        <b>1</b> - Изымаемое устройство (Removable) - флешка <br/>
        <b>2</b> - Фиксированное устройство - HDD <br/>
        <b>3</b> - Сетевое устройство - SMB <br/>
        <b>4</b> - CD-ROM <br/>
        <b>5</b> - Диск в памяти.
		@memberOf drive#
		*/
		type : drive.DriveType,
		
		/**
		Кол-во свободного места в байтах
		@memberOf drive#
		*/
		freeSize : drive.FreeSpace,
		
		/**
		Булево (true/false) - готов привод к использованю.
		@memberOf drive#
		*/
		isReady : drive.IsReady,
		
		/**
		Путь - Буква диска и двоеточие.
		@memberOf drive#
		*/
		path : drive.Path,
		
		/**
		Путь к корневой папке. Например: <b>C:\</b>.
		@memberOf drive#
		*/
		folder : drive.RootFolder,
		
		/**
		Серйный номер диска.
		@memberOf drive#
		*/
		serial : drive.SerialNumber,
		
		/**
		Путь к SMB. Например: <b>\\VBOXSVR\desktop</b>.
		@memberOf drive#
		*/
		share : drive.ShareName,
		
		/**
		Общий размер в байтах.
		@memberOf drive#
		*/
		size : drive.TotalSize,
		
		/**
		Имя диска. Не является его буквой.
		@memberOf drive#
		*/
		name : drive.VolumeName
	};
}

/**
@class Поток ввода / вывода текстовых данных для файла
@constructor
@param {file} file Файл
@param {string} mode Режим ввода/вывода.  <br/>
Значение:
<ul>
	<li><b>"r"</b> - Для чтения </li>
	<li><b>"w"</b> - Для записи </li>
	<li><b>"a"</b> - Для записи в конец файла.</li>
</ul>
@param {string} format=optional Формат файла (ASCII/UNICODE). <br/>
Возможные варианты: 
<ul>
	<li><b>"def"</b> | <b>"d"</b> - По умолчанию </li>
	<li><b>"ascii"</b> | <b>"a"</b> - Ascii </li>
	<li><b>"unicode"</b> | <b>"u"</b> - Unicode. </li>
</ul>
*/
function textStream( file, mode, format ){
	var textStr;
	var mod;
	if( mode=="r" )mod = 1;
	if( mode=="w" )mod = 2;
	if( mode=="a" )mod = 8;
	var frmt = 2;
	if( arguments.length>2 ){
		if( format=="def" || format=="d" )frmt = 2;
		if( format=="ascii" || format=="a" )frmt = 0;
		if( format=="unicode" || format=="u" )frmt = 1;
	}
	if( file.isFile() ){
		var f = io.fso.GetFile( file.path() );
		textStr = f.OpenAsTextStream( mode,frmt );
	}else if( !file.exists() ){
		var f = io.fso.GetFolder( file.parent().path() );
		var overWrite = ( mode=="w" || mode=="a" );
		if( arguments.length==2 ) {
			textStr = f.CreateTextFile( file.name(), overWrite );
		} else {
			var unicode = ( frmt==1 || frmt==2 );
			textStr = f.CreateTextFile( file.name(), overWrite, unicode );
		}
	}else{
		var f = file;
		throw {message:"can't open textStream",file:f};
	}
	return {
		/**
		Поток TextStream
		@memberOf textStream#
		*/
		stream : textStr,
		
		/**
		Закрывает поток
		@memberOf textStream#
		*/
		close : function(){
			this.stream.Close();
		},
		
		/**
		Печатает текст в файл и дополняет в конце символами перевода строки
		@memberOf textStream#
		*/
		println : function(){
			for( var i=0; i<arguments.length; i++ ){
				this.stream.Write( arguments[i] );
			}
			this.stream.WriteBlankLines( 1 );
		},
		
		/**
		Печатает текст в файл
		@memberOf textStream#
		*/
		print : function(){
			for( var i=0; i<arguments.length; i++ ){
				this.stream.Write( arguments[i] );
			}
		},
		
		/**
		Читает текст из файла
		@returns {string} Строка считанная из файла
		@memberOf textStream#
		*/
		readln : function(){
			return this.stream.ReadLine();
		},
		
		/**
		Возвращает признак что достигнут конец файла
		@returns {bool} Достигнут конец файла
		@memberOf textStream#
		*/
		eof : function(){
			return this.stream.AtEndOfStream;
		},
		
		/**
		Читает все содержимое файла
		@returns {string} Содержимое файла
		@memberOf textStream#
		*/
		readAll : function(){
			return this.stream.ReadAll();
		}
	};
}

/**
@class Описывает из себя путь к файлу/директории и предоставляет методы манимуляции с ним.
@constructor
@param {string} name Имя файла/директории
@param fileObj Может быть null
@param dirObj Может быть null
*/
function file(name,fileObj,dirObj){
	return {
		/**
		Путь к файлу/директории
		@memberOf file#
		*/
		_path : name,
		
		/**		
		@memberOf file#
		*/
		_file : fileObj,
		
		/**
		@memberOf file#
		*/
		_dir  : dirObj,
		
		/**
		Возвращает путь к файлу/директории
		@memberOf file#
		@returns {string} Путь
		*/
		path : function (){
			return this._path;
		},

		/**
		Открывает файл для чтения/записи
		@param {string} mode Режим ввода/вывода.  <br/>
		Значение:
		<ul>
			<li><b>"r"</b> - Для чтения </li>
			<li><b>"w"</b> - Для записи </li>
			<li><b>"a"</b> - Для записи в конец файла.</li>
		</ul>
		@param {string} format=optional Формат файла (ASCII/UNICODE). <br/>
		Возможные варианты: 
		<ul>
			<li><b>"def"</b> | <b>"d"</b> - По умолчанию </li>
			<li><b>"ascii"</b> | <b>"a"</b> - Ascii </li>
			<li><b>"unicode"</b> | <b>"u"</b> - Unicode. </li>
		</ul>
		@returns {textStream} Текстовый поток или null
		*/
		open : function( mode, format ){
			if( arguments.length==1 )return textStream( this, mode );
			else if( arguments.length==2 )return textStream( this, mode, format );
			return null;
		},
		
		_trim : function( srcText, text ){
			var t = srcText;
			while(true){
				if( t.length < text.length )return t;
				if( t.length == text.length ){
					if( t == text )return "";
					return t;
				}
				if( t.substr( t.length-text.length ) == text ){
					t = t.substr( 0, t.length-text.length );
				}else{
					return t;
				}
			}
		},
		
		/**
		Создает объект file являющийся дочерним по отношении к данному
		@param {string} name Имя дочернего файла
		@returns {file} Файл
		@memberOf file#
		*/
		child : function( name ){
			var path = this._trim(this.path(),"\\");
			path = this._trim(path,"/");
			path = path + "\\" + name;
			return file( path, null, null );
		},
		
		/**
		Возвращает имя файла
		@returns {string} Имя файла
		@memberOf file#
		*/
		name : function(){
			io._init();
			if( this.isFile() ){
				if( this._file==null )this._file = io.fso.GetFile( this.path() );
				return this._file.Name;
			}else if( this.isDir() ){
				if( this._dir==null )this._dir = io.fso.GetFolder( this.path() );
				return this._dir.Name;
			}else{
				return io.fso.GetFileName( this.path() );
			}
		},
		
		/**
		Возвращает расширение файла
		@returns {string} расширение файла
		@memberOf file#
		*/
		extension : function(){
			io._init();
			return io.fso.GetExtensionName( this.path() );
		},
		
		/**
		Возвращает признак что данный объект (файл/каталог) существует
		@returns {bool} Данный объект существует
		@memberOf file#
		*/
		exists : function () {
			io._init();
			if( io.fso.FileExists( this.path() ) )return true;
			if( io.fso.FolderExists( this.path() ) )return true;
			return false;
		},
		
		/**
		Возвращает признак что данный объект является каталогом
		@returns {bool} Является каталогом
		@memberOf file#
		*/
		isDir : function(){
			io._init();
			if( io.fso.FolderExists( this.path() ) )return true;
			return false;
		},
		
		/**
		Возвращает признак что данный объект является файлов
		@returns {bool} Является файлом
		@memberOf file#
		*/
		isFile : function(){
			io._init();
			if( io.fso.FileExists( this.path() ) )return true;
			return false;
		},
		
		/**
		Возвращает признак что данный каталог является корневым
		@returns {bool} Каталог является корневым
		@memberOf file#
		*/
		isRoot : function(){
			io._init();
			if( !this.isDir() )return false;
			if( this._dir==null )this._dir = io.fso.GetFolder( this.path() );
			if( this._dir.IsRootFolder )return true;
			return false;
		},
		
		/**
		Возвращает родительских каталог
		@returns {file} Каталог или null если его нет.
		@memberOf file#
		*/
		parent : function(){
			io._init();
			if( !this.exists() ){
				var path = this.path();
				var i1 = path.lastIndexOf("\\");
				var i2 = path.lastIndexOf("/");
				var i = (i1>=0 && i2>=0) ? ( (i1>i2) ? i1 : i2 ) : (
					(i1>=0) ? i1 : i2
				);
				if( i<0 )return null;
				path = path.substr(0,i);
				return file(path,null,null);
			}
			if( !this.isDir() )return null;
			if( this.isRoot() )return null;
			if( this._dir==null )this._dir = io.fso.GetFolder( this.path() );
			var resDir = this._dir.ParentFolder;
			return file( resDir.Path, null, resDir );
		},
		
		/**
		Возвращает массиов дочерных файлов и каталогов
		@returns {file[]} Массиов дочерных файлов и каталогов
		@memberOf file#
		*/
		children : function(){
			io._init();
			if( !this.isDir() )return [];
			if( this._dir==null )this._dir = io.fso.GetFolder( this.path() );
			var res = [];

			var dirs = this._dir.SubFolders;
			var enF = new Enumerator(dirs);
			for( ; !enF.atEnd() ; enF.moveNext() ){
				var o = enF.item();
				res[res.length] = file( o.Path, null, o );
			}
			
			var files = this._dir.Files;
			var en = new Enumerator(files);
			for( ; !en.atEnd() ; en.moveNext() ){
				var fo = en.item();
				res[res.length] = file( fo.Path, fo, null );
			}
			return res;
		},
		
		/**
		Создает каталог
		@param {bool} recursive=optional Рексивное создание необходимых родительских каталогов
		@returns {bool} Успешное создание
		@memberOf file#
		*/
		mkdir : function(recursive){
			io._init();
			if( arguments.length==1 ){
				if( recursive ){
					if( this.exists() )return this.isDir();
					
					var parent = this.parent();
					if( parent==null )return false;
					if( parent.mkdir(true) ){
						io.fso.CreateFolder( this.path() );
						return this.isDir();
					}else{
						return false;
					}
				}else{
					io.fso.CreateFolder( this.path() );
					return this.isDir();
				}
			}
			if( this.exists() )return this.isDir();
			io.fso.CreateFolder( this.path() );
			return this.isDir();
		},
		
		/**
		Удаляет файл/каталог
		@returns {bool} Успешное удаление
		@memberOf file#
		*/
		remove : function() {
			io._init();
			if( !this.exists() )return true;
			if( this.isFile() ){
				if( this._file==null )this._file = io.fso.GetFile( this.path() );
				this._file.Delete( true );
				return !this.exists();
			}
			if( this.isDir() ){
				var ch = this.children();
				for( var k in ch ){
					ch[k].remove();
				}
				if( this._dir==null )this._dir = io.fso.GetFolder( this.path() );
				this._dir.Delete( true );
				return !this.exists();
			}
			return false;
		},
		
		/**
		Копирование файла/каталога
		@param {file} target куда копировать
		@returns {bool} Успешное копирование
		@memberOf file#
		*/
		copy : function( target ){
			io._init();
			if( !this.exists() )return false;
			
			if( this.isFile() ){
				io.fso.CopyFile( this.path(), target.path(), true );
				return true;
			}
			if( this.isDir() ){
				io.fso.CopyFolder( this.path(), target.path(), true );
				return true;
			}
			return false;
		},
		
		/**
		Перемещение файла/каталога
		@param {bool} target куда перемещать
		@returns {bool} Успешное перемещение
		@memberOf file#
		*/
		move : function( target ){
			io._init();
			if( !this.exists() )return false;

			if( this.isFile() ){
				io.fso.MoveFile( this.path(), target.path() );
				return true;
			}
			if( this.isDir() ){
				io.fso.MoveFolder( this.path(), target.path() );
				return true;
			}
			return false;
		}
	};
}

/**
@class Работа с Файлами.
*/
var io = {
	fso : null,
	_init : function(){
		if( this.fso==null )
			this.fso = new ActiveXObject("Scripting.FileSystemObject");
	},
	
	/**
	Возвращает объект file к текущей директории
	@returns {file} Текущаяя директория
	*/
	currentDir : function(){
		var shell = WScript.CreateObject("WScript.Shell");
		return file(shell.CurrentDirectory);
	},

	/**
	Возвращает массив дисков (приводов)
	@returns {drive[]}
	*/
	drives : function(){
		this._init();
		var en = new Enumerator(this.fso.Drives);
		var res = [];
		for (; !en.atEnd(); en.moveNext()){
			var drv = en.item();
			res[res.length] = drive( drv );
		}
		return res;
	},

	/**
	Возвращает массив свободных дисков - буквы без двоеточия в конце. 
	@returns {string[]} Буквы.
	*/
	freeDrives : function (){
		this._init();
		var fso, n, e, x;
		var busedLetters = [];
		e = new Enumerator(this.fso.Drives);
		for (; !e.atEnd(); e.moveNext())
		{
			x = e.item();
			busedLetters.push( x.DriveLetter );
		}
		var letters = [
			'C','D','E','F','G','H','I','J','K','L','N','M','O',
			'P','S','V','Q','W','R','T','Y','U','Z','X'];
		var freeLetters = [];
		for( i0 in letters ){
			var l = letters[i0];
			var add = true;
			for( i1 in busedLetters ){
				var b = busedLetters[i1];
				if( b.toLowerCase() == l.toLowerCase() ){
					add = false;
					break;
				}
			}
			if( add )freeLetters.push( l );
		}
		return freeLetters;
	},

	/**
	Возвращает не занятую букву диска (без двоеточия в конце). 
	@returns {string} Буква
	*/
	freeDrive : function (){
		var free = this.freeDrives();
		if( free.length>0 ){
			return free[0];
		}
		return null;
	},
	
	/**
	Создает объект файл для манипуляции файлом/каталогом.
	@param {name} Имя файла/каталога
	@returns {file} Объект файл
	*/
	file : function( name ){
		this._init();
		return file( name, null, null );
	}
};
try{
}catch( e ){
	println( "exception: " );
	for( var k in e ){
		println( "  "+k+":"+e[k] );
	}
}
