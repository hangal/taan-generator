import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

export function render() {
    let currentNoteLen = 1.0;

    let patti = generateFullPatti(ragas['Bhoop']);
    displayHeader ("Bhoop");

    // bhoop - teentaal
    displayHeader ("Bhoop teentaal");
    currentNoteLen = 1.0;
    display(parse('D+SDPGRSRG_GRGPD_', 1), 9, 16);
    display(parse('GGGRGPD_+S_DPGRS_', 1), 9, 16);
    display(parse('G_G_P_D_+S_+S_+S+R+S_', 1), 9, 16);
    display(parse('+G+R+SD+R+SDP+S_DPGRS_', 1), 9, 16);

    // bhoop ektaal
    displayHeader ("Bhoop ektaal");
    display(parse('GRG_R_S-D-P-DSR', 1), 1, 12);
    display(parse('GRG_{GP}{DP}GRSDS_', 1), 1, 12);
    display(parse('-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}', 1), 1, 12);
    display(parse('-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}', 1), 1, 12);
    display(parse('GGGPDPD+SD+S_+S', 1), 1, 12);
    display(parse('DDD+S+R+R{+S+R}+G+R{+S+R}{+SD}P', 1), 1, 12);
    display(parse('D{D+S}DPG{GP}GRS{SR}{S-D}{SR}', 1), 1, 12);
}

