'use strict';
var stdin = require('get-stdin'),
    bemmet = require('bemmet');

stdin(function (textBeforeCaret) {
    var textBeforeCaretNoSpaces = textBeforeCaret.replace(/\{(.*)\}/g, function(str) {
            return str.replace(/\ /g, 'S'); // S is used as a space placeholder
        }),
        lastSpaceSymbol = /\s/.exec(textBeforeCaretNoSpaces.split('').reverse().join('')),
        spaceNearCaretIdx = lastSpaceSymbol && textBeforeCaretNoSpaces.lastIndexOf(lastSpaceSymbol[0]),
        selection = ((typeof spaceNearCaretIdx !== null && spaceNearCaretIdx > -1) ? textBeforeCaret.substr(spaceNearCaretIdx) : textBeforeCaret).trim(),
        // regexp gets 'b1' from strings like { block: 'b1' }
        parentBlock = /block['"\s]*:(?:\s)?['"]{1}(.*?)['"]{1}/
            .exec(textBeforeCaretNoSpaces.substr(textBeforeCaretNoSpaces.lastIndexOf('block')));

    parentBlock && parentBlock[1] && (parentBlock = parentBlock[1]);

    var textLines = textBeforeCaretNoSpaces.split(/\r?\n/),
        padding = textLines[textLines.length - 1].match(/^(\s+)/),
        bemjson = '';

    if (padding !== null) {
        padding = padding[0];
    } else {
        padding = '';
    }

    try {
        bemjson = bemmet.stringify(selection, parentBlock);
    } catch(err) {
        console.error(err);
    }

    var replacedContent = bemjson
        .split(/\r?\n/)
        .map(function(line, i) {
            return i > 0 ? padding + line : line;
        })
        .join('\n');

    try {
        process.stdout.write(textBeforeCaret.replace(selection, replacedContent));
    } catch(err) {
        console.error(err);
    }
});
