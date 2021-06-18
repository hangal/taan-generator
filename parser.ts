import {DEFAULT_NOTE_LEN, Note, Octave, Sound} from "./music.js";

/* parse a text string into a sound sequence (like Lilypond or ABC) */
export function parse (s: string, note_len = DEFAULT_NOTE_LEN): Sound[] {
    let result: Sound[] = [];
    var current_note_len = note_len;

    let defaulOctave = Octave.MIDDLE;
    // if the first line is a + or -, we default to upper or lower octave
    {
        // if (s.charAt(0) == '+')
        //     defaulOctave = Octave.MIDDLE + 1;
        // else if (s.charAt(0) == '-')
        //     defaulOctave = Octave.MIDDLE - 1;
    }

    for (let i = 0; i < s.length; i++) {
        var ch = s.charAt(i), skip_ch = false;
        var octave = Octave.MIDDLE;
        var note: number;

        if (ch === '-' || ch === '+') {
            octave = (ch === '-') ? defaulOctave-1 : defaulOctave+1;
            i++;
            ch = s.charAt(i);
            if (ch === '-' || ch === '+') {
                octave = (ch === '-') ? octave - 1 : octave + 1;
                i++;
            }
            note = Note[s.charAt(i) as keyof typeof Note]; // returns undefined if the charAt(i) is not a valid note
        }
        else if (ch === '{') {
            var notes_in_beat = s.substring(i).replace(/[-]/g,'').replace(/[+]/g,'').indexOf('}') - 1; // replace the + and -
            if (notes_in_beat >= 1)
                current_note_len = 1/notes_in_beat;
            console.log (current_note_len);
            skip_ch = true;
        } else if (ch === '}') {
            current_note_len = note_len; // restore the default
            skip_ch = true;
        } else if (ch === '_') {
            note = Note.HOLD_NOTE;
        } else if (ch === ' ') {
            // do nothing
            skip_ch = true;
        } else {
            if (ch === 's' || ch === 'p')
                ch = ch.toUpperCase();
            note =  Note[ch as keyof typeof Note];
        }

        if (!skip_ch)
            result.push({note: note, octave: octave, len: current_note_len});
    }
    return result;
}

