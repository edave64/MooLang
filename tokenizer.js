Moo = {};

Moo.tokenizer = function (code) {
    var i, //walker
        comment = false, duoString = false, // states
        word = '', // current Word
        char = '', // current Character
        parenthesisStack = [],
        terminated = true, separated = false, comma = false,
        nextTerminated = false, nextSeparated = false, nextComma = true,
        buf = [],
        line = 1,
        lineTemp;

    parenthesisStack.latest = function () {
        return this[this.length - 1];
    };

    function bufferPush (type, value) {
        buf.push({
            type: type,
            value: value,
            line: line
        });
    }

    function parentesisPush (type, char) {
        parenthesisStack.push({
            type: type,
            char: char,
            line: line
        })
    }

    function finishWord (type) {
        if (comment) {
            bufferPush('comment', word);
        } else if (duoString) {
            throw new Error ('Unexpected EOF (Unclosed String)');
        } else if (word === '') {
            return;
        } else if (type === undefined) {
            if (word.match(/^\d+$/)) {
                bufferPush('number', parseInt(word));
            } else if (word.match(/^'\S+$/)) {
                bufferPush('string', word.substr(1));
            } else if (word === 'do') {
                parentesisPush('multipleStatement', word);
                bufferPush('keyword', word);
            } else if (word === 'end') {
                if (parenthesisStack.latest().char !== "do") {
                    throw new Error ('Unexpected ' + word + '(Unmatched ' + parenthesisStack.latest().char + ')');
                }
                bufferPush('keyword', word);
                parenthesisStack.pop();
            } else if (word === ';') {
                if (!terminated) {
                    bufferPush('punctuation', word);
                }
                nextTerminated = true;
            } else if (word === '\n') {
                if (!terminated && !comma && parenthesisStack.latest().type === 'multipleStatement') {
                    bufferPush('punctuation', ';');
                }
                nextTerminated = true;
            } else if (word === ',') {
                if (comma) {
                    bufferPush('identifier', 'nil');
                }
                nextComma = true;
            } else if (word === ':' || word === '::' || word === '.' || word === '$') {
                bufferPush('punctuation', word);
            } else if (word === '[' || word === '(') {
                parentesisPush('singleStatement', word);
                bufferPush('punctuation', word);
            } else if (word === '{') {
                parentesisPush('multipleStatement', word);
                bufferPush('punctuation', word);
            } else if (word === '}') {
                if (parenthesisStack.latest().char !== '{') {
                    throw new Error ('Unexpected ' + word + '(Unmatched ' + parenthesisStack.latest().char + ')');
                }
                parenthesisStack.pop();
                bufferPush('punctuation', word);
            } else if (word === ']' || word === ')') {
                if (word === ']') {
                    if (parenthesisStack.latest().char !== '[') {
                        throw new Error ('Unexpected ' + word + '(Unmatched ' + parenthesisStack.latest().char + ')');
                    }
                } else if (word === ')') {
                    if (parenthesisStack.latest().char !== '(') {
                        throw new Error ('Unexpected ' + word + '(Unmatched ' + parenthesisStack.latest().char + ')');
                    }
                }
                bufferPush('punctuation', word);
                parenthesisStack.pop();
            } else if (word.match(/[\?\+\-\\*\/%&$§"!=@€~\|<>\^]+/)) {
                bufferPush('operator', word);
            } else {
                bufferPush('identifier', word);
            }
        } else {
            bufferPush(type, word);
        }
        word = "";
    }

    parentesisPush('multipleStatement', 'root');

    for (i = 0; i < code.length; i++) {
        nextComma = nextSeparated = nextTerminated = false;

        char = code[i];
        if (comment) {
            if (char === '\n') {
                comment = false;
                finishWord('comment');
                word = "\n";
                finishWord();
            } else {
                word += char;
            }
        } else if (duoString) {
            if (char === '"') {
                duoString = false;
                lineTemp = line;
                line -= word.split("\n").length - 1;
                finishWord('string');
                line = lineTemp;
            } else {
                word += char;
            }
        } else {
            //noinspection FallThroughInSwitchStatementJS
            switch (char) {
                case '\n':
                    nextComma = comma;
                    nextSeparated = separated;
                case ';':
                case ',':
                case '{':
                case '}':
                case '[':
                case ']':
                case '(':
                case ')':
                case '.':
                case '$':
                    finishWord();
                    word = char;
                    finishWord();
                    break;
                case ':':
                    if (code[i + 1] === ':') {
                        i++;
                        finishWord();
                        word = '::';
                        finishWord();
                    } else {
                        finishWord();
                        word = char;
                        finishWord();
                    }
                    break;
                case '"':
                    finishWord();
                    duoString = true;
                    break;
                case '#':
                    finishWord();
                    comment = true;
                    break;
                case ' ':
                    nextComma = comma;
                    nextSeparated = separated;
                    nextTerminated = terminated;
                    finishWord();
                    break;
                default:
                    word += char;
            }
        }

        if (char === '\n') {
            line++;
        }
        comma = nextComma;
        separated = nextSeparated;
        terminated = nextTerminated;
    }
    finishWord();
    if (parenthesisStack.length > 1) {
        throw new Error ('Unexpected EOF (Unmatched ' + parenthesisStack.latest().char + ')')
    }

    return buf;
};
