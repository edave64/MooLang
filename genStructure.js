Moo.genStructure = function (token) {
    var node = {
            type: "root",
            contents: [],
            start: 1,
            parent: null
        },
        multipleStatements = [true],
        doArglist = false,
        rootExpression = {
            type: "call",
            contents: [],
            start: 1,
            parent: node
        },
        newNode;

    function last (ary) {
        return ary[ary.length - 1];
    }

    node.contents.push(rootExpression);
    node = rootExpression;

    token.every(function (val) {
        if (doArglist) {
            if (val.type === 'identifier') {
                node.arglist.push(val);
            } else if (val.value === ';') {
                doArglist = false;
                newNode = {
                    type: "call",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                node.contents.push(newNode);
                node = newNode;
            } else {
                throw new Error ('Unexpected "' + val.value + '" in argument list');
            }
        } else {
            if (val.value === 'do') {
                newNode = {
                    type: "lambda",
                    contents: [],
                    arglist: [],
                    start: val.line,
                    parent: node
                };
                multipleStatements.push(true);
                node.contents.push(newNode);
                node = newNode;
                doArglist = true;
            } else if (val.value === 'end') {
                node = node.parent.parent;
                multipleStatements.pop();
            } else if (val.value === '{') {
                newNode = {
                    type: "object",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                multipleStatements.push(true);
                node.contents.push(newNode);
                node = newNode;
                newNode = {
                    type: "call",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                node.contents.push(newNode);
                node = newNode;
            } else if (val.value === '}') {
                node = node.parent.parent;
                multipleStatements.pop();
            } else if (val.value === '[') {
                newNode = {
                    type: "bracketAccess",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                multipleStatements.push(false);
                node.contents.push(newNode);
                node = newNode;
                newNode = {
                    type: "value",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                node.contents.push(newNode);
                node = newNode;
            } else if (val.value === ']') {
                node = node.parent.parent;
                multipleStatements.pop();
            } else if (val.value === '(') {
                newNode = {
                    type: "call",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                multipleStatements.push(false);
                node.contents.push(newNode);
                node = newNode;
            } else if (val.value === ')') {
                node = node.parent;
                multipleStatements.pop();
            } else if (val.value === ':') {
                if (node.type === 'call') {
                    node.type = 'single-assignment';
                    node.variables = node.contents;
                    node.contents = [];
                } else {
                    throw new Error ('Unexpected "' + val.value + '" in assignment');
                }
            } else if (val.value === '::') {
                if (node.type === 'call') {
                    node.type = 'double-assignment';
                    node.variables = node.contents;
                    node.contents = [];
                } else {
                    throw new Error ('Unexpected "' + val.value + '" in assignment');
                }
            } else if (val.value === ';') {
                if (!last(multipleStatements)) {
                    throw new Error ('Unexpected "' + val.value + '"');
                }
                node = node.parent;
                newNode = {
                    type: "call",
                    contents: [],
                    start: val.line,
                    parent: node
                };
                node.contents.push(newNode);
                node = newNode;
            } else {
                node.contents.push(val);
            }
        }

        return true;
    });

    function removeParents (node) {
        delete node.parent;
        if (node.contents) {
            node.contents.every(function (subnode) {
                removeParents(subnode);
                return true;
            })
        }
        return node;
    }

    return removeParents(node.parent);
};
