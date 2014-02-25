(function () {
    "use strict";
    var constructor,
        func,
        bool;

    constructor = {};

    /* node switch */
    if (typeof module !== 'undefined') {
        module.exports = constructor;
        func = require('./function');
        bool = require('./boolean');
    } else {
        Moo.JS.Comparable = constructor;
        func = Moo.JS.Function;
        bool = Moo.JS.Boolean;
    }

    constructor['>'] = func(function (self) {
        return func(function (other) {
            return new bool(self.__s > other.__s);
        });
    });

    constructor['>='] = func(function (self) {
        return func(function (other) {
            return new bool(self.__s >= other.__s);
        });
    });

    constructor['<='] = func(function (self) {
        return func(function (other) {
            return new bool(self.__s <= other.__s);
        });
    });

    constructor['<'] = func(function (self) {
        return func(function (other) {
            return new bool(self.__s < other.__s);
        });
    });
}());
