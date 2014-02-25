/* Needed to Split these because of circular references in and to function */

(function () {
    "use strict";

    if (typeof module === 'undefined') {
        Moo.JS.Object = function () {};
    }
}());
