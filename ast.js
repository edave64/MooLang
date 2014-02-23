Moo.AST = function (structure) {
    var lastObject,
        lastPunctuation,
        newStructure = {};

    if (structure.contents === undefined) return structure;

    newStructure.type = structure.type;
    newStructure.starts = structure.starts;
    newStructure.arglist = structure.arglist;
    newStructure.contents = [];

    function stuffs (oldVals, buf) {
        oldVals.every(function (value) {
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
                value.object = lastObject;
                lastObject = undefined;
            }

            if (value.type === 'operator') {
                value = {
                    type: 'operatorAccess',
                    object: lastObject,
                    start: lastObject.start,
                    access: value
                };
                lastObject = undefined;
            }

            if (lastObject) {
                buf.push(lastObject);
            }

            lastObject = value;

            return true;
        });

        if (lastObject) {
            //noinspection JSUnusedAssignment
            buf.push(lastObject);
            lastObject = undefined;
        }
    }

    stuffs(structure.contents, newStructure.contents);

    if (structure.variables) {
        newStructure.variables = [];
        stuffs(structure.variables, newStructure.variables);
    }

    if (newStructure.type === 'call') {
        if (newStructure.contents.length === 0) { //noinspection JSConstructorReturnsPrimitive
            return undefined;
        }

        newStructure.method = newStructure.contents.shift();
    }

    return newStructure;
};
