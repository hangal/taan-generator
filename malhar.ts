// bhoop ektaal
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";

export function render() {

    displayHeader ("Malhar matta taal");

    // sthayi
    display(parse('{-n-M}{-P-n}{-D-N}S{RR}P{gM}R{-nS}', 1), 7, 9);

    display(parse('{MR}{PM}{Pn}D{DN+S_}{nP}{nPMP}{gM}{RS}', 1), 7, 9);
}
