(function () {
    "use strict";
    var proto, constructor,
        func, obj, str;

    constructor = function (str) {
        this.__s = str;
    };

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = constructor;
        obj = require('./object');
        func = require('./function');
        str = require('./string');
    } else {
        Moo.JS.String = constructor;
        func = Moo.JS.Function;
        obj = Moo.JS.Object;
        str = Moo.JS.String;
    }

    proto = constructor.prototype = Object.create(obj.prototype);
    proto['+'] = func(function (self) {
        return func(function (other) {
            return new str(self.__s + other.toNativeString());
        })
    });

    proto.reverse = func(function (self) {
        var o = "", s = self.__s;

        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];

        return new str(o);
    });

    proto.toNativeString = func(function (self) {
        return this.__s.toString();
    });
}());
