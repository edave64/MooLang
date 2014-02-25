(function () {
    "use strict";

    var proto, constructor,
        func, obj;

    constructor = function (func) {
        /* Yes, you shouldn't use __proto__, implement a better way */
        func.__proto__ = constructor.prototype;
        return func;
    };

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = constructor;
        obj = require('./object');
        func = require('./function');
    } else {
        Moo.JS.Function = constructor;
        func = Moo.JS.Function;
        obj = Moo.JS.Object;
    }

    proto = constructor.prototype = Object.create(obj.prototype);
    proto['|'] = func(function (self) {
        return func(function (other) {
            return func(function (param) {
                return self(other(param));
            })
        })
    });
}());
