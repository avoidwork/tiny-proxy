/**
 * Tiny Object proxy for Client or Server
 *
 * @author [object Object]
 * @copyright 2016
 * @license BSD-3-Clause
 * @link http://avoidwork.github.io/tiny-proxy
 * @version 1.1.0
 */
(function (global) {
let factory;

function each (obj, fn) {
	let nth = obj.length,
		i = -1;

	while (++i < nth) {
		if (fn.call(obj, obj[i], i) === false) {
			break;
		}
	}
}

function iterate (obj, fn) {
	each(Object.keys(obj), i => {
		return fn.call(obj, obj[i], i);
	});

	return obj;
}

class Proxy {
	constructor () {}

	decorate (origin) {
		iterate(origin, (v, k) => {
			const regex = v instanceof RegExp,
				array = v instanceof Array,
				object = v instanceof Object;

			let getter, setter;

			if (!regex && typeof v === "function") {
				this[k] = v.bind(this[k]);
			} else if (!regex && !array && object) {
				if (this[k] === undefined) {
					this[k] = {};
				}

				this[k] = factory(origin[k], this.readOnly, this.onchange);
			} else {
				getter = () => {
					return origin[k];
				};

				setter = arg => {
					let old = origin[k];

					origin[k] = arg;
					this.onchange(old, arg);
				};

				Object.defineProperty(this, k, this.readOnly ? {enumerable: true, get: getter} : {enumerable: true, get: getter, set: setter});
			}
		});

		return this;
	}

	onchange () {}
}

factory = (origin, readOnly = false, fn = null) => {
	let proxy = new Proxy();

	Object.defineProperty(proxy, "readOnly", {enumerable: false, get: () => {
		return readOnly;
	}});

	if (fn && typeof fn === "function") {
		proxy.onchange = fn;
	}

	return proxy.decorate(origin);
};

factory.version = "1.1.0";

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
