(function () {
    "use strict";
    var scope, obj, func;

    /* node switch */
    if (typeof module !== 'undefined') {
        obj = require('./object');
        module.exports = scope = Object.create(obj.prototype);
        func = require('./function');
    } else {
        obj = Moo.JS.Object;
        Moo.JS.BaseScope = scope = Object.create(obj.prototype);
        func = Moo.JS.Function;
    }

    obj.prototype.extend(scope)({
        cio : {
            out: func(function (str) {
                console.log(str.toNativeString());
            })
        },

        "if": func(function (val) {
            var willExec = (val !== false && val !== undefined);
            return function (func) {
                if (willExec) {
                    func();
                }
            }
        }),

        "val": func(function (val) {
            return val;
        }),

        "switch": func(function (val1) {
            return func(function (val2) {
                var willExec = (val1 === val2);

                return func(function (func) {
                    if (willExec) {
                        func();
                    }
                });
            });
        }),

        ary: func(function () {
            var newArray = new Moo.JS.Array,
                push = newArray.push(newArray),
                appender = func(function (value) {
                    if (value !== Moo.JS.Nil && value !== undefined) {
                        push(value);
                        return appender;
                    } else {
                        return newArray;
                    }
                });
            return appender;
        }),

        "true": Moo.JS.True,
        "false": Moo.JS.False,
        "nil": Moo.JS.Nil,

        "native": window
    });
}());
