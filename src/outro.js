// Node, AMD & window supported
if (typeof exports !== "undefined") {
	module.exports = factory;
} else if (typeof define === "function" && define.amd) {
	define(function () {
		return factory;
	});
} else {
	global.proxy = factory;
}}(typeof window !== "undefined" ? window : global));
