(function () {
    "use strict";

    var _true, _false;

    Moo.JS.Boolean = function (b) {
        return (b === _false || b === Moo.JS.Nil ? _false : _true);
    };
    //noinspection JSPrimitiveTypeWrapperUsage
    var proto = Moo.JS.Boolean.prototype = Object.create(Moo.JS.Object.prototype);

    proto.toNativeString = Moo.JS.Function(function () {
        return this === _true ? "true" : "false";
    });

    _true = Moo.JS.True = Object.create(proto);
    _false = Moo.JS.False = Object.create(proto);
}());
