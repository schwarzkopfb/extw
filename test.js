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

    function testAssertion(val, cache) {
        test.throws(
            function () {
                parse(val, cache)
            },
            assert.AssertionError,
            'invalid input should be asserted'
        )
    }

    testAssertion(1)
    testAssertion({})
    testAssertion(true)
    testAssertion(testAssertion)

    testAssertion('a', 1)
    testAssertion('a', true)
    testAssertion('a', testAssertion)

    test.doesNotThrow(
        function () {
            parse('a', {})
            parse('a', null)
            parse('a', false)
        },
        'valid cache param should be accepted'
    )

    test.end()
})

test.test('cache', function (test) {
    var words = parse('a b c')
    test.equal(parse('a b c'), words, 'result should be cached')

    parse.cache = false
    words       = parse('a b c')
    test.notEqual(parse('a b c'), words, 'result should not be cached')

    var cache = {},
        list  = parse('a b c', cache)
    test.equal(list, cache[ 'a b c' ], 'cache should be set per call')

    parse.cache = cache = {}
    parse('c b a', null)
    test.same(cache, {}, 'cache should be disabled')
    parse('c b a', false)
    test.same(cache, {}, 'cache should be disabled')

    test.end()
})

parse.regExp = /a+/g
test.same(parse('aurora'), [ 'a', 'a' ], 'regexp should be overridden')
