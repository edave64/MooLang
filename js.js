Moo.JS = function (ast) {
    var a;
    if (!ast) {
        return "";
    }
    a = Moo.JS.translators[ast.type](ast);
    return a;
};

var translate = Moo.JS.translators = {};

translate.call = function (obj) {
    var res = '(' + Moo.JS(obj.method) + ')';
    obj.contents.every(function (val) {
        res += '(' + Moo.JS(val) + ')';
        return true;
    });

    if (obj.contents.length === 0) {
        res += '()';
    }
    return res;
};

translate.root = function (obj) {
    var res = 'scope = Object.create(Moo.JS.BaseScope);\n';
    obj.contents.every(function (val) {
        res += Moo.JS(val) + ';';
        return true;
    });
    return res;
};

translate.identifier = function (obj) {
    return 'scope.' + obj.value;
};

translate.number = function (obj) {
    return obj.value;
};

translate.string = function (obj) {
    return 'new Moo.JS.String("' + obj.value.toString() + '")';
};

translate.lambda = function (obj) {
    var res = '(function () {\nvar ownFunction = ';
    if (!obj.arglist) obj.arglist = [];
    obj.arglist.every(function (val, key) {
        if (key > 0) {
            res += 'return Moo.JS.Function(function (' + val.value + ') {\n';
        } else {
            res += 'Moo.JS.Function(function (' + val.value + ') {\n';
        }
        return true;
    });
    if (obj.arglist.length === 0) {
        res += 'Moo.JS.Function(function () {\n';
    }
    res += "var scope = Object.create(ownFunction.scope);\nscope.scope = scope;\n";
    obj.arglist.every(function (val, key) {
        res += 'scope.' + val.value + ' = ' + val.value + ';\n';
        return true;
    });
    obj.contents.every(function (val, key) {
        if (obj.contents.length - 1 === key) {
            res += 'return ' + Moo.JS(val) + '\n';
        } else {
            res += Moo.JS(val) + '\n';
        }
        return true;
    });
    obj.arglist.every(function (val, key) {
        if (key === obj.arglist.length - 1) {
            res += '})\n';
        } else {
            res += '})\n';
        }
        return true;
    });
    if (obj.arglist.length === 0) {
        res += '})\n';
    }
    return res + ';\nownFunction.scope = Object.create(scope);return ownFunction;\n}())';
};

function access (txt) {
    var keyword;
    switch (txt) {
        case "if":
        case "else":
        case "function":
        case "return":
        case "switch":
        case "case":
        case "for":
        case "in":
        case "var":
        case "break":
        case "continue":
        case "debugger":
        case "default":
        case "do":
        case "finally":
        case "instanceof":
        case "new":
        case "this":
        case "throw":
        case "try":
        case "typeof":
        case "void":
        case "while":
        case "with":
        case "const":
        case "import":
        case "super":
        case "extends":
        case "enum":
        case "catch":
        case "goto":
        case "abstract":
        case "boolean":
        case "byte":
        case "class":
        case "double":
        case "export":
        case "final":
        case "float":
        case "int":
        case "interface":
        case "long":
        case "package":
        case "private":
        case "protected":
        case "public":
        case "short":
        case "static":
        case "synchronized":
        case "throws":
        case "transient":
        case "volatile":
        case "native":
            keyword = true;
    }

    if (keyword) {
        return "['" + txt + "']";
    } else {
        return "." + txt;
    }
}

translate['single-assignment'] = function (obj) {
    var res = '(';
    obj.variables.every(function (v, k) {
        if (!obj.contents[k]) {
            return false;
        }
        if (k > 0) {
            res += ',';
        }
        res += Moo.JS(v) + " = " + Moo.JS(obj.contents[k]);

        return true;
    });
    res += ')';

    return res;
};

translate['double-assignment'] = function (obj) {
    return 'Moo.JS.dAssign(' + Moo.JS(obj.variables) + ', "' + obj.contents.value + '")';
};

translate.dotAccess = function (obj) {
    return Moo.JS(obj.object) + access(obj.access.value) + '\n';
};

translate.dollarAccess = function (obj) {
    return '(function () {var obj = ' + Moo.JS(obj.object) + '; return obj.' + obj.access.value + '(obj)}())\n';
};

translate.operatorAccess = function (obj) {
    return '(function () {var obj = ' + Moo.JS(obj.object) + '; return obj["' + obj.access.value + '"](obj)}())\n';
};

