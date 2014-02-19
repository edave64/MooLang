Moo.AST = function (structure) {
    var lastObject,
        lastPunctuation,
        newStructure = {};

    if (structure.contents === undefined) return structure;

    newStructure.type = structure.type;
    newStructure.starts = structure.starts;
    newStructure.arglist = structure.arglist;
    newStructure.contents = [];

    function process (value, buf) {
        value = Moo.AST(value);
        if (!value) return true;

        switch (lastPunctuation) {
            case '.':
                if (value.type !== 'identifier') {
                    throw new Error ('Unexpected "' + value.type + '"');
                }
                buf.push({
                    type: "dotAccess",
                    object: lastObject,
                    access: value
                });
                lastPunctuation = undefined;
                lastObject = undefined;
                return true;

            case '$':
                if (value.type !== 'identifier' && value.type !== 'bracketAccess') {
                    throw new Error ('Unexpected "' + value.type + '"');
                }
                buf.push({
                    type: "dollarAccess",
                    object: lastObject,
                    access: value.type === 'bracketAccess' ? value.contents[0] : value
                });
                lastPunctuation = undefined;
                lastObject = undefined;
                return true;
        }

        if (value.type === 'punctuation') {
            lastPunctuation = value.value;
            return true;
        }

        if (value.type === 'comment') {
            return true;
        }

        if (value.type === 'bracketAccess') {
            buf.push(value);
            value.object = lastObject;
            lastObject = undefined;
        }

        if (lastObject) {
            buf.push(lastObject);
        }

        lastObject = value;

        return true;
    }

    structure.contents.every(process, newStructure.contents);

    if (structure.variables) {
        newStructure.variables = [];
        structure.variables.every(process, newStructure.variables);
    }


    if (lastObject) {
        //noinspection JSUnusedAssignment
        newStructure.contents.push(lastObject);
    }

    if (newStructure.type === 'call') {
        if (newStructure.contents.length === 0) return undefined;

        newStructure.method = newStructure.contents.shift();
    }

    return newStructure;
};
