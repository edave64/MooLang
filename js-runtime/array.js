(function () {
    "use strict";
    var constructor, obj, func, proto;

    constructor = function () {
        this.__s = [];
    };

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = constructor;
        obj = require('./object');
        func = require('./function');
    } else {
        Moo.JS.Array = constructor;
        obj = Moo.JS.Object;
        func = Moo.JS.Function;
    }

    proto = constructor.prototype = Object.create(obj.prototype);
    proto.toNativeString = func(function (list) {
        if (!list) {
            list = [];
        }
        if (list.indexOf(this.objectID(this)) !== -1) {
            return '(...cyclic structure...)';
        }
        list.push(this.objectID(this));
        return '((ary)' + this.__s.reduce(function (collector, val) {
            return collector + ' ' + val.toNativeString(list);
        }, '') + ')';
    });
    proto.push = func(function (self) {
        return func(function (value) {
            self.__s.push(value);
            return value;
        });
    });
    proto.unshift = func(function (self) {
        return func(function (value) {
            self.__s.unshift(value);
            return value;
        });
    });
    proto.each = func(function (self) {
        return func(function (callback) {
            self.__s.every(function (v) {
                callback(v);
                return true;
            })
        });
    });
    proto.shift = func(function (self) {
        return self.__s.shift();
    });
}());
