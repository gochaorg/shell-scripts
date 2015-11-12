/**
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
