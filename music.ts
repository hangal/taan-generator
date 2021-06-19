
enum Note {S, r, R, g, G, M, m, P, d, D, n, N, HOLD_NOTE}
enum Octave {LOWER_LOWER, LOWER, MIDDLE, UPPER, UPPER_UPPER} // important assumption for iterating over octave elements - the values have to be numbers

const languageToBasicNotes = new Map([
    ["sen", ['S', 'R', 'G', 'M', 'P', 'D', 'N']],
    ["en", ['Sa', 'Re', 'Ga', 'Ma', 'Pa', '<span style="font-size:85%">Dha</span>', 'Ni']],
    ["kn", ['ಸಾ', 'ರೆ', 'ಗ', 'ಮ', 'ಪ', 'ಧ', 'ನಿ']],
    ["hi", ['सा', 'रे', 'ग', 'म', 'प', 'ध', 'नी']]
]);

// make the hindi and kannada chars bigger because the fonts are small
// languageToBasicNotes.forEach(function(v, k) {
//     if (k == 'hi' || k == 'kn') {
//         let result = [] as any;
//         v.forEach(function(elem) {
//             result.push ('<span style="font-size:20px">' + elem + '</span>');
//         });
//         languageToBasicNotes.set (k, result);
//     }
// });

const languageToNotes: Map<string, Array<string>> = new Map();
languageToBasicNotes.forEach(function(v, k) {
    const notesForLang = [];
    notesForLang.push (v[0]);

    notesForLang.push ('<span class="komal">' + v[1] + '</span>');
    notesForLang.push (v[1]);
    notesForLang.push ('<span class="komal">' + v[2] + '</span>');
    notesForLang.push (v[2]);

    notesForLang.push (v[3]);
    notesForLang.push ('<span class="teevra">' + v[3] + '</span>');

    notesForLang.push (v[4]);

    notesForLang.push ('<span class="komal">' + v[5] + '</span>');
    notesForLang.push (v[5]);
    notesForLang.push ('<span class="komal">' + v[6] + '</span>');
    notesForLang.push (v[6]);

    notesForLang.push ('—');

    languageToNotes.set(k, notesForLang);
});

var displayStr = languageToNotes.get("sen"); // default english
export function setLanguage(languageCode: string) {
    displayStr = languageToNotes.get(languageCode);
}

class Sound { octave: Octave = 0; note: Note = 0; len: number = 0; }

const ZERO_LEN = 0;
var DEFAULT_NOTE_LEN = 1;

const HOLD: Sound = {octave: Octave.MIDDLE, note: Note.HOLD_NOTE, len: ZERO_LEN}; // octave and len are really don't care for hold
const HOLD2 = [HOLD, HOLD];

class Raag { aaroh: Sound[] = []; avaroh: Sound[] = []; }
export interface Song { renderSong(): void; }

export {Note, Octave, Sound, Raag, displayStr, ZERO_LEN, DEFAULT_NOTE_LEN, HOLD, HOLD2, languageToNotes};

export function tihai(sequence: Sound[]): Sound[] {
    // important to clone the notes... they will have speed adjustments applied to them later #wasabug
    var result = [...sequence]; // spread operator in ES6
    result.push.apply(result, [...sequence]);
    result.push.apply(result, [...sequence]);
    return result;
}

// generates a pattern of notes from the starting note
// optionally, if given a skip and a count, generates the pattern count number of times, each time shifting the starting note by the given skip
// pattern for srgmpdns is [1, 1, 1, 1, 1, 1, 1], i.e. each step is relative to the previous note (not the starting note)
// skip, count are optional
export function generate(patti: Array<Sound>, startNote: Sound, pattern: any[], skip = 0, count = 1, note_len = 1): Sound[] {
    let result = [];
    let idx = idxOfNoteInPatti(patti, startNote);
    for (let i = 0; i < count; i++) {
        const note = {...patti[idx]}; // spread operator, like clone
        note.len = note_len;
        result.push(note);
        var x = idx;
        for (let elem of pattern) {
            if (elem === '-') {
                const n = {...HOLD};
                n.len = note_len;
                result.push(n);
            } else {
                x += elem as number;
                const n = {...patti[x]};
                n.len = note_len;
                result.push(n);
            }
        }

        idx += skip;
    }
    return result;
}

export function speedup (sounds: Sound[], speedUpFactor: number) {
    for (let i = 0; i < sounds.length; i++)
        sounds[i].len = sounds[i].len/speedUpFactor;
}


export function addToTaan (soundsA: Sound[], soundsB: Sound[]) {
    for (let i = 0; i < soundsB.length; i++) {
        let clone = {...soundsB[i]};
        if (!clone.len)
            clone.len = 1;
        soundsA.push(clone);
    }
}

/** returns the index of s's note and octave if in patti, otherwise returns -1. */
export function idxOfNoteInPatti(patti: Array<Sound>, s: Sound) {
    for (var i = 0; i < patti.length; i++)
        if (patti[i].note == s.note && patti[i].octave == s.octave)
            return i;
    return -1;
}

/** given a sequence of notes, generates a patti of those notes in 3 octaves */
export function generateFullPatti(sequence: Note[]) {
    let patti = [];

    for (let o in Octave) {
        if (parseInt(Octave[o]) >= 0) { // enum has both strings and reverse-mapping of numbers to the string, we want only the strings
            for (let j = 0; j < sequence.length; j++) {
                let s: Sound = {octave: parseInt(Octave[o]), note: sequence[j], len: ZERO_LEN};
                patti.push(s);
            }
        }
    }
    return patti;
}