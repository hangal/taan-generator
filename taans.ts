import {Note, Octave, Sound, Raag, HOLD, HOLD2, ZERO_LEN, DEFAULT_NOTE_LEN, displayStr} from "./music.js";
import {parse} from "./parser.js";
import {display} from "./renderer.js";
import {ragas} from "./ragas.js";

let patti: Array<Sound>; // but these sounds have no duration
let currentNoteLen = 1.0;

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

/** returns the index of s's note and octave if in patti, otherwise returns -1. */
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

function tihai (sequence: Sound[]): Sound[] {
    var result = [...sequence]; // spread operator in ES6
    result.push.apply(result, sequence);
    result.push.apply(result, sequence);
    return result;
}

export function main() {
    generateFullPatti(ragas['Bairagi']);
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
    currentNoteLen = 1.0;
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

main();

