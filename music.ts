
enum Note {S, r, R, g, G, M, m, P, d, D, n, N, HOLD_NOTE}
enum Octave {LOWER, MIDDLE, UPPER} // important assumption for iterating over octave elements - the values have to be numbers

const displayStrEnglish = ['Sa', '<u>Re</u>', 'Re', '<u>Ga</u>','Ga', 'Ma', 'MaT', 'Pa', '<span style="font-size:85%"><u>Dha</u></span>', '<span style="font-size:85%">Dha</span>', '<u>Ni</u>', 'Ni', '-'];
const displayStrKannada = ['ಸಾ', '<u>ರೆ</u>', 'ರೆ', '<u>ಗ</u>', 'ಗ', 'ಮ', 'MaT', 'ಪ', '<u>ಧ</u>', 'ಧ', '<u>ನಿ</u>', 'ನಿ', '-'];
const displayStrDev = ['सा', '<u>रे</u>', 'रे', '<u>ग</u>', 'ग', 'म', 'MaT', 'प', '<u>ध</u>', 'ध', '<u>नी</u>', 'नी', '-'];
const displayStr = displayStrEnglish;

class Sound { octave: Octave = 0; note: Note = 0; len: number = 0; }

const ZERO_LEN = 0;
var DEFAULT_NOTE_LEN = 0.5;

const HOLD: Sound = {octave: Octave.MIDDLE, note: Note.HOLD_NOTE, len: ZERO_LEN}; // octave and len are really don't care for hold
const HOLD2 = [HOLD, HOLD];

class Raag { aaroh: Sound[] = []; avaroh: Sound[] = []; }

export {Note, Octave, Sound, Raag, displayStr, ZERO_LEN, DEFAULT_NOTE_LEN, HOLD, HOLD2};

export function tihai(sequence: Sound[]): Sound[] {
    var result = [...sequence]; // spread operator in ES6
    result.push.apply(result, sequence);
    result.push.apply(result, sequence);
    return result;
}

// generates a pattern of notes from the starting note
// optionally, if given a skip and a count, generates the pattern count number of times, each time shifting the starting note by the given skip
// pattern for srgmpdns is [1, 1, 1, 1, 1, 1, 1], i.e. each step is relative to the previous note (not the starting note)
// skip, count are optional
export function generate(patti: Array<Sound>, startNote: Sound, pattern: any[], skip = 0, count = 1) {
    let result = [];
    let idx = idxOfNoteInPatti(patti, startNote);
    for (let i = 0; i < count; i++) {
        result.push(patti[idx]);
        var x = idx;
        for (let elem of pattern) {
            if (elem === '-') {
                result.push(HOLD);
            } else {
                x += elem as number;
                result.push(patti[x]);
            }
        }

        idx += skip;
    }
    return result;
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