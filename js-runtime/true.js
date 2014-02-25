(function () {
    "use strict";

    var bool;

    /* node switch */
    if (typeof module !== 'undefined') {
        bool = require('./boolean');
        module.exports = Object.create(bool.prototype);
    }
}());
