(function () {
    "use strict";
    var constructor, obj, func, proto;

    /* node switch */
    if (typeof module !== 'undefined') {
        constructor = Moo.JS.Array = function () {
            this.__s = [];
        };
        obj = Moo.JS.Object;
        func = Moo.JS.Function;
    } else {
        module.exports = constructor = function () {
            this.__s = [];
        };
        obj = require('./object');
        func = require('./function');
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
