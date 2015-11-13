try{
	var srvc = wmi.services.get('SQLSERVERAGENT');
	if( srvc ){
		//srvc.stop(  {deps:true, wait:true, sleep:1000} );
		srvc.start( {deps:true, wait:true, sleep:1000} );
		if( srvc.getState() == 'Running' ){
			println( 'success started' );
			exit(0);
		}else{
			println( 'failed started' );
			exit(1);
		}
	}else{
		println( "service SQLSERVERAGENT not found" );
		exit(2);
	}
}catch( e ){
	println( "exception: " );
	for( var k in e ){
		println( "  "+k+":"+e[k] );
	}
	exit(2);
}