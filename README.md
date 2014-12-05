# tiny-proxy

tiny-proxy gives you a way to quickly create an Object proxy for passing around

[![build status](https://secure.travis-ci.org/avoidwork/tiny-proxy.svg)](http://travis-ci.org/avoidwork/tiny-proxy)

## API

#### proxy(obj[, read_only])
Returns a proxy for `obj` with getters & setters, or only getters if `read_only` is `true`
