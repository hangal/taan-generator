// bhoop ektaal
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";

export function render() {

    displayHeader ("Multani ektaal");

    // sthayi
    display(parse('mgmP{mP}{dP}mgrS_S', 1), 1, 12);
    display(parse('-N_Sg_mP_{Sg}{mP}{mg}{rS}', 1), 1, 12);

    // antara
    display(parse('PmPgmmPNN+S_+S', 1), 1, 12);
    display(parse('PN+S+g+r+SN+SNdPm', 1), 1, 12);

    var firstSix = parse('gmPN+SN', 1);
    var lastSix = parse('{PN}{+SN}{dP}{mg}{rS}{-nS}', 1);
    firstSix.push.apply(firstSix, lastSix);
    var line = firstSix;
    display(line, 1, 12);

    line.push.apply(line, lastSix);
    line.push.apply(line, lastSix);
    display(line, 1, 12);
}
