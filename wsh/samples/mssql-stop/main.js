try{
	var srvc = wmi.services.get('MSSQLSERVER');
	if( srvc ){
		srvc.stop(  {deps:true, wait:true, sleep:1000} );
		//srvc.start( {deps:true, wait:true, sleep:1000} );
		if( srvc.getState() == 'Stopped' ){
			println( 'success stopped' );
			exit(0);
		}else{
			println( 'failed stopped' );
			exit(1);
		}
	}else{
		println( "service MSSQLSERVER not found" );
		exit(2);
	}
}catch( e ){
	println( "exception: " );
	for( var k in e ){
		println( "  "+k+":"+e[k] );
	}
	exit(2);
}