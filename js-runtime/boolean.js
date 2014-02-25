(function () {
    "use strict";

    var _true, _false, nil, obj, proto, bool;

    bool = function (b) {
        return (b === _false || b === Moo.JS.Nil ? _false : _true);
    };

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = bool;
        obj = require('./object');
        nil = require('./nil');
    } else {
        Moo.JS.Boolean = bool;
        obj = Moo.JS.Object;
        nil = Moo.JS.Nil
    }

    //noinspection JSPrimitiveTypeWrapperUsage
    proto = bool.prototype = Object.create(obj.prototype);

    proto.toNativeString = Moo.JS.Function(function () {
        return this === _true ? "true" : "false";
    });


    if (typeof module !== 'undefined') {
        _true = require('./true');
    } else {
        _true = Moo.JS.True = Object.create(proto);
        _false = Moo.JS.False = Object.create(proto);
    }
}());
