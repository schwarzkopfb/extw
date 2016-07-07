'use strict'

var assert = require('assert'),
    regExp = /\w+/g,
    cache  = {}

function parseWordList(str) {
    return String(str).match(regExp)
}

function parseWordListCached(str, cache) {
    var cached = cache[ str ]

    return cached
        ? cached
        : cache[ str ] = parseWordList(str)
}

/**
 * Extract words from a given string.
 *
 * @param {string|Array} str The string to parse.
 * @param {null|Object} [store] Pass an object to use for caching instead of the default one. Or pass `null` to disable caching for this call.
 * @returns {[string]}
 */
function extractWords(str, store) {
    if (!str)
        return []

    if (Array.isArray(str))
        return str

    assert.equal(typeof str, 'string', 'first parameter must be an array or string')

    switch (store) {
        case undefined:
            if (cache)
                return parseWordListCached(str, cache)
            else
                return parseWordList(str)

        case null:
        case false:
            return parseWordList(str)

        default:
            assert.equal(typeof store, 'object', 'second parameter must be an object or null')
            return parseWordListCached(str, store)
    }
}

// expose
Object.defineProperties(module.exports = extractWords, {
    version: {
        enumerable: true,

        get: function () {
            return require('./package.json').version
        }
    },

    regExp: {
        enumerable: true,

        get: function () {
            return regExp
        },
        set: function (val) {
            assert(val instanceof RegExp, 'extw.regExp must be a regular expression instance')
            regExp = val
        }
    },

    cache: {
        enumerable: true,

        get: function () {
            return cache
        },
        set: function (val) {
            assert(
                val === null || val === false || typeof val === 'object',
                'extw.cache must be an object or null'
            )
            cache = val
        }
    }
})
