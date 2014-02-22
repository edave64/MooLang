(function () {
    "use strict";

    Moo.JS.Number = function (i) {
        this.__s = i;
    };

    var proto = Moo.JS.Number.prototype = Object.create(Moo.JS.Object.prototype);
    proto.toNativeString = Moo.JS.Function(function () {
        return this.__s.toString();
    });

    proto['+'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(self.__s + other.__s);
        });
    });

    proto['-'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(self.__s - other.__s);
        });
    });

    proto['*'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(self.__s * other.__s);
        });
    });

    proto['/'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(self.__s / other.__s);
        });
    });

    proto['^'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(Math.pow(self.__s, other.__s));
        });
    });

    proto['//'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(Math.pow(self.__s, 1 / other.__s));
        });
    });

    proto['//'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(Math.pow(self.__s, 1 / other.__s));
        });
    });

    Moo.JS.Comparable(proto);

    proto.toNativeString = Moo.JS.Function(function (self) {
        return this.__s.toString();
    });
}());
