
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
