(function () {
    "use strict";

    Moo.JS.Array = function () {
        var a = this.__s = [],
            func = Moo.JS.Function(function (obj) {
                a.push(obj);
                return func;
            });

        return func;
    };

    var proto = Moo.JS.Array.prototype = Object.create(Moo.JS.Object.prototype);
    proto.toNativeString = Moo.JS.Function(function () {
        return '(ary)' + this.__s.reduce(function (a, i) {
            return a + ' ' + a.toNativeString;
        }, '');
    });
}());
