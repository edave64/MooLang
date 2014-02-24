(function () {
    "use strict";

    Moo.JS.Array = function () {
        this.__s = [];
    };

    var proto = Moo.JS.Array.prototype = Object.create(Moo.JS.Object.prototype);
    proto.toNativeString = Moo.JS.Function(function (list) {
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
    proto.push = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (value) {
            self.__s.push(value);
            return value;
        });
    });
    proto.unshift = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (value) {
            self.__s.unshift(value);
            return value;
        });
    });
    proto.each = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (callback) {
            self.__s.every(function (v) {
                callback(v);
                return true;
            })
        });
    });
    proto.shift = Moo.JS.Function(function (self) {
        return self.__s.shift();
    });
}());
