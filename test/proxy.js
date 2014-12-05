var proxy = require("../lib/tiny-proxy.js");   

exports["proxy_blank"] = {
	setUp: function (done) {
		this.obj = {};
		done();
	},
	test: function (test) {
		var p = proxy(this.obj);

		test.expect(4);
		test.equal(Object.keys(this.obj).length, 0, "Should be 0");
		test.equal(Object.keys(p).length, 0, "Should be 0");
		p.abc = true;
		test.equal(Object.keys(this.obj).length, 0, "Should be 0");
		test.equal(Object.keys(p).length, 1, "Should be 1");
		test.done();
	}
};

exports["proxy_modify"] = {
	setUp: function (done) {
		this.obj = {abc: false};
		done();
	},
	test: function (test) {
		var p = proxy(this.obj);

		test.expect(3);
		test.equal(Object.keys(this.obj).length, 1, "Should be 1");
		test.equal(Object.keys(p).length, 1, "Should be 1");
		p.abc = true;
		test.equal(this.obj.abc, p.abc, "Should be match");
		test.done();
	}
};

exports["proxy_delete (valid)"] = {
	setUp: function (done) {
		this.obj = {abc: false};
		done();
	},
	test: function (test) {
		var p = proxy(this.obj);

		p.xyz = true;
		test.expect(4);
		test.equal(Object.keys(this.obj).length, 1, "Should be 1");
		test.equal(Object.keys(p).length, 2, "Should be 2");
		delete p.xyz;
		test.equal(Object.keys(this.obj).length, 1, "Should be 1");
		test.equal(Object.keys(p).length, 1, "Should be 1");
		test.done();
	}
};

exports["proxy_delete (invalid)"] = {
	setUp: function (done) {
		this.obj = {abc: false};
		done();
	},
	test: function (test) {
		var p = proxy(this.obj);

		test.expect(4);
		test.equal(Object.keys(this.obj).length, 1, "Should be 1");
		test.equal(Object.keys(p).length, 1, "Should be 1");
		delete p.abc;
		test.equal(Object.keys(this.obj).length, 1, "Should be 1");
		test.equal(Object.keys(p).length, 1, "Should be 1");
		test.done();
	}
};
