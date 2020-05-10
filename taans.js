"use strict"

let BASE_NOTES = ['S', 'r', 'R', 'g', 'G', 'M', 'm', 'P', 'd', 'D', 'n', 'N', 'HOLD'];
let OCTAVES = ['LOWER', 'MIDDLE', 'UPPER'];
var HOLD = {octave: 'MIDDLE', note: 'HOLD'};
var HOLD2 = [HOLD, HOLD];
var DEFAULT_NOTE_LEN = 0.5;

var displayStr = {'S': 'ಸಾ', 'r': '<u>ರೆ</u>', 'R': 'ರೆ', 'g': '<u>ಗ</u>', 'G': 'ಗ', 'M': 'ಮ', 'm': 'MaT', 'P': 'ಪ',
    'd': '<span style="font-size:85%"><u>ಧ</u></span>', 'D': '<span style="font-size:85%">ಧ</span>',
    'n': '<u>ನಿ</u>', 'N': 'ನಿ', 'HOLD': '-'};


var displayStr = {'S': 'सा', 'r': '<u>रे</u>', 'R': 'रे', 'g': '<u>ग</u>', 'G': 'ग', 'M': 'म', 'm': 'MaT', 'P': 'प',
    'd': '<u>ध</u>', 'D': 'ध',
    'n': '<u>नी</u>', 'N': 'नी', 'HOLD': '-'};

var displayStr = {'S': 'Sa', 'r': '<u>Re</u>', 'R': 'Re', 'g': '<u>Ga</u>', 'G': 'Ga', 'M': 'Ma', 'm': 'MaT', 'P': 'Pa',
    'd': '<span style="font-size:85%"><u>Dha</u></span>', 'D': '<span style="font-size:85%">Dha</span>',
    'n': '<u>Ni</u>', 'N': 'Ni', 'HOLD': '-'};

let raagNotes = {
    'Bhoop': ['S', 'R', 'G', 'P', 'D'],
    'Durga': ['S', 'R', 'M', 'P', 'D'],
    'Bairagi': ['S', 'r', 'M', 'P', 'n'],
    'Malkauns': ['S', 'g', 'M', 'd', 'n'],
    'Chandrakauns': ['S', 'g', 'M', 'd', 'N'],
    'Vibhas': ['S', 'r', 'G', 'P', 'd'],
    'BhoopalTodi': ['S', 'r', 'g', 'P', 'd'],
};

let patti;

function generateFullPatti(raag) {
    patti = [];
    for (let i = 0; i < OCTAVES.length; i++)
        for (let j = 0; j < raagNotes[raag].length; j++)
            patti.push ({octave: OCTAVES[i], note: raagNotes[raag][j]});
}

function idxOfNoteInPatti(note) {
    let noteJson = JSON.stringify(note);
    for (var i = 0; i < patti.length; i++)
        if (JSON.stringify(patti[i]) === noteJson)
            return i;
    return -1;
}

// generates a pattern of notes from the starting note
// optionally, if given a skip and a count, generates the pattern count number of times, each time shifting the starting note by the given skip
// pattern for srgmpdns is [1, 1, 1, 1, 1, 1, 1], i.e. each step is relative to the previous note (not the starting note)
// skip, count are optional
// ski;
function generate(startNote, pattern, skip, count) {
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

    var cumulative_len = 0.0;
    for (var i = 0; i < sequence.length; i++) {
        let note = sequence[i];
        if (!note.len)
            note.len = DEFAULT_NOTE_LEN;

        if (i === 0 || cumulative_len >= 1.0) {
            cumulative_len = 0.0;
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

        cumulative_len += note.len;

        if (note.octave === 'LOWER')
            html += '<div class="note lower-octave">';
        else if (note.octave === 'UPPER')
            html += '<div class="note upper-octave">';
        else
            html += '<div class="note">';
        html += displayStr[note.note];
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

function parse (s) {
    var result = [];
    var current_note_len = DEFAULT_NOTE_LEN;
    for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i), skip_ch = false;
        var octave = 'MIDDLE';
        var note;

        if (ch === '-') {
            octave = 'LOWER';
            i++;
            note = s.charAt(i);
        } else if (ch === '+') {
            octave = 'UPPER';
            i++;
            note = s.charAt(i);
        } else if (ch === '{') {
            var notes_in_beat = s.substring(i).replace(/[-]/g,'').replace(/[+]/g,'').indexOf('}') - 1; // replace the + and -
            if (notes_in_beat >= 1)
                current_note_len = 1/notes_in_beat;
            console.log (current_note_len);
            skip_ch = true;
        } else if (ch === '}') {
            current_note_len = DEFAULT_NOTE_LEN;
            skip_ch = true;
        } else if (ch === '_') {
            note = 'HOLD';
        } else {
            note = s.charAt(i);
        }

        if (!BASE_NOTES.includes(note))
            alert ('BASE_NOTES doesn\'t include ' + note);

        if (!skip_ch)
            result.push({note: note, octave: octave, len: current_note_len});
    }
    return result;
}

$(function() {
    generateFullPatti('Bairagi');
    let middle_sa_idx = idxOfNoteInPatti({octave: 'MIDDLE', note: 'S'});
    let upper_sa_idx = idxOfNoteInPatti({octave: 'MIDDLE', note: 'S'});

    // bairagi taans
    var snpmrs = generate(patti[upper_sa_idx], [], -1, 6);
    var npmrs_ = generate(patti[upper_sa_idx-1], [], -1, 5);
    npmrs_.push(HOLD);
    var rmrs = generate(patti[middle_sa_idx+1], [1, -1, -1]);
    var ns = generate(patti[middle_sa_idx-1], [1]);
    var rmpnpmrs = generate(patti[middle_sa_idx+1], [1, 1, 1, -1, -1, -1, -1]);
    var rsnsrpm_ = generate (patti[middle_sa_idx+1], [-1, -1, 1, 1, 2, -1]);
    rsnsrpm_.push(HOLD);

    // pattern of 2 with tihai
    {
        var taan = generate(patti[middle_sa_idx], [-1], 1, 7);
        taan.push.apply(taan, npmrs_);
        taan.push.apply(taan, tihai(rmrs));
        display(taan, 14, 16);
    }

    // pattern of 3
    {
        taan = generate(patti[middle_sa_idx-1], [1, 1], 1, 5);
        taan.push(HOLD);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, generate(patti[upper_sa_idx], [1, -1, -1], -2, 3));
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 5
    {
        taan = generate(patti[middle_sa_idx-1], [1, 1, -2, 1], 2, 3);
        taan.push.apply(taan, generate(patti[upper_sa_idx], [1, -1, -1], -2, 2));
        taan.push.apply(taan, rmpnpmrs);
        taan.push(HOLD);
        display(taan, 14, 16);
    }

    // pattern of 4 with NSNS pattern
    {
        taan = generate(patti[middle_sa_idx-1], [1, -1, 1], 2, 4);
        taan.push.apply(taan, generate(patti[upper_sa_idx], [-1, 1, -1], -2, 3));
        taan.push.apply(taan, ns);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 6 from the top
    {
        taan = generate(patti[upper_sa_idx+1], [-1, -1, +2, -1, -1], -1, 5);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 8
    {
        taan = generate(patti[middle_sa_idx-1], [1, 1, -1, -1, 1, 1, 1], 2, 3);
        taan.push.apply(taan, snpmrs);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 24
    {
        var pattern1 = [1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1];
        pattern1.push.apply (pattern1, [1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1]);

        taan = generate(patti[middle_sa_idx-1], pattern1, 2, 3);
        taan.push.apply(taan, snpmrs);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, tihai(rsnsrpm_));
        display(taan, 14, 16);
    }

    // bhoop - teentaal
    DEFAULT_NOTE_LEN = 1.0;
    display(parse('D+SDPGRSRG_GRGPD_'), 9, 16);
    display(parse('GGGRGPD_+S_DPGRS_'), 9, 16);
    display(parse('G_G_P_D_+S_+S_+S+R+S_'), 9, 16);
    display(parse('+G+R+SD+R+SDP+S_DPGRS_'), 9, 16);

    // bhoop ektaal
    display(parse('GRG_R_S-D-P-DSR'), 1, 12);
    display(parse('GRG_{GP}{DP}GRSDS_'), 1, 12);
    display(parse('-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}'), 1, 12);
    display(parse('-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}'), 1, 12);
    display(parse('GGGPDPD+SD+S_+S'), 1, 12);
    display(parse('DDD+S+R+R{+S+R}+G+R{+S+R}{+SD}P'), 1, 12);
    display(parse('D{D+S}DPG{GP}GRS{SR}{S-D}{SR}'), 1, 12);
});

