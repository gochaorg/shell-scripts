try{
	var srvc = wmi.services.get('MSSQLSERVER');
	if( srvc ){
		srvc.stop(  {deps:true, wait:true, sleep:1000} );
		srvc.start( {deps:true, wait:true, sleep:1000} );
	}else{
		println( "service MSSQLSERVER not found" );
	}
}catch( e ){
	println( "exception: " );
	for( var k in e ){
		println( "  "+k+":"+e[k] );
	}
}