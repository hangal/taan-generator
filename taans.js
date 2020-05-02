"use strict"

let BASE_NOTES = ['S', 'r', 'R', 'g', 'G', 'M', 'm', 'P', 'd', 'D', 'n', 'N', 'HOLD'];
let OCTAVES = ['LOWER', 'MIDDLE', 'UPPER'];
var HOLD = {octave: 'MIDDLE', note: 'HOLD'};
var HOLD2 = [HOLD, HOLD];

let raagNotes = [ 'S', 'r', 'M', 'P', 'n'];
let patti;

function generateFullPatti() {
    patti = [];
    for (let i = 0; i < OCTAVES.length; i++)
        for (let j = 0; j < raagNotes.length; j++)
            patti.push ({octave: OCTAVES[i], note: raagNotes[j]});
}

// generates a pattern of notes from the starting note
// optionally, if given a skip and a count, generates the pattern count number of times, each time shifting the starting note by the given skip
// pattern for srgmpdns is [1, 1, 1, 1, 1, 1, 1], i.e. each step is relative to the previous note (not the starting note)
// skip, count are optional
// ski;
function generate(startNote, pattern, skip, count) {
    function idxOfNoteInPatti(note) {
        let noteJson = JSON.stringify(note);
        for (var i = 0; i < patti.length; i++)
            if (JSON.stringify(patti[i]) === noteJson)
                return i;
        return -1;
    }

    if (typeof (skip) === "undefined")
        skip = 0;
    if (typeof (count) === "undefined")
        count = 1;

    let result = [];
    let idx = idxOfNoteInPatti (startNote);
    for (let i = 0; i < count; i++) {
        result.push (patti[idx]);
        var x = idx;
        for (let j = 0; j < pattern.length; j++) {
            if (pattern[j] === '-') {
                result.push(HOLD);
            } else {
                x += pattern[j];
                result.push(patti[x]);
            }
        }
        idx += skip;
    }
    return result;
}

function tihai (sequence) {
    var result = [...sequence]; // spread operator in ES6
    result.push.apply(result, sequence);
    result.push.apply(result, sequence);
    return result;
}

function display (sequence, start_beat, cycle) {
    var html = '<div class="taan">';
    var this_beat = start_beat;

    function close_beat() {
        html += '</div> <!-- beat -->';
    }

    for (var i = 0; i < sequence.length; i++) {
        let note = sequence[i];

        if (i % 2 === 0) {
            if (i !== 0) {
                close_beat();
                if (this_beat === start_beat) {
                    html += '<br/><br/>';
                }
            }

            //             <span class="emoji" style="font-size:200%">&#x1F44F</span>
            let sam_class = (this_beat === 1) ? 'sam' : '';
            html += '<div data-beat="' + this_beat + '" class="beat"><div class="beat-number ' + sam_class + '">' + this_beat + '</div>';
            this_beat++;
            if (this_beat > cycle)
                this_beat = 1;
        }

        if (note.octave === 'LOWER')
            html += '<div class="note lower-octave">';
        else if (note.octave === 'UPPER')
            html += '<div class="note upper-octave">';
        else
            html += '<div class="note">';

        if (note.note === 'S')
            html += 'Sa';
        if (note.note === 'r')
            html += '<u>Re</u>';
        if (note.note === 'R')
            html += 'Re';
        if (note.note === 'g')
            html += '<u>Ga</u>';
        if (note.note === 'G')
            html += 'Ge';
        if (note.note === 'M')
            html += 'Ma';
        if (note.note === 'm')
            html += 'MaT';
        if (note.note === 'P')
            html += 'Pa';
        if (note.note === 'd')
            html += '<u>Dha</u>';
        if (note.note === 'D')
            html += 'Dha';
        if (note.note === 'n')
            html += '<u>Ni</u>';
        if (note.note === 'N')
            html += 'Ni';
        if (note.note === 'HOLD')
            html += '—';
        html += '</div>';
    }

    html += "</div><br/><br/>";
    $('.taans').append (html);
}

function fitTextInContainer($container, $textElement, fontSize) {
    var MIN_FONT_SIZE = 10; // Beyond this font size the text is unreadable

    if ($container.length !== 1 || $textElement.length !== 1) { // Only one element is expected. If more than one element is present return
        WARN_ON_SERVER ('op: fitTextInContainer $container.length: ' + $container.length + ' $textElement.length: ' + $textElement.length);
        return;
    }

    var textElement = $textElement[0];
    var container = $container[0];
    var newFontSize = fontSize;
    $(textElement).css("font-size", fontSize + "px"); // start with the given font size and then scale down if required
    var currentTextHeight = textElement.scrollHeight;

    // It's important to compare the rounded values of the heights here so that the numbers have the same baseline. For example, we had a case where
    // on some Firefox 72 windows 10 instances, the $container.height() was returning a decimal value (48.8) and the textElement.scrollHeight was returning a rounded value (49) making them unequal,
    // which led to an infinite loop (we didn't have any exit conditions inside the while loop then). We should avoid mixing up jquery and javascript API when comparing two values.
    // We are using clientHeight and scrollHeight both of which return rounded values.
    while (Math.round(textElement.scrollHeight) > Math.round(container.clientHeight)) { // Note ScrollHeight > clientHeight only when the content overflows, otherwise it's equal to the clientHeight
        newFontSize--;  // reduce the font size till the clue text fits in the container
        if (newFontSize < MIN_FONT_SIZE) { // don't go below min font size
            return;
        }
        currentTextHeight = textElement.scrollHeight; // Save the current height
        $(textElement).css("font-size", newFontSize + "px");
        DEBUG_ON_SERVER ("'op: fitTextInContainer font-size:" + fontSize + ", New font-size:" + newFontSize + ", text scroll height:" + textElement.scrollHeight + ", text height:" + textElement.clientHeight + ", container height:" + container.clientHeight);
        if (currentTextHeight === textElement.scrollHeight) { // If there is no change in the textElement's scroll height even after changing the font, get out of here.
            // WARN_ON_SERVER ("op: fitTextInContainer the scrollHeight didn't change after font size reduced to: " + newFontSize + ", text scroll height: " + textElement.scrollHeight);
            return;
        }
    }
}

$(function() {
    generateFullPatti();

    // bairagi taans
    var snpmrs = generate({octave: 'UPPER', note: 'S'}, [], -1, 6);
    var npmrs_ = generate({octave: 'MIDDLE', note: 'n'}, [], -1, 5);
    npmrs_.push(HOLD);
    var rmrs = generate({octave: 'MIDDLE', note: 'r'}, [1, -1, -1]);
    var ns = generate({octave: 'LOWER', note: 'n'}, [1]);
    var rsnsrpm_ = generate ({octave: 'MIDDLE', note: 'r'}, [-1, -1, 1, 1, 2, -1]);
    rsnsrpm_.push(HOLD);

    // pattern of 2 with tihai
    {
        var taan = generate({octave: 'MIDDLE', note: 'S'}, [-1], 1, 7);
        taan.push.apply(taan, npmrs_);
        taan.push.apply(taan, tihai(rmrs));
        display(taan, 14, 16);
    }

    // pattern of 3
    {
        taan = generate({octave: 'LOWER', note: 'n'}, [1, 1], 1, 5);
        taan.push(HOLD);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, generate({octave: 'UPPER', note: 'S'}, [1, -1, -1], -2, 3));
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 5
    {
        taan = generate({octave: 'LOWER', note: 'n'}, [1, 1, -2, 1], 2, 3);
        taan.push(HOLD);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, generate({octave: 'UPPER', note: 'S'}, [1, -1, -1], -2, 3));
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 4 with NSNS pattern
    {
        taan = generate({octave: 'LOWER', note: 'n'}, [1, -1, 1], 2, 4);
        taan.push.apply(taan, generate({octave: 'UPPER', note: 'S'}, [-1, 1, -1], -2, 3));
        taan.push.apply(taan, ns);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 6 from the top
    {
        taan = generate({octave: 'UPPER', note: 'r'}, [-1, -1, +2, -1, -1], -1, 5);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 8
    {
        taan = generate({octave: 'LOWER', note: 'n'}, [1, 1, -1, -1, 1, 1, 1], 2, 3);
        taan.push.apply(taan, snpmrs);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 24
    {
        var pattern1 = [1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1];
        pattern1.push.apply (pattern1, [1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1]);

        taan = generate({octave: 'LOWER', note: 'n'}, pattern1, 2, 3);
        taan.push.apply(taan, snpmrs);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, tihai(rsnsrpm_));
        display(taan, 14, 16);
    }

});

