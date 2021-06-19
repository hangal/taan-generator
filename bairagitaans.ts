import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN, speedup, addToTaan} from "./music.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

// render bairagi taans only
export function render(): void {
    let patti = generateFullPatti(ragas['Bairagi']);
    let middle_sa_idx = idxOfNoteInPatti(patti, {octave: Octave.MIDDLE, note: Note.S, len: ZERO_LEN});
    let upper_sa_idx = idxOfNoteInPatti(patti, {octave: Octave.UPPER, note: Note.S, len: ZERO_LEN});
    displayHeader("taans");

    var snpmrs = generate(patti, patti[upper_sa_idx], [], -1, 6);
    var npmrs_ = generate(patti, patti[upper_sa_idx - 1], [], -1, 5);
    addToTaan (npmrs_, [HOLD]);
    var rmrs = generate(patti, patti[middle_sa_idx + 1], [1, -1, -1]);
    var ns = generate(patti, patti[middle_sa_idx - 1], [1]);
    var rmpnpmrs = generate(patti, patti[middle_sa_idx + 1], [1, 1, 1, -1, -1, -1, -1]);
    var rsnsrpm_ = generate(patti, patti[middle_sa_idx + 1], [-1, -1, 1, 1, 2, -1]);
    addToTaan (rsnsrpm_, [HOLD]);

    // pattern of 2 with tihai
    {
        var taan = generate(patti, patti[middle_sa_idx], [-1], 1, 7); // sn rs mr pm np sn rs
        addToTaan(taan, npmrs_); // npmrs_
        addToTaan(taan, tihai(rmrs)); // rmrs rmrs rmrs
        speedup(taan, 2);
        display(taan, 14, 16);
    }

    // pattern of 3
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, 1], 1, 5); // nsr, srm, rmp, mpn, pns
        addToTaan (taan, [HOLD]);
        addToTaan(taan, generate(patti, patti[upper_sa_idx], [1, -1, -1], -2, 3)); // srsn pnpm rmrs
        addToTaan(taan, HOLD2);
        addToTaan(taan, HOLD2);
        speedup(taan, 2);
        display(taan, 14, 16);
    }

    // pattern of 5
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, 1, -2, 1], 2, 3); // nsrns, rpmrm, pnspn
        addToTaan(taan, generate(patti, patti[upper_sa_idx], [1, -1, -1], -2, 2)); // srsn, pnpm
        addToTaan(taan, rmpnpmrs);
        addToTaan (taan, [HOLD]);
        speedup(taan, 2);
        display(taan, 14, 16);
    }

    // pattern of 4 with NSNS pattern
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, -1, 1], 2, 4); // nsns rmrm pnpn srsr
        addToTaan(taan, generate(patti, patti[upper_sa_idx], [-1, 1, -1], -2, 3)); // snsn pmpm rsrs
        addToTaan(taan, ns);
        addToTaan(taan, HOLD2);
        speedup(taan, 2);
        display(taan, 14, 16);
    }

    // pattern of 6 from the top
    {
        taan = generate(patti, patti[upper_sa_idx + 1], [-1, -1, +2, -1, -1], -1, 5); // rsnrsn, snpsnp, npmnpm, pmrpmr, mrsmrs,
        addToTaan(taan, HOLD2);
        speedup(taan, 2);
        display(taan, 14, 16);
    }

    // pattern of 8
    {
        taan = generate(patti, patti[middle_sa_idx - 1], [1, 1, -1, -1, 1, 1, 1], 2, 3);
        addToTaan(taan, snpmrs);
        addToTaan(taan, HOLD2);
        speedup(taan, 2);
        display(taan, 14, 16);
    }

    // pattern of 24
    {
        var pattern1 = [1, 1, -1, 1, -1, -1, 1, -1, 1, 1, 1]; // nsrsrsnsnsrm,
        pattern1.push.apply(pattern1, [1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1, -1]); // pmrmrmpmpmrs

        taan = generate(patti, patti[middle_sa_idx - 1], pattern1, 2, 3);
        addToTaan(taan, snpmrs);
        addToTaan(taan, HOLD2);
        addToTaan(taan, tihai(rsnsrpm_));
        speedup(taan, 2);
        display(taan, 14, 16);
    }
}

