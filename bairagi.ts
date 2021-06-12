import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN, Song} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

export function render(): void {
    let patti = generateFullPatti(ragas['Bairagi']);
    displayHeader("Bairagi Bhairav");

    display(parse('{rS}{-nS}{rP}M__PMrrMSr-NS_', 1), 14, 16);
    display(parse('-P-n-P-nS_rSSrSrM_PMPnPn+S_+R_{+S+r}{Sn}{Pn}{PM}{rM}{Pn}{PM}{rS}', 1), 14, 16);
    display(parse('{rS}{-nS}{rP}M__PMrrS_', 1), 14, 16);
    display(parse('{+S+r}{+Sn}{Pn}M{PP}nP+S__+r+S+rn+S_', 1), 10, 16);
    display(parse('+S+r+P+M+r+SSrPMrS_rMrMPMPnPn+Sn+S+R{+S+r}{Sn}{Pn}{PM}{rM}{Pn}{PM}{rS}_', 1), 10, 16);

    let middle_sa_idx = idxOfNoteInPatti(patti, {octave: Octave.MIDDLE, note: Note.S, len: ZERO_LEN});
    let upper_sa_idx = idxOfNoteInPatti(patti, {octave: Octave.UPPER, note: Note.S, len: ZERO_LEN});

    // bairagi taans
    displayHeader("taans");

    var snpmrs = generate(patti, patti[upper_sa_idx], [], -1, 6);
    var npmrs_ = generate(patti, patti[upper_sa_idx - 1], [], -1, 5);
    npmrs_.push(HOLD);
    var rmrs = generate(patti, patti[middle_sa_idx + 1], [1, -1, -1]);
    var ns = generate(patti, patti[middle_sa_idx - 1], [1]);
    var rmpnpmrs = generate(patti, patti[middle_sa_idx + 1], [1, 1, 1, -1, -1, -1, -1]);
    var rsnsrpm_ = generate(patti, patti[middle_sa_idx + 1], [-1, -1, 1, 1, 2, -1]);
    rsnsrpm_.push(HOLD);

    // pattern of 2 with tihai
    {
        var taan = generate(patti, patti[middle_sa_idx], [-1], 1, 7);
        taan.push.apply(taan, npmrs_);
        taan.push.apply(taan, tihai(rmrs));
        display(taan, 14, 16);
    }

    // pattern of 3
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, 1], 1, 5);
        taan.push(HOLD);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, generate(patti, patti[upper_sa_idx], [1, -1, -1], -2, 3));
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 5
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, 1, -2, 1], 2, 3);
        taan.push.apply(taan, generate(patti, patti[upper_sa_idx], [1, -1, -1], -2, 2));
        taan.push.apply(taan, rmpnpmrs);
        taan.push(HOLD);
        display(taan, 14, 16);
    }

    // pattern of 4 with NSNS pattern
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, -1, 1], 2, 4);
        taan.push.apply(taan, generate(patti, patti[upper_sa_idx], [-1, 1, -1], -2, 3));
        taan.push.apply(taan, ns);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 6 from the top
    {
        taan = generate(patti, patti[upper_sa_idx + 1], [-1, -1, +2, -1, -1], -1, 5);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 8
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, 1, -1, -1, 1, 1, 1], 2, 3);
        taan.push.apply(taan, snpmrs);
        taan.push.apply(taan, HOLD2);
        display(taan, 14, 16);
    }

    // pattern of 24
    {
        var pattern1 = [1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1];
        pattern1.push.apply(pattern1, [1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1]);

        taan = generate(patti, patti[middle_sa_idx - 1], pattern1, 2, 3);
        taan.push.apply(taan, snpmrs);
        taan.push.apply(taan, HOLD2);
        taan.push.apply(taan, tihai(rsnsrpm_));
        display(taan, 14, 16);
    }
}

