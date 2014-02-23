(function () {
    "use strict";
    var id = 1;

    var proto = Moo.JS.Object.prototype;
    proto.clone = Moo.JS.Function(function (source) {

    });

    proto.extend = Moo.JS.Function(function (dest) {
        return Moo.JS.Function(function (source) {
            Object.getOwnPropertyNames(source).forEach(function (key) {
                dest[key] = source[key];
            });
        });
    });

    proto.isNil = Moo.JS.Function(function (self) {
        return self === Moo.JS.Nil;
    });

    proto.objectID = Moo.JS.Function(function (dest) {
        if (!dest.__id__) {
            dest.__id__ = id++;
        }
        return new Moo.JS.Number(dest.__id__);
    });

    proto['&&'] = Moo.JS.Function(function (self) {
        var tru = Moo.JS.Boolean(self) === Moo.JS.True;
        return Moo.JS.Function(function (val) {
            if (tru) { return val }
            else     { return self }
        });
    });

    proto['||'] = Moo.JS.Function(function (self) {
        var tru = Moo.JS.Boolean(self) === Moo.JS.True;
        return Moo.JS.Function(function (val) {
            if (tru) { return self }
            else     { return val }
        });
    });

    proto['='] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Boolean(self === other);
        });
    });

    proto['!='] = Moo.JS.Function(function (self) {
        return Moo.JS.Function(function (other) {
            return new Moo.JS.Boolean(self !== other);
        });
    });

    proto['!'] = Moo.JS.Function(function (val) {
        return (val === Moo.JS.False || val == Moo.JS.Nil) ? Moo.JS.True : Moo.JS.False;
    });
}());
