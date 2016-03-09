function each (obj, fn) {
	let nth = obj.length,
		i = -1;

	while (++i < nth) {
		if (fn.call(obj, obj[i], i) === false) {
			break;
		}
	}
}
