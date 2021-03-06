[![view on npm](http://img.shields.io/npm/v/extw.svg?style=flat-square)](https://www.npmjs.com/package/extw)
[![downloads per month](http://img.shields.io/npm/dm/extw.svg?style=flat-square)](https://www.npmjs.com/package/extw)
[![node version](https://img.shields.io/badge/node-%3E=0.8-brightgreen.svg?style=flat-square)](https://nodejs.org/download)
[![build status](https://img.shields.io/travis/schwarzkopfb/extw.svg?style=flat-square)](https://travis-ci.org/schwarzkopfb/extw)
[![test coverage](https://img.shields.io/coveralls/schwarzkopfb/extw.svg?style=flat-square)](https://coveralls.io/github/schwarzkopfb/extw)
[![license](https://img.shields.io/npm/l/extw.svg?style=flat-square)](https://github.com/schwarzkopfb/extw/blob/development/LICENSE)

# extw

Tiny utility that extracts words from a given string and caches parsed result lists.

## Usage

```js

const words = require('extw')

words('  Buggy/is, my  :beautiful&cat.') // [ 'Buggy', 'is', 'my', 'beautiful', 'cat' ]

```

## API

```js

const extw = require('extw')

typeof extw === 'function'

extw('string')    // returns a string array
extw([ 'array' ]) // returns the given array untouched
extw(null)        // returns an empty array
extw(true)        // raises an assert.AssertionError

extw('string', null) // disable cache for _this_ call
extw('string', {})   // use the given object as cache for _this_ call

typeof extw.cache === 'object'

extw.cache = {}      // reset cache
extw.cache = false   // disable cache
extw.cache = 'error' // raises an assert.AssertionError

extw.regExp instanceof RegExp === true

extw.regExp = /a+/g   // override word match regexp
extw.regExp = 'error' // raises an assert.AssertionError

typeof extw.version === 'string' // returns the version string from package manifest

```

## Installation

With npm:

    npm install extw

## License

[MIT](/LICENSE)
