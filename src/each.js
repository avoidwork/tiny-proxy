/**
 * Quick iteration of an Array with the ability to halt
 *
 * @method each
 * @param  {Array}    obj Array to iterate
 * @param  {Function} fn  Function to execute per index
 * @return {Undefined}    undefined
 */
function each ( obj, fn ) {
	var nth = obj.length,
	    i   = -1;

	while ( ++i < nth ) {
		if ( fn.call( obj, obj[i], i ) === false ) {
			break;
		}
	}
}
