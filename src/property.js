function property ( obj, prop, descriptor ) {
	if ( descriptor.value !== undefined && descriptor.get !== undefined ) {
		delete descriptor.value;
	}

	Object.defineProperty( obj, prop, descriptor );
}
