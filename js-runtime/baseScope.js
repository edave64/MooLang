Moo.JS.BaseScope = Object.create(Moo.JS.Object.prototype);
Moo.JS.Object.prototype.extend(Moo.JS.BaseScope)({
    cio : {
        log: Moo.JS.Function (function (str) {
            console.log(str.toNativeString());
        })
    },

    "if": Moo.JS.Function (function (val) {
        var willExec = (val !== false && val !== undefined);
        return function (func) {
            if (willExec) {
                func();
            }
        }
    }),

    "val": Moo.JS.Function (function (val) {
        return val;
    }),

    "switch": Moo.JS.Function (function (val1) {
        return Moo.JS.Function (function (val2) {
            var willExec = (val1 === val2);

            return Moo.JS.Function (function (func) {
                if (willExec) {
                    func();
                }
            });
        });
    }),

    ary: Moo.JS.Function(function () {
        return new Moo.JS.Array ();
    }),

    "true": Moo.JS.True,
    "false": Moo.JS.False,
    "nil": undefined,

    "native": window
});
