/**
 * Creates a proxy for an Object
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2014 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/tiny-proxy/master/LICENSE>
 * @link http://avoidwork.github.io/tiny-proxy
 * @module tiny-proxy
 * @version 1.0.0
 */
( function ( global ) {
	"use strict";

function each ( obj, fn ) {
	var nth = obj.length,
	    i   = -1;

	while ( ++i < nth ) {
		if ( fn.call( obj, obj[i], i ) === false ) {
			break;
		}
	}
}

function iterate ( obj, fn ) {
	each( Object.keys( obj ), function ( i ) {
		return fn.call( obj, obj[i], i );
	} );

	return obj;
}

function property ( obj, prop, descriptor ) {
	if ( descriptor.value !== undefined && descriptor.get !== undefined ) {
		delete descriptor.value;
	}

	Object.defineProperty( obj, prop, descriptor );
}

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

// Node, AMD & window supported
if ( typeof exports != "undefined" ) {
	module.exports = proxy;
}
else if ( typeof define == "function" ) {
	define( function () {
		return proxy;
	} );
}
else {
	global.proxy = proxy;
}
} )
( this );
