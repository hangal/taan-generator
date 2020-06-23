import {generate, generateFullPatti, HOLD, HOLD2, idxOfNoteInPatti, Note, Octave, tihai, ZERO_LEN} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {ragas} from "./ragas.js";

export function main() {
    let currentNoteLen = 1.0;

    let patti = generateFullPatti(ragas['Durga']);
    displayHeader ("Durga");

    // durga - teentaal
    displayHeader ("Durga teentaal");
    display(parse('SRRPPMPDD_MPMRS_', 1), 9, 16);
    display(parse('SRSRS-DS_D+SDPMRS_', 1), 9, 16);
    display(parse('MMPD+SD+S_D+S+R+SDPM_', 1), 9, 16);
    display(parse('+M_+R+SDPMPDSDPMRS_', 1), 9, 16);

    // durga - teentaal
    displayHeader ("Durga teentaal");
    currentNoteLen = 1.0;
    display(parse('SDPD_M_PD_MPMRS_', 1), 9, 16);
    display(parse('SRMPRMPD+S{DP}D{PM}P{MR}M{RS}', 1), 9, 16);
    display(parse('MMPD+SD+S_D+S+R+S{D+S}{DP}M_', 1), 9, 16);
    display(parse('+M+R+SD+R+S+DP+S{DP}D{PM}P{MP}M{RS}', 1), 9, 16);
}

main();

