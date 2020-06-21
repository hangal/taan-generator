
import {Sound, Note, DEFAULT_NOTE_LEN, Octave} from "./music.js";

/* parse a text string into a sound sequence (like Lilypond or ABC) */
export function parse (s: string): Sound[] {
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
