'use strict';
var stdin = require('get-stdin'),
    bemmet = require('bemmet');

stdin(function (textBeforeCaret) {
    var textBeforeCaretNoSpaces = textBeforeCaret.replace(/\{(.*)\}/g, function(str) {
            return str.replace(/\ /g, 'S'); // S is used as a space placeholder
        }),
        spaceNearCaretIdx = textBeforeCaretNoSpaces.lastIndexOf(' '),
        selection = spaceNearCaretIdx > -1 ? textBeforeCaret.substr(spaceNearCaretIdx) : textBeforeCaret;

    try {
        process.stdout.write(textBeforeCaret.replace(selection, bemmet.stringify(selection)));
    } catch(err) {
        console.error(err);
    }
});
