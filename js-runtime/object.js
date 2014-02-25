(function () {
    "use strict";
    var id = 1,
        constructor,
        func,
        proto,
        bool,
        number,
        nil,
        _true,
        _false;

    constructor = function () {};

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = constructor;
        func = require('./function');
        bool = require('./boolean');
        number = require('./number');
        _true = require('./true');
        _false = require('./false');
        nil = require('./nil');
    } else {
        Moo.JS.Object = constructor;
        func = Moo.JS.Function;
        bool = Moo.JS.Boolean;
        _true = Moo.JS.True;
        _false = Moo.JS.False;
        nil = Moo.JS.Nil;
        number = Moo.JS.Number;
    }

    proto = constructor.prototype;

    proto.extend = func(function (dest) {
        return func(function (source) {
            Object.getOwnPropertyNames(source).forEach(function (key) {
                dest[key] = source[key];
            });
        });
    });

    proto.isNil = func(function (self) {
        return self === nil;
    });

    proto.objectID = func(function (dest) {
        if (!dest.__id__) {
            dest.__id__ = id++;
        }
        return new number(dest.__id__);
    });

    proto['&&'] = func(function (self) {
        var tru = bool(self) === _true;
        return func(function (val) {
            if (tru) { return val }
            else     { return self }
        });
    });

    proto['||'] = func(function (self) {
        var tru = bool(self) === _true;
        return func(function (val) {
            if (tru) { return self }
            else     { return val }
        });
    });

    proto['='] = func(function (self) {
        return func(function (other) {
            return new bool(self === other);
        });
    });

    proto['!='] = func(function (self) {
        return func(function (other) {
            return new bool(self !== other);
        });
    });

    proto['!'] = func(function (val) {
        return (val === _false || val == nil) ? _true : _false;
    });
}());
