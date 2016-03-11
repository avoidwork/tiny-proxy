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
					this.onchange(k, old, arg);
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

factory.version = "{{VERSION}}";
