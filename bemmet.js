'use strict';
var stdin = require('get-stdin'),
    bemmet = require('bemmet');

stdin(function (textBeforeCaret) {
    var textBeforeCaretNoSpaces = textBeforeCaret.replace(/\{(.*)\}/g, function(str) {
            return str.replace(/\ /g, 'S'); // S is used as a space placeholder
        }),
        spaceNearCaretIdx = textBeforeCaretNoSpaces.lastIndexOf(' ');

    if (spaceNearCaretIdx < 0) {
        spaceNearCaretIdx = textBeforeCaretNoSpaces.lastIndexOf('\n');
    }

    var selection = (spaceNearCaretIdx > -1 ? textBeforeCaret.substr(spaceNearCaretIdx) : textBeforeCaret).trim(),
        // regexp gets 'b1' from strings like { block: 'b1' }
        parentBlock = /block['"\s]*:(?:\s)?['"]{1}(.*?)['"]{1}/
            .exec(textBeforeCaretNoSpaces.substr(textBeforeCaretNoSpaces.lastIndexOf('block')));

        parentBlock && parentBlock[1] && (parentBlock = parentBlock[1]);

    try {
        process.stdout.write(textBeforeCaret.replace(selection, bemmet.stringify(selection, parentBlock)));
    } catch(err) {
        console.error(err);
    }
});
