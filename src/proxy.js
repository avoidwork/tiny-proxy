function proxy ( origin ) {
	var o = {},
	    s = origin;

	iterate( s, function ( v, k ) {
		var getter, setter;

		if ( !( v instanceof RegExp ) && typeof v === "function" ) {
			o[k] = v.bind( o[k] );
		}
		else if ( !(v instanceof RegExp ) && !(v instanceof Array ) && v instanceof Object ) {
			if ( o[k] === undefined ) {
				o[k] = {};
			}

			o[k] = proxy( s[k] );
		}
		else {
			getter = function () {
				return s[k];
			};

			setter = function ( arg ) {
				s[k] = arg;
			};

			property( o, k, {enumerable: true, get: getter, set: setter, value: s[k]} );
		}
	});

	return o;
}
