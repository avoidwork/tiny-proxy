# tiny-proxy

Tiny Object proxy for Client or Server

[![build status](https://secure.travis-ci.org/avoidwork/tiny-proxy.svg)](http://travis-ci.org/avoidwork/tiny-proxy)

## API

#### proxy(obj[, read_only])
Returns a proxy for `obj` with getters & setters, or only getters if `read_only` is `true`

## Example
```javascript
var proxy = require('proxy'),
    data  = {'name': 'John', ...},
    data_proxy = proxy(data, true);

// Send the read-only proxy out
someFunction(data_proxy);
```

## License
Copyright (c) 2014 Jason Mulligan
Licensed under the BSD-3 license