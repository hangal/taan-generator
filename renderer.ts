import {displayStr, Octave, Sound} from "./music.js";

let currentNoteLen  = 1;

export function displayHeader (s: string) {
    $('.taans').append ('<br/><hr/><br/>' + s + '<br/>');
}

export function display (sequence: Sound[], start_beat: number, cycle: number) {
    var html = '<div class="taan">';
    var this_beat = start_beat;

    function close_beat() {
        html += '</div> <!-- beat -->';
    }

    var cumulative_len = 0.0;
    for (var i = 0; i < sequence.length; i++) {
        let note = sequence[i];
        if (!note.len)
            note.len = currentNoteLen;

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
