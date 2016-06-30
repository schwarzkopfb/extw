/**
 * Created by schwarzkopfb on 30/06/16.
 */

'use strict'

exports = module.exports = extractWords
exports.regExp = /\w+/g
exports.cache  = {}

var assert = require('assert')

function parseWordList(str) {
    return String(str).match(exports.regExp)
}

function parseWordListCached(str) {
    var cached = exports.cache[ str ]

    return cached
        ? cached
        : exports.cache[ str ] = parseWordList(str)
}

/**
 * @param {string|Array} list The word list to parse.
 * @returns {[string]}
 */
function extractWords(list) {
    if (!list)
        return []

    if (Array.isArray(list))
        return list

    assert.equal(typeof list, 'string', 'list must be an array or string')

    if (exports.cache)
        return parseWordListCached(list)
    else
        return parseWordList(list)
}