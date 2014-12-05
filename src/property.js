/**
 * Defines a property
 *
 * @method property
 * @param  {Object} obj        Object to decorate
 * @param  {String} prop       Property to define
 * @param  {Object} descriptor Property descriptor
 * @return {Undefined}         undefined
 */
function property ( obj, prop, descriptor ) {
	if ( descriptor.value !== undefined && descriptor.get !== undefined ) {
		delete descriptor.value;
	}

	Object.defineProperty( obj, prop, descriptor );
}
