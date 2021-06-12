import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

export function render() {
//    let currentNoteLen = 1.0;

//    let patti = generateFullPatti(ragas['Bhoop']);
    displayHeader("Bageshree");

    display(parse('MgRS-nS-D-nS_M_gRS_', 1), 9, 16);
    display(parse('-nSgMDnD_MPDMgRS_', 1), 9, 16);
    display(parse('gMDnS_S_Dn+S+M+g+R+S_', 1), 9, 16);
    display(parse('+M+g+R+SDnDMMPDMgRS_', 1), 9, 16);
}

