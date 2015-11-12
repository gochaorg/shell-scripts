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
};