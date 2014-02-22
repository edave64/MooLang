(function () {
    "use strict";

    Moo.JS.Comparable = function (proto) {
        proto['>'] = Moo.JS.Function(function (self) {
            return Moo.JS.Function(function (other) {
                return new Moo.JS.Boolean(self.__s > other.__s);
            });
        });

        proto['>='] = Moo.JS.Function(function (self) {
            return Moo.JS.Function(function (other) {
                return new Moo.JS.Boolean(self.__s >= other.__s);
            });
        });

        proto['<='] = Moo.JS.Function(function (self) {
            return Moo.JS.Function(function (other) {
                return new Moo.JS.Boolean(self.__s <= other.__s);
            });
        });

        proto['<'] = Moo.JS.Function(function (self) {
            return Moo.JS.Function(function (other) {
                return new Moo.JS.Boolean(self.__s < other.__s);
            });
        });
    };
}());
