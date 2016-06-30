/**
 * Created by schwarzkopfb on 30/06/16.
 */

'use strict'

exports = module.exports = parseFields
exports.regExp = /\w+/g
exports.cache  = {}

const assert = require('assert')

function parseFieldList(str) {
    return String(str).match(exports.regExp)
}

function parseFieldListCached(str) {
    const cached = exports.cache[ str ]

    return cached
        ? cached
        : exports.cache[ str ] = parseFieldList(str)
}

/**
 * @param {string|Array} list The word list to parse.
 * @returns {[string]}
 */
function parseFields(list) {
    if (!list)
        return []

    if (Array.isArray(list))
        return list

    assert.equal(typeof list, 'string', 'list must be an array or string')

    if (exports.cache)
        return parseFieldListCached(list)
    else
        return parseFieldList(list)
}