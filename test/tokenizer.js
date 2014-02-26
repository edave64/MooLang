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
                    return tokenizer('testing');
                },

                length: function (topic) {
                    assert.equal(topic.length, 1);
                },

                recognized: function (topic) {
                    assert.ok(topic[0] !== undefined);
                    assert.equal(topic[0].type, 'identifier');
                    assert.equal(topic[0].value, 'testing');
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
                    assert.ok(topic[0] !== undefined);
                    assert.equal(topic[0].type, 'number');
                    assert.equal(topic[0].value, '123');
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
                    assert.ok(topic[0] !== undefined);
                    assert.equal(topic[0].type, 'string');
                    assert.equal(topic[0].value, 'TestedSQ');
                }
            },
            'double-quote strings': {
                topic: function () {
                    return tokenizer('"TestedDQ"');
                },

                length: function (topic) {
                    assert.equal(topic.length, 1);
                },

                recognized: function (topic) {
                    assert.ok(topic[0] !== undefined);
                    assert.equal(topic[0].type, 'string');
                    assert.equal(topic[0].value, 'TestedDQ');
                }
            }
        },
        'do blocks': {
            keywords: {
                topic: function () {
                    return tokenizer('do end');
                },

                length: function (topic) {
                    assert.equal(topic.length, 2);
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
                    return tokenizer('do end');
                },

                length: function (topic) {
                    assert.equal(topic.length, 2);
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
        }
    }).export(module);
}());
