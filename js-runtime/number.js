(function () {
    "use strict";
    var proto, constructor,
        str, func, obj;

    constructor = function (i) {
        this.__s = i;
    };

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = constructor;
        obj = require('./object');
        func = require('./function');
        str = require('./string');
    } else {
        Moo.JS.Number = constructor;
        func = Moo.JS.Function;
        obj = Moo.JS.Object;
        str = Moo.JS.String;
    }

    //noinspection JSPrimitiveTypeWrapperUsage
    proto = constructor.prototype = Object.create(obj.prototype);
    proto.toNativeString = func(function () {
        return this.__s.toString();
    });

    proto['+'] = func(function (self) {
        return func(function (other) {
            return new constructor(self.__s + other.__s);
        });
    });

    proto['-'] = func(function (self) {
        return func(function (other) {
            return new constructor(self.__s - other.__s);
        });
    });

    proto['*'] = func(function (self) {
        return func(function (other) {
            return new constructor(self.__s * other.__s);
        });
    });

    proto['/'] = func(function (self) {
        return func(function (other) {
            return new constructor(self.__s / other.__s);
        });
    });

    proto['^'] = func(function (self) {
        return func(function (other) {
            return new constructor(Math.pow(self.__s, other.__s));
        });
    });

    proto['//'] = func(function (self) {
        return func(function (other) {
            return new constructor(Math.pow(self.__s, 1 / other.__s));
        });
    });

    proto.abs = func(function (self) {
        return new constructor(Math.abs(self.__s));
    });

    proto.ceil = func(function (self) {
        return new constructor(Math.ceil(self.__s));
    });

    proto.floor = func(function (self) {
        return new constructor(Math.floor(self.__s));
    });

    proto.round = func(function (self) {
        return new constructor(Math.round(self.__s));
    });

    proto.toI = func(function (self) {
        return new constructor(Math.floor(self.__s));
    });

    proto.toS = func(function (self) {
        return new str(self.__s.toString());
    });

    proto.mod = func(function (self) {
        return func(function (other) {
            return new constructor(
                ((self.__s % other.__s) + other.__s) % other.__s
            );
        });
    });

    proto.divmod = func(function (self) {
        var mod = proto.mod(self);
        return func(function (other) {
            var div;
            mod = mod(other).__s;
            div = (other.__s - mod) / self.__s;
            return [
                new constructor(div), new constructor(mod)
            ];
        });
    });

    proto.toNativeString = func(function () {
        return this.__s.toString();
    });

    proto.times = func(function (self) {
        return func(function (callback) {
            var i;
            for (i = 0; i < self.__s; i++) {
                callback(new constructor(i));
            }
        });
    });

    /* node switch */
    if (typeof module !== 'undefined') {
        require('./comparable')(proto);
    } else {
        Moo.JS.Comparable(proto);
    }
}());
