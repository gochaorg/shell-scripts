// Automatic generated file 
/**
@class ������ ��� ������ � �����
*/
var net = {
	_net : null,
	_init : function(){
		if( this._net==null )this._net = WScript.CreateObject("WScript.Network");
	},
	/**
	���������� ��� ����������
	@returns {string} ��� ����������
	*/
	computerName : function(){
		this._init();
		return this._net.ComputerName;
	},
	/**
	���������� ��� ������������ � ������
	@returns {string} ��� ������������ � ������
	*/
	userDomain : function(){
		this._init();
		return this._net.UserDomain;
	},
	/**
	���������� ��� ������������
	@returns {string} ��� ������������
	*/
	userName : function(){
		this._init();
		return this._net.UserName;
	},
	/**
	�������� �������� ������� �������
	@param {string} printerPath ���� � ��������. ��������: <code>"\\\\Server\\Print1"</code>
	@param {string} driver=optional ��� ��������. ������������ � Windows 9x. �������� �� ������������.
	@param {string} port=optional ���� (LPT1). ������������ � Windows 9x. �������� �� ������������.
	*/
	addWindowsPrinter : function(printerPath){
		this._init();
		if( arguments.length==3 )return this._net.AddWindowsPrinterConnection(printerPath,arguments[1],arguments[2]);
		if( arguments.length==2 )return this._net.AddWindowsPrinterConnection(printerPath,arguments[1]);
		return this._net.AddWindowsPrinterConnection(printerPath);
	},
	
	/*
	��������� ������� ������� MS-DOS � ������ ����������.
	@param {string} localName ��������� �������� ��������
	@param {string} printerPath ������� ���� � ��������
	@param {bool} updateProfile=optional (true/false) ��������� ������� ������������
	@param {string} userName=optional ����� ������������
	@param {string} password=optional ������ ������������
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
	��������� ������� ����
	@param {string} drive - ��� �����. �������� <b>"E:"</b>
	@param {string} smbPath - ������� ����. �������� <b>"\\\\Server\\Public"</b>
	@param {bool} updateProfile=optional (true/false) ��������� ������� ������������
	@param {string} userName=optional ����� ������������ �� �������
	@param {string} password=optional ������ ������������ �� �������
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
	����������� ������� ����
	@param {string} drive - ��� �����. �������� <b>"E:"</b>
	@param {bool} force=optional (true/false) �����������, ���� ���� ���� ������������
	@param {bool} updateProfile=optional (true/false) ��������� ������� ������������
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
	���������� ������������� ������ �������������� ������� ������
	@returns {array[string/string]} ������������� ������ �������������� ������� ������: ���� / ������� ����
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
@class ������ � �����������
*/
var env = {
	/**
	���������� ������ ���������� ����������.
	@returns {string[]} ������ ���������� ����������.
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
	���������� �����-������ ���������� ���������
	@returns {array[string/string]} �����. ������ ���� / �������� ���������� ���������.
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
	���������� �������� ����������� �����
	@param {string} name ��� �����.
	��������� ��������:
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
	@returns {string} ��������
	*/
	specialFolder : function( name ) {
		this._init();
		return this._shell.SpecialFolders( name );
	},
	
	/**
	���������� ������������� ������ ����������� �����.
	@returns {array[string/string]} ������������� ������ ����������� �����.
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
������� �� ������� ����� ���������� � ����������
*/
function print(){
	var i = 0;
	for( i=0; i<arguments.length; i++ ){
		WScript.StdOut.Write( arguments[i] );
	}
}

/**
������� �� ������� ����� ���������� � ���������� 
� ��������� ������ �� ��������� ������.
*/
function println(){
	var i = 0;
	for( i=0; i<arguments.length; i++ ){
		WScript.StdOut.Write( arguments[i] );
	}
	WScript.StdOut.WriteBlankLines( 1 );
}

/**
������ ������ �� �������
@returns {string} ������
*/
function readln(){
	return WScript.StdIn.ReadLine();
}

/**
@class ����� ����������� ������
@constructor
@param drive - ������ Scripting.FileSystemObject Drive
*/
function drive(drive){
	return {
		/** 
		����� �����, ��� ���������.
		@memberOf drive#
		*/
		letter : drive.DriveLetter,
		
		/**
		��� �������� �������
		@memberOf drive#
		*/
		system : drive.FileSystem,
		
		/**
		����� - ��� �������. <br/>
		<b>0</b> - ��� ����� <br/>
        <b>1</b> - ��������� ���������� (Removable) - ������ <br/>
        <b>2</b> - ������������� ���������� - HDD <br/>
        <b>3</b> - ������� ���������� - SMB <br/>
        <b>4</b> - CD-ROM <br/>
        <b>5</b> - ���� � ������.
		@memberOf drive#
		*/
		type : drive.DriveType,
		
		/**
		���-�� ���������� ����� � ������
		@memberOf drive#
		*/
		freeSize : drive.FreeSpace,
		
		/**
		������ (true/false) - ����� ������ � ������������.
		@memberOf drive#
		*/
		isReady : drive.IsReady,
		
		/**
		���� - ����� ����� � ���������.
		@memberOf drive#
		*/
		path : drive.Path,
		
		/**
		���� � �������� �����. ��������: <b>C:\</b>.
		@memberOf drive#
		*/
		folder : drive.RootFolder,
		
		/**
		������� ����� �����.
		@memberOf drive#
		*/
		serial : drive.SerialNumber,
		
		/**
		���� � SMB. ��������: <b>\\VBOXSVR\desktop</b>.
		@memberOf drive#
		*/
		share : drive.ShareName,
		
		/**
		����� ������ � ������.
		@memberOf drive#
		*/
		size : drive.TotalSize,
		
		/**
		��� �����. �� �������� ��� ������.
		@memberOf drive#
		*/
		name : drive.VolumeName
	};
}

/**
@class ����� ����� / ������ ��������� ������ ��� �����
@constructor
@param {file} file ����
@param {string} mode ����� �����/������.  <br/>
��������:
<ul>
	<li><b>"r"</b> - ��� ������ </li>
	<li><b>"w"</b> - ��� ������ </li>
	<li><b>"a"</b> - ��� ������ � ����� �����.</li>
</ul>
@param {string} format=optional ������ ����� (ASCII/UNICODE). <br/>
��������� ��������: 
<ul>
	<li><b>"def"</b> | <b>"d"</b> - �� ��������� </li>
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
		����� TextStream
		@memberOf textStream#
		*/
		stream : textStr,
		
		/**
		��������� �����
		@memberOf textStream#
		*/
		close : function(){
			this.stream.Close();
		},
		
		/**
		�������� ����� � ���� � ��������� � ����� ��������� �������� ������
		@memberOf textStream#
		*/
		println : function(){
			for( var i=0; i<arguments.length; i++ ){
				this.stream.Write( arguments[i] );
			}
			this.stream.WriteBlankLines( 1 );
		},
		
		/**
		�������� ����� � ����
		@memberOf textStream#
		*/
		print : function(){
			for( var i=0; i<arguments.length; i++ ){
				this.stream.Write( arguments[i] );
			}
		},
		
		/**
		������ ����� �� �����
		@returns {string} ������ ��������� �� �����
		@memberOf textStream#
		*/
		readln : function(){
			return this.stream.ReadLine();
		},
		
		/**
		���������� ������� ��� ��������� ����� �����
		@returns {bool} ��������� ����� �����
		@memberOf textStream#
		*/
		eof : function(){
			return this.stream.AtEndOfStream;
		},
		
		/**
		������ ��� ���������� �����
		@returns {string} ���������� �����
		@memberOf textStream#
		*/
		readAll : function(){
			return this.stream.ReadAll();
		}
	};
}

/**
@class ��������� �� ���� ���� � �����/���������� � ������������� ������ ����������� � ���.
@constructor
@param {string} name ��� �����/����������
@param fileObj ����� ���� null
@param dirObj ����� ���� null
*/
function file(name,fileObj,dirObj){
	return {
		/**
		���� � �����/����������
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
		���������� ���� � �����/����������
		@memberOf file#
		@returns {string} ����
		*/
		path : function (){
			return this._path;
		},

		/**
		��������� ���� ��� ������/������
		@param {string} mode ����� �����/������.  <br/>
		��������:
		<ul>
			<li><b>"r"</b> - ��� ������ </li>
			<li><b>"w"</b> - ��� ������ </li>
			<li><b>"a"</b> - ��� ������ � ����� �����.</li>
		</ul>
		@param {string} format=optional ������ ����� (ASCII/UNICODE). <br/>
		��������� ��������: 
		<ul>
			<li><b>"def"</b> | <b>"d"</b> - �� ��������� </li>
			<li><b>"ascii"</b> | <b>"a"</b> - Ascii </li>
			<li><b>"unicode"</b> | <b>"u"</b> - Unicode. </li>
		</ul>
		@returns {textStream} ��������� ����� ��� null
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
		������� ������ file ���������� �������� �� ��������� � �������
		@param {string} name ��� ��������� �����
		@returns {file} ����
		@memberOf file#
		*/
		child : function( name ){
			var path = this._trim(this.path(),"\\");
			path = this._trim(path,"/");
			path = path + "\\" + name;
			return file( path, null, null );
		},
		
		/**
		���������� ��� �����
		@returns {string} ��� �����
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
		���������� ���������� �����
		@returns {string} ���������� �����
		@memberOf file#
		*/
		extension : function(){
			io._init();
			return io.fso.GetExtensionName( this.path() );
		},
		
		/**
		���������� ������� ��� ������ ������ (����/�������) ����������
		@returns {bool} ������ ������ ����������
		@memberOf file#
		*/
		exists : function () {
			io._init();
			if( io.fso.FileExists( this.path() ) )return true;
			if( io.fso.FolderExists( this.path() ) )return true;
			return false;
		},
		
		/**
		���������� ������� ��� ������ ������ �������� ���������
		@returns {bool} �������� ���������
		@memberOf file#
		*/
		isDir : function(){
			io._init();
			if( io.fso.FolderExists( this.path() ) )return true;
			return false;
		},
		
		/**
		���������� ������� ��� ������ ������ �������� ������
		@returns {bool} �������� ������
		@memberOf file#
		*/
		isFile : function(){
			io._init();
			if( io.fso.FileExists( this.path() ) )return true;
			return false;
		},
		
		/**
		���������� ������� ��� ������ ������� �������� ��������
		@returns {bool} ������� �������� ��������
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
		���������� ������������ �������
		@returns {file} ������� ��� null ���� ��� ���.
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
		���������� ������� �������� ������ � ���������
		@returns {file[]} ������� �������� ������ � ���������
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
		������� �������
		@param {bool} recursive=optional ��������� �������� ����������� ������������ ���������
		@returns {bool} �������� ��������
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
		������� ����/�������
		@returns {bool} �������� ��������
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
		����������� �����/��������
		@param {file} target ���� ����������
		@returns {bool} �������� �����������
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
		����������� �����/��������
		@param {bool} target ���� ����������
		@returns {bool} �������� �����������
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
@class ������ � �������.
*/
var io = {
	fso : null,
	_init : function(){
		if( this.fso==null )
			this.fso = new ActiveXObject("Scripting.FileSystemObject");
	},
	
	/**
	���������� ������ file � ������� ����������
	@returns {file} �������� ����������
	*/
	currentDir : function(){
		var shell = WScript.CreateObject("WScript.Shell");
		return file(shell.CurrentDirectory);
	},

	/**
	���������� ������ ������ (��������)
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
	���������� ������ ��������� ������ - ����� ��� ��������� � �����. 
	@returns {string[]} �����.
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
	���������� �� ������� ����� ����� (��� ��������� � �����). 
	@returns {string} �����
	*/
	freeDrive : function (){
		var free = this.freeDrives();
		if( free.length>0 ){
			return free[0];
		}
		return null;
	},
	
	/**
	������� ������ ���� ��� ����������� ������/���������.
	@param {name} ��� �����/��������
	@returns {file} ������ ����
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
