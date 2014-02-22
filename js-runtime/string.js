(function () {
    "use strict";

    Moo.JS.String = function (str) {
        this.__s = str;
    };

    var proto = Moo.JS.String.prototype = Object.create(Moo.JS.Object.prototype);
    proto['+'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.String(self.__s + other.toNativeString());
        })
    });

    proto.reverse = Moo.JS.Function(function (self) {
        var o = "", s = self.__s;

        for (var i = s.length - 1; i >= 0; i--)
            o += s[i];

        return new Moo.JS.String(o);
    });

    proto.toNativeString = Moo.JS.Function(function (self) {
        return this.__s.toString();
    });
}());
