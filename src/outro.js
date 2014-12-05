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
