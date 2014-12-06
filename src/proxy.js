/**
 * Creates a proxy of an Object
 *
 * @method proxy
 * @param  {Object}  origin    Object to proxy
 * @param  {Boolean} read_only [Optional] No setters if `true`, default is `false`
 * @return {Object}            Proxy
 */
function proxy ( origin, read_only ) {
	var p = {};

	iterate( origin, function ( v, k ) {
		var getter, setter;

		if ( !( v instanceof RegExp ) && typeof v == "function" ) {
			p[k] = v.bind( p[k] );
		}
		else if ( !(v instanceof RegExp ) && !(v instanceof Array ) && v instanceof Object ) {
			if ( p[k] === undefined ) {
				p[k] = {};
			}

			p[k] = proxy( origin[k] );
		}
		else {
			getter = function () {
				return origin[k];
			};

			setter = function ( arg ) {
				origin[k] = arg;
			};

			if ( read_only === true ) {
				Object.defineProperty( p, k, {enumerable: true, get: getter} );
			}
			else {
				Object.defineProperty( p, k, {enumerable: true, get: getter, set: setter} );
			}
		}
	} );

	return p;
}
