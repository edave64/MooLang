(function () {
    "use strict";
    var nil, obj;

    /* node switch */
    if (typeof module !== 'undefined') {
        obj = require('./object');
        nil = module.exports = Object.create(obj.prototype);
    } else {
        obj = Moo.JS.Object;
        nil = Moo.JS.Nil = Object.create(obj.prototype);
    }

    Moo.JS.Nil.toNativeString = Moo.JS.Function(function () {
        return 'nil';
    });
}());
