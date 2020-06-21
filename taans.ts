
let ZERO_LEN: number = 0;
var DEFAULT_NOTE_LEN = 0.5;

enum Note {S, r, R, g, G, M, m, P, d, D, n, N, HOLD_NOTE}
enum Octave {LOWER, MIDDLE, UPPER} // important assumption for iterating over octave elements - the values have to be numbers

let displayStrEnglish = ['Sa', '<u>Re</u>', 'Re', '<u>Ga</u>','Ga', 'Ma', 'MaT', 'Pa', '<span style="font-size:85%"><u>Dha</u></span>', '<span style="font-size:85%">Dha</span>', '<u>Ni</u>', 'Ni', '-'];
let displayStrKannada = ['ಸಾ', '<u>ರೆ</u>', 'ರೆ', '<u>ಗ</u>', 'ಗ', 'ಮ', 'MaT', 'ಪ', '<u>ಧ</u>', 'ಧ', '<u>ನಿ</u>', 'ನಿ', '-'];
let displayStrDev = ['सा', '<u>रे</u>', 'रे', '<u>ग</u>', 'ग', 'म', 'MaT', 'प', '<u>ध</u>', 'ध', '<u>नी</u>', 'नी', '-'];
let displayStr = displayStrEnglish;

class Sound { octave: Octave = 0; note: Note = 0; len: number = 0; }

let HOLD: Sound = {octave: Octave.MIDDLE, note: Note.HOLD_NOTE, len: ZERO_LEN}; // octave and len are really don't care for hold
let HOLD2 = [HOLD, HOLD];

class Raag { aaroh: Sound[] = []; avaroh: Sound[] = []; }

let raagNotes = {
    'Bhoop': [Note.S, Note.R, Note.G, Note.P, Note.D],
    'Durga': [Note.S, Note.R, Note.M, Note.P, Note.D],
    'Bairagi': [Note.S, Note.r, Note.M, Note.P, Note.n],
    'Malkauns': [Note.S, Note.g, Note.M, Note.d, Note.n],
    'Chandrakauns': [Note.S, Note.g, Note.M, Note.d, Note.N],
    'Vibhas': [Note.S, Note.r, Note.g, Note.P, Note.d], // komal dha variant
    'BhoopalTodi': [Note.S, Note.r, Note.g, Note.P, Note.d],
};

let patti: Array<Sound>; // but these sounds have no duration

function generateFullPatti(sequence: Note[]) {
    patti = [];

    for (let o in Octave) {
        if (parseInt(Octave[o]) >= 0) { // enum has both strings and reverse-mapping of numbers to the string, we want only the strings
            for (let j = 0; j < sequence.length; j++) {
                let s: Sound = {octave: parseInt(Octave[o]), note: sequence[j], len: ZERO_LEN};
                patti.push(s);
            }
        }
    }
}

function idxOfNoteInPatti(s: Sound) {
    for (var i = 0; i < patti.length; i++)
        if (patti[i].note == s.note && patti[i].octave == s.octave)
            return i;
    return -1;
}

// generates a pattern of notes from the starting note
// optionally, if given a skip and a count, generates the pattern count number of times, each time shifting the starting note by the given skip
// pattern for srgmpdns is [1, 1, 1, 1, 1, 1, 1], i.e. each step is relative to the previous note (not the starting note)
// skip, count are optional
function generate(startNote: Sound, pattern: any[], skip = 0, count = 1) {
    let result = [];
    let idx = idxOfNoteInPatti (startNote);
    for (let i = 0; i < count; i++) {
        result.push (patti[idx]);
        var x = idx;
        for (let j = 0; j < pattern.length; j++) {
            if (pattern[j] === '-') {
                result.push(HOLD);
            } else {
                x += pattern[j] as number;
                result.push(patti[x]);
            }
        }
        idx += skip;
    }
    return result;
}

function tihai (sequence: Sound[]): Sound[] {
    var result = [...sequence]; // spread operator in ES6
    result.push.apply(result, sequence);
    result.push.apply(result, sequence);
    return result;
}

function display (sequence: Sound[], start_beat: number, cycle: number) {
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

        if (note.octave === Octave.LOWER)
            html += '<div class="note lower-octave">';
        else if (note.octave === Octave.UPPER)
            html += '<div class="note upper-octave">';
        else
            html += '<div class="note">';
        html += displayStr[note.note];
        html += '</div>';
    }

    html += "</div><br/><br/>";
    $('.taans').append (html);
}

function parse (s: string): Sound[] {
    let result: Sound[] = [];
    var current_note_len = DEFAULT_NOTE_LEN;
    for (let i = 0; i < s.length; i++) {
        var ch = s.charAt(i), skip_ch = false;
        var octave = Octave.MIDDLE;
        var note: number;

        if (ch === '-' || ch === '+') {
            octave = (ch === '-') ? Octave.LOWER : Octave.UPPER;
            i++;
            note = Note[s.charAt(i) as keyof typeof Note]; // returns undefined if the charAt(i) is not a valid note
        }
        else if (ch === '{') {
            var notes_in_beat = s.substring(i).replace(/[-]/g,'').replace(/[+]/g,'').indexOf('}') - 1; // replace the + and -
            if (notes_in_beat >= 1)
                current_note_len = 1/notes_in_beat;
            console.log (current_note_len);
            skip_ch = true;
        } else if (ch === '}') {
            current_note_len = DEFAULT_NOTE_LEN;
            skip_ch = true;
        } else if (ch === '_') {
            note = Note.HOLD_NOTE;
        } else {
            note =  Note[s.charAt(i) as keyof typeof Note];
        }

        if (!skip_ch)
            result.push({note: note, octave: octave, len: current_note_len});
    }
    return result;
}

function main() {
    generateFullPatti(raagNotes['Bairagi']);
    let middle_sa_idx = idxOfNoteInPatti({octave: Octave.MIDDLE, note: Note.S, len: ZERO_LEN});
    let upper_sa_idx = idxOfNoteInPatti({octave: Octave.UPPER, note: Note.S, len: ZERO_LEN});

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
}