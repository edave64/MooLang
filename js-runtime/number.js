(function () {
    "use strict";

    Moo.JS.Number = function (i) {
        this.__s = i;
    };

    //noinspection JSPrimitiveTypeWrapperUsage
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
        return new Moo.JS.Number(Math.pow(self.__s, 1 / other.__s));
    });

    Moo.JS.Comparable(proto);

    proto.abs = Moo.JS.Function(function (self) {
        return new Moo.JS.Number(Math.abs(self.__s));
    });

    proto.ceil = Moo.JS.Function(function (self) {
        return new Moo.JS.Number(Math.ceil(self.__s));
    });

    proto.floor = Moo.JS.Function(function (self) {
        return new Moo.JS.Number(Math.floor(self.__s));
    });

    proto.round = Moo.JS.Function(function (self) {
        return new Moo.JS.Number(Math.round(self.__s));
    });

    proto.toI = Moo.JS.Function(function (self) {
        return new Moo.JS.Number(Math.floor(self.__s));
    });

    proto.toS = Moo.JS.Function(function (self) {
        return new Moo.JS.String(self.__s.toString());
    });

    proto.mod = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Number(
                ((self.__s % other.__s) + other.__s) % other.__s
            );
        });
    });

    proto.divmod = Moo.JS.Function(function (self) {
        var mod = proto.mod(self);
        return Moo.JS.Function(function (other) {
            var div;
            mod = mod(other).__s;
            div = (other.__s - mod) / self.__s;
            return [
                new Moo.JS.Number(div), new Moo.JS.Number(mod)
            ];
        });
    });

    proto.toNativeString = Moo.JS.Function(function () {
        return this.__s.toString();
    });

    proto.times = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (callback) {
            var i;
            for (i = 0; i < self.__s; i++) {
                callback(new Moo.JS.Number(i));
            }
        });
    });
}());
