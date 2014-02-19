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

    "true": true,
    "false": false,
    "nil": undefined,

    "native": window
};
