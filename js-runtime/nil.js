(function () {
    "use strict";

    Moo.JS.Nil = Object.create(Moo.JS.Object.prototype);
    Moo.JS.Nil.toNativeString = Moo.JS.Function(function () {
        return 'nil';
    });
}());
