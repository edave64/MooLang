Moo.JS.BaseScope = {
    cio : {
        log: function (str) {
            console.log(str);
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

    "true": true,
    "false": false,
    "nil": undefined,

    "native": window
};
