/**
 * Quick iteration of an Object with the ability to halt
 *
 * @method iterate
 * @param  {Object}   obj Object to iterate
 * @param  {Function} fn  Function to execute per index
 * @return {Undefined}    undefined
 */

function iterate ( obj, fn ) {
	each( Object.keys( obj ), function ( i ) {
		return fn.call( obj, obj[i], i );
	} );

	return obj;
}
