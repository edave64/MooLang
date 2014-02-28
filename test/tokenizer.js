(function () {
    "use strict";

    var tokenizer,
        vows = require('vows'),
        assert = require('assert');

    vows.describe('tokenizer').addBatch({                  // Batch
        'prerequisites': {                                 // Context
            topic: function () {
                return tokenizer = require('../tokenizer');
            },                          // Topic

            'tokenizer could be loaded': function () {
                assert.ok(tokenizer !== undefined);
            }
        }
    }).addBatch({
        'literal recognition': {
            'identifier': {
                topic: function () {
                    return tokenizer('smallBIG_4');
                },

                length: function (topic) {
                    assert.equal(topic.length, 1);
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'smallBIG_4', line: 1 }
                    ]);
                }
            },
            'integer': {
                topic: function () {
                    return tokenizer('123');
                },

                length: function (topic) {
                    assert.equal(topic.length, 1);
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'number', value: '123', line: 1 }
                    ]);
                }
            },
            'single-quote strings': {
                topic: function () {
                    return tokenizer("'TestedSQ");
                },

                length: function (topic) {
                    assert.equal(topic.length, 1);
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'string', value: 'TestedSQ', line: 1 }
                    ]);
                }
            },
            'double-quote strings': {
                topic: function () {
                    return tokenizer('"TestedDQ"');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'string', value: 'TestedDQ', line: 1 }
                    ]);
                }
            }
        },
        'do blocks': {
            keywords: {
                topic: function () {
                    return tokenizer('do end');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'keyword', value: 'do', line: 1 },
                        { type: 'keyword', value: 'end', line: 1 }
                    ]);
                }
            },

            'with multiple lines': {
                topic: function () {
                    return tokenizer('do a b\nb a\nend');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'keyword',     value: 'do',  line: 1 },
                        { type: 'identifier',  value: 'a',   line: 1 },
                        { type: 'identifier',  value: 'b',   line: 1 },
                        { type: 'punctuation', value: ';',   line: 1 },
                        { type: 'identifier',  value: 'b',   line: 2 },
                        { type: 'identifier',  value: 'a',   line: 2 },
                        { type: 'punctuation', value: ';',   line: 2 },
                        { type: 'keyword',     value: 'end', line: 3 }
                    ]);
                }
            }
        },
        'punctuation': {
            'single colon assignment': {
                topic: function () {
                    return tokenizer('testVar2 :: 23');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'testVar2', line: 1 },
                        { type: 'punctuation', value: '::', line: 1 },
                        { type: 'number', value: '23', line: 1 }
                    ]);
                }
            },
            'double colon assignment': {
                topic: function () {
                    return tokenizer('testVar: 42');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'testVar', line: 1 },
                        { type: 'punctuation', value: ':', line: 1 },
                        { type: 'number', value: '42', line: 1 }
                    ]);
                }
            },
            'dot access': {
                topic: function () {
                    return tokenizer('testObj.attribute');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'testObj', line: 1 },
                        { type: 'punctuation', value: '.', line: 1 },
                        { type: 'identifier', value: 'attribute', line: 1 }
                    ]);
                }
            },
            'dollar access': {
                topic: function () {
                    return tokenizer('testObj2$method');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'testObj2', line: 1 },
                        { type: 'punctuation', value: '$', line: 1 },
                        { type: 'identifier', value: 'method', line: 1 }
                    ]);
                }
            },
            'operator access': {
                topic: function () {
                    return tokenizer('testObj3 +*-/&|%§²³!?~<>^° operant');
                },

                complex: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'testObj3', line: 1 },
                        { type: 'operator', value: '+*-/&|%§²³!?~<>^°', line: 1 },
                        { type: 'identifier', value: 'operant', line: 1 }
                    ]);
                }
            },
            'brackets access': {
                topic: function () {
                    return tokenizer('testObj4[\'attributeName]');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'testObj4', line: 1 },
                        { type: 'punctuation', value: '[', line: 1 },
                        { type: 'string', value: 'attributeName', line: 1 },
                        { type: 'punctuation', value: ']', line: 1 }
                    ]);
                }
            },
            'newline': {
                topic: function () {
                    return tokenizer('method1 attr1 attr2\nmethod2 attr3 attr4');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'method1', line: 1 },
                        { type: 'identifier', value: 'attr1', line: 1 },
                        { type: 'identifier', value: 'attr2', line: 1 },
                        { type: 'punctuation', value: ';', line: 1 },
                        { type: 'identifier', value: 'method2', line: 2 },
                        { type: 'identifier', value: 'attr3', line: 2 },
                        { type: 'identifier', value: 'attr4', line: 2 }
                    ]);
                }
            },
            'semicolon': {
                topic: function () {
                    return tokenizer('method1 attr1 attr2;method2 attr3 attr4');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'method1', line: 1 },
                        { type: 'identifier', value: 'attr1', line: 1 },
                        { type: 'identifier', value: 'attr2', line: 1 },
                        { type: 'punctuation', value: ';', line: 1 },
                        { type: 'identifier', value: 'method2', line: 1 },
                        { type: 'identifier', value: 'attr3', line: 1 },
                        { type: 'identifier', value: 'attr4', line: 1 }
                    ]);
                }
            },
            'comma': {
                topic: function () {
                    return tokenizer('method1 attr1, attr2\nmethod2,\nattr3 attr4');
                },

                recognized: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'method1', line: 1 },
                        { type: 'identifier', value: 'attr1', line: 1 },
                        { type: 'identifier', value: 'attr2', line: 1 },
                        { type: 'punctuation', value: ';', line: 1 },
                        { type: 'identifier', value: 'method2', line: 2 },
                        { type: 'identifier', value: 'attr3', line: 3 },
                        { type: 'identifier', value: 'attr4', line: 3 }
                    ]);
                }
            },
            'automaticly inserted nil': {
                topic: function () {
                    return tokenizer('method4 8,, 2,\n7');
                },

                inserted: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier', value: 'method4', line: 1 },
                        { type: 'number',     value: 8,         line: 1 },
                        { type: 'identifier', value: 'nil',     line: 1 },
                        { type: 'number',     value: 2,         line: 1 },
                        { type: 'number',     value: 7,         line: 2 }
                    ]);
                }
            },
            'comments': {
                topic: function () {
                    return tokenizer('method5 8 # This is a comment\n' + '# This is a full comment line\n' + "method6 'asd");
                },

                inserted: function (topic) {
                    assert.deepEqual(topic, [
                        { type: 'identifier',  value: 'method5',                      line: 1 },
                        { type: 'number',      value: 8,                              line: 1 },
                        { type: 'comment',     value: ' This is a comment',           line: 1 },
                        { type: 'punctuation', value: ';',                            line: 1 },
                        { type: 'comment',     value: ' This is a full comment line', line: 2 },
                        { type: 'punctuation', value: ';',                            line: 2 },
                        { type: 'identifier',  value: 'method6',                      line: 3 },
                        { type: 'string',      value: 'asd',                          line: 3 }
                    ]);
                }
            }
        }
    }).export(module);
}());
