Object.extend = function(dest, source) {
    Object.getOwnPropertyNames(source).forEach(function (key) {
        dest[key] = source[key];
    });
};

Moo.JS.Function = function (func) {
    /* Yes, you shouldn't use __proto__, implement a better way */
    func.__proto__ = Moo.JS.Function.prototype;
    return func;
};

var proto = Moo.JS.Function.prototype;

proto['|'] = Moo.JS.Function(function (self) {
    return Moo.JS.Function(function (other) {
        return Moo.JS.Function(function (param) {
            return self(other(param));
        })
    })
});

Moo.JS.String = function (str) {
    this.__s = str;
};

proto = Moo.JS.String.prototype;

proto.toNativeString = Moo.JS.Function(function () {
    return this.__s;
});

proto['+'] = Moo.JS.Function(function (self) {
    return Moo.JS.Function(function (other) {
        return new Moo.JS.String(self.__s + other.toNativeString());
    })
});

proto.reverse = Moo.JS.Function(function (self) {
    var o = "", s = self.__s;

    for (var i = s.length - 1; i >= 0; i--)
        o += s[i];

    return new Moo.JS.String(o);
});

Moo.JS.Array = function () {
    var a = this.__s = [],
        func = Moo.JS.Function(function (obj) {
            a.push(obj);
            return func;
        });

    return func;
};

proto = Moo.JS.Array.prototype;

proto.toNativeString = Moo.JS.Function(function () {
    return '(ary)' + this.__s.reduce(function (a, i) {
        return a + ' ' + a.toNativeString;
    }, '');
});

proto['+'] = Moo.JS.Function(function (self) {
    return Moo.JS.Function(function (other) {
        return new Moo.JS.String(self.__s + other.toNativeString());
    })
});

Moo.JS.BaseScope = {
    cio : {
        log: function (str) {
            console.log(str.toNativeString());
        }
    },

    "if": function (val) {
        var willExec = (val !== false && val !== undefined);
        return function (func) {
            if (willExec) {
                func();
            }
        }
    },

    "val": function (val) {
        return val;
    },

    "switch": function (val1) {
        return function (val2) {
            var willExec = (val1 === val2);

            return function (func) {
                if (willExec) {
                    func();
                }
            }
        }
    },

    ary: Moo.JS.Function(function () {
        return new Moo.JS.Array ();
    }),

    "true": true,
    "false": false,
    "nil": undefined,

    "native": window
};
