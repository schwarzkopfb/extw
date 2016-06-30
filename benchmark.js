/**
 * Created by schwarzkopfb on 30/06/16.
 */

'use strict'

var words = require('./'),
    text  = '  Buggy/is, my  :beautiful&cat.'

console.log('performing 10000000 extw() calls')

console.time('default')
for (var i = 10000000; i--;)
    words(text)
console.timeEnd('default')

words.cache = false
console.time('without cache')
for (i = 10000000; i--;)
    words(text)
console.timeEnd('without cache')
