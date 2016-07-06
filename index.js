'use strict'

exports = module.exports = extractWords
exports.regExp = /\w+/g
exports.cache  = {}

var assert = require('assert')

function parseWordList(str) {
    return String(str).match(exports.regExp)
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
 * @param {null|Object} [cache] Pass an object to use for caching instead of the default. Or pass `null` to make an uncached call.
 * @returns {[string]}
 */
function extractWords(str, cache) {
    if (!str)
        return []

    if (Array.isArray(str))
        return str

    assert.equal(typeof str, 'string', 'first parameter must be an array or string')

    switch (cache) {
        case undefined:
            if (exports.cache)
                return parseWordListCached(str, exports.cache)
            else
                return parseWordList(str)

        case null:
        case false:
            return parseWordList(str)

        default:
            assert.equal(typeof cache, 'object', 'second parameter must be an object or null')
            return parseWordListCached(str, cache)
    }
}