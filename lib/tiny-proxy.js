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
