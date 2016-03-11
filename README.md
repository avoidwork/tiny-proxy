# tiny-proxy

Tiny Object proxy for Client or Server

[![build status](https://secure.travis-ci.org/avoidwork/tiny-proxy.svg)](http://travis-ci.org/avoidwork/tiny-proxy)

## API

#### proxy(obj[, readOnly = false, changeHandler])
Returns a proxy for `obj` with getters & setters, or only getters if `readOnly` is `true`.

## Example
```javascript
const proxy = require('tiny-proxy');
let original = {a: true};
let facade = proxy(original, false, function (key, oldValue, newValue) {
	console.log(key + ' was ' + oldValue + ', and is now ' + newValue);
});

facade.a = false; // a was true, and is now false
```

## Handling changes
Writable proxies will fire the `onchange` function after applying a change with the `key`, `oldValue` & `newValue` as arguments.

## License
Copyright (c) 2014 Jason Mulligan
Licensed under the BSD-3 license