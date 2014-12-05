/**
 * Creates a proxy of an Object
 *
 * @method proxy
 * @param  {Object} origin Object to proxy
 * @return {Object}        Proxy
 */
function proxy ( origin ) {
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

			property( p, k, {enumerable: true, get: getter, set: setter, value: origin[k]} );
		}
	} );

	return p;
}
