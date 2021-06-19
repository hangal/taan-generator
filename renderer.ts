import {displayStr, Octave, Sound} from "./music.js";

let currentNoteLen  = 1;

export function displayHeader (s: string) {
    $('.composition').append ('<div class="header">' + s + '</div>');
}

// line_num is the line number in the input
export function display (sequence: Sound[], start_beat: number, cycle: number, line_num = 0) {
    var html = '<div class="taan" data-linenum="' + line_num+ '">';
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

        const $note = $('<div></div>');
        $note.addClass('note');
        if (note.octave === Octave.LOWER)
            $note.addClass('lower-octave');
        else if (note.octave === Octave.UPPER)
            $note.addClass('upper-octave');

        if (note.len < 0.5) {
            $note.addClass("small-note");
        }

        $note.html(displayStr[note.note] ? displayStr[note.note] : "?");
        console.log ('adding html ' + $note[0].outerHTML);
        html += $note[0].outerHTML;
    }

    html += "</div><br/><br/>";
    $('.composition').append (html);
}
//
// export function displayBlock (sequences: Sound[][], start_beat: number, cycle: number) {
//     sequences.forEach(function(sequence) {
//        display(sequence, start_beat, cycle);
//     });
// }
