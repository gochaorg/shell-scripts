var wmi = {
	wmiobj : null,
	init : function(){
		if( !wmi.wmiobj ){
			//println("init wmi");
			wmi.wmiobj = GetObject("winmgmts:\\\\.\\root\\cimv2");
		}
	},	
	services : {
		createProxy : function( srvc ) {
			var res = { 
				srvc : srvc,
				displayName : srvc.DisplayName,
				name : srvc.Name,
				state : srvc.State,
				getState : function(){ 
					var o = wmi.services.get( this.name );
					if( o ){
						this.state = o.srvc.State;
					}else{
						this.state = this.srvc.State;
					}
					return this.state;
				},
				stop : function(){					
					var opts = {};
					if( arguments.length>0 )opts = arguments[0];
					
					if( typeof(opts.recLevel) == 'undefined' )opts.recLevel = 0;
					
					if( typeof(opts.recLevel) == 'number' && opts.recLevel>0 ){
						for( var i=0; i<opts.recLevel; i++ ){
							print( '..' );
						}
					}
					println( "service "+this.name+' stopping' );
					
					if( opts.deps ){
						var edeps = this.getExtDeps();
						for( var ek in edeps ){
							var edep = edeps[ek];
							var srecLevel = opts.recLevel;
							opts.recLevel++;
							edep.stop( opts );
							opts.recLevel = srecLevel;
						}
					}
					
					var ret1 = this.srvc.StopService();
					WScript.sleep( this.srvc.WaitHint );
					
					if( opts.wait && ret1==0 ){
						var sleep = this.srvc.WaitHint;
						if( opts.sleep > 0 )sleep = opts.sleep;
						while( true ){
							var s = this.getState();
							if( this.state == 'Stopped' ){
								break;
							}else{
								if( typeof(opts.recLevel) == 'number' && opts.recLevel>0 ){
									for( var i=0; i<opts.recLevel; i++ ){
										print( '..' );
									}
								}
								println( 'service '+this.name+' state='+this.state+' sleep '+sleep );
								WScript.sleep( sleep );
							}
						}
					}
					
					if( typeof(opts.recLevel) == 'number' && opts.recLevel>0 ){
						for( var i=0; i<opts.recLevel; i++ ){
							print( '..' );
						}
					}
					
					println( "service "+this.name+" stop()="+ret1+" state="+this.getState() );
					return ret1;
				},
				start : function(){
					var opts = {};
					if( arguments.length>0 )opts = arguments[0];
					
					if( typeof(opts.recLevel) == 'undefined' )opts.recLevel = 0;

					if( typeof(opts.recLevel) == 'number' && opts.recLevel>0 ){
						for( var i=0; i<opts.recLevel; i++ ){
							print( '..' );
						}
					}
					println( "service "+this.name+' starting' );
					
					if( opts.deps ){
						var edeps = this.getDeps();
						for( var ek in edeps ){
							var edep = edeps[ek];
							var srecLevel = opts.recLevel;
							opts.recLevel++;
							edep.start( opts );
							opts.recLevel = srecLevel;
						}
					}

					var ret1 = this.srvc.StartService();
					
					WScript.sleep( this.srvc.WaitHint );
					this.state = this.srvc.State;
					
					if( opts.wait && ret1==0 ){
						var sleep = this.srvc.WaitHint;
						if( opts.sleep > 0 )sleep = opts.sleep;
						while( true ){
							var s = this.getState();
							if( this.state == 'Running' ){
								break;
							}else{
								if( typeof(opts.recLevel) == 'number' && opts.recLevel>0 ){
									for( var i=0; i<opts.recLevel; i++ ){
										print( '..' );
									}
								}
								println('service '+this.name+' state='+s+' sleep '+sleep );
								WScript.sleep( sleep );
							}
						}
					}
					
					if( typeof(opts.recLevel) == 'number' && opts.recLevel>0 ){
						for( var i=0; i<opts.recLevel; i++ ){
							print( '..' );
						}
					}
					println( "service "+this.name+" start()="+ret1+" state="+this.getState() );
					return ret1;
				},
				getDeps : function(){
					wmi.init();
					var ret1 = [];
					
					var q = "ASSOCIATORS OF {Win32_Service.Name='"+
						this.name+					
						"'} WHERE AssocClass=Win32_DependentService Role=Dependent";
						//"'} WHERE AssocClass=Win32_DependentService Role=Antecedent");

					var colItems = wmi.wmiobj.ExecQuery( q );
						
					var enumItems = new Enumerator(colItems);
					var oItem;
					for ( ; !enumItems.atEnd(); enumItems.moveNext()) {
						oItem = enumItems.item();
						ret1.push( wmi.services.createProxy( oItem ) );
					}
					
					return ret1;
				},
				getExtDeps : function(){
					wmi.init();
					var ret1 = [];
					
					var q = "ASSOCIATORS OF {Win32_Service.Name='"+
						this.name+					
						//"'} WHERE AssocClass=Win32_DependentService Role=Dependent";
						"'} WHERE AssocClass=Win32_DependentService Role=Antecedent";

					var colItems = wmi.wmiobj.ExecQuery( q );
						
					var enumItems = new Enumerator(colItems);
					var oItem;
					for ( ; !enumItems.atEnd(); enumItems.moveNext()) {
						oItem = enumItems.item();
						ret1.push( wmi.services.createProxy( oItem ) );
					}
					
					return ret1;
				}
			};
			
			return res;
		},

		list : function(){
			wmi.init();
			var res = [];
			
			var srvs = wmi.wmiobj.ExecQuery ("SELECT * FROM Win32_Service");
			srvsEn = new Enumerator( srvs ); 			
			for ( ; !srvsEn.atEnd(); srvsEn.moveNext() ){ 
				var srv = srvsEn.item();
				var srvProxy = wmi.services.createProxy( srv );
				res.push( srvProxy );
			}
			
			return res;
		},
		get : function(name){
			wmi.init();
			var res = null;
			
			var srvs = wmi.wmiobj.ExecQuery ("SELECT * FROM Win32_Service where Name = '"+name+"'");
			srvsEn = new Enumerator( srvs ); 			
			for ( ; !srvsEn.atEnd(); srvsEn.moveNext() ){ 
				var srv = srvsEn.item();
				var srvProxy = wmi.services.createProxy( srv );
				res = srvProxy;
			}
			
			return res;
		}
	}
};