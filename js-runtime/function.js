(function () {
    "use strict";

    Moo.JS.Function = function (func) {
        /* Yes, you shouldn't use __proto__, implement a better way */
        func.__proto__ = Moo.JS.Function.prototype;
        return func;
    };

    var proto = Moo.JS.Function.prototype = Object.create(Moo.JS.Object.prototype);
    proto['|'] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return Moo.JS.Function(function (param) {
                return self(other(param));
            })
        })
    });
}());
