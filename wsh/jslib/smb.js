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
};