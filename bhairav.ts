import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

export function main() {
//    let currentNoteLen = 1.0;

//    let patti = generateFullPatti(ragas['Bhoop']);
    displayHeader("Bhairav");

    let line2 = parse('GGMrGMPPMGMGr_S_', 1);
    let line3 = parse('SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG', 1);

    display(parse('GMd_P_dMP_{MP}{dP}M_GR', 1), 9, 16);
    display(line2, 9, 16);
    display(line3, 9, 16);
    display(parse('M_MMPPddPd+S_+SN+r+S', 1), 9, 16);
    display(parse('d_dN_N+S+SN_+S+r{+S+r}{+SN}dP}', 1), 9, 16);
    display(line2, 9, 16);
    display(line3, 9, 16);
}

main();

