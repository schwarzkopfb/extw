/**
 * Created by schwarzkopfb on 30/06/16.
 */

'use strict'

var assert = require('assert'),
    test   = require('tap'),
    parse  = require('./')

test.test('basic', function (test) {
    test.same(
        parse(' a|b ,  c,, d e /f  |||g'),
        [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ],
        'only the words should be extracted'
    )
    test.same(
        parse(' a1 b_ _c d2 e_3 f-4'),
        [ 'a1', 'b_', '_c', 'd2', 'e_3', 'f', '4' ],
        'number and underscore should be treated as word'
    )

    test.end()
})

test.test('input', function (test) {
    test.same(parse(undefined), [], 'array should be returned')
    test.same(parse(null), [], 'array should be returned')
    test.same(parse(0), [], 'array should be returned')

    var arr = [ 'lorem', 'ipsum' ]
    test.equal(parse(arr), arr, 'the same array should be returned')

    function testAssertion(val) {
        test.throws(
            function () {
                parse(val)
            },
            assert.AssertionError,
            'invalid input should be asserted'
        )
    }

    testAssertion(1)
    testAssertion({})
    testAssertion(true)
    testAssertion(testAssertion)

    test.end()
})

test.test('cache', function (test) {
    var words = parse('a b c')
    test.equal(parse('a b c'), words, 'result should be cached')

    parse.cache = false
    words       = parse('a b c')
    test.notEqual(parse('a b c'), words, 'result should not be cached')

    test.end()
})

parse.regExp = /a+/g
test.same(parse('aurora'), [ 'a', 'a' ], 'regexp should be overridden')
