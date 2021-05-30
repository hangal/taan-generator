import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

export function main() {
//    let currentNoteLen = 1.0;

//    let patti = generateFullPatti(ragas['Bhoop']);
    displayHeader("Gujri Todi");

    let line2 = parse('Sdmd_mgm+SNd_mgrS', 1);
    let line3 = parse('SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG', 1);

    display(parse('Sdmd_mgm+SNd_mgrS', 1), 9, 16);
    display(parse('grdm+g+r{+S+r}{+g+r}{+SN}{dN}{+S+r}{+g+r}{SN}{dm}{gr}S', 1), 9, 16);
    display(parse('{n+S}{dn}{md}{gm}{rg}{Sr}{gm}{dn}+S_Ndmd+S_', 1), 9, 16);
    display(parse('{md}{+g+r}{SN}{md}{+r+S}{Nd}{md}+S_N_d_m_g', 1), 9, 16);
}

main();

