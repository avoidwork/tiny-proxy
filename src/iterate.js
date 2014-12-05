function iterate ( obj, fn ) {
	each( Object.keys( obj ), function ( i ) {
		return fn.call( obj, obj[i], i );
	} );

	return obj;
}
