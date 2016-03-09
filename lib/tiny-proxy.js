"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	var factory = void 0;

	function each(obj, fn) {
		var nth = obj.length,
		    i = -1;

		while (++i < nth) {
			if (fn.call(obj, obj[i], i) === false) {
				break;
			}
		}
	}

	function iterate(obj, fn) {
		each(Object.keys(obj), function (i) {
			return fn.call(obj, obj[i], i);
		});

		return obj;
	}

	var Proxy = function () {
		function Proxy() {
			_classCallCheck(this, Proxy);
		}

		_createClass(Proxy, [{
			key: "decorate",
			value: function decorate(origin) {
				var _this = this;

				iterate(origin, function (v, k) {
					var regex = v instanceof RegExp,
					    array = v instanceof Array,
					    object = v instanceof Object;

					var getter = void 0,
					    setter = void 0;

					if (!regex && typeof v === "function") {
						_this[k] = v.bind(_this[k]);
					} else if (!regex && !array && object) {
						if (_this[k] === undefined) {
							_this[k] = {};
						}

						_this[k] = factory(origin[k], _this.readOnly, _this.onchange);
					} else {
						getter = function getter() {
							return origin[k];
						};

						setter = function setter(arg) {
							var old = origin[k];

							origin[k] = arg;
							_this.onchange(old, arg);
						};

						Object.defineProperty(_this, k, _this.readOnly ? { enumerable: true, get: getter } : { enumerable: true, get: getter, set: setter });
					}
				});

				return this;
			}
		}, {
			key: "onchange",
			value: function onchange() {}
		}]);

		return Proxy;
	}();

	factory = function factory(origin) {
		var readOnly = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
		var fn = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

		var proxy = new Proxy();

		Object.defineProperty(proxy, "readOnly", { enumerable: false, get: function get() {
				return readOnly;
			} });

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
	}
})(typeof window !== "undefined" ? window : global);
