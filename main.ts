import * as BairagiTaans from "./bairagitaans.js";

import {DEFAULT_NOTE_LEN, Raag, setLanguage, Sound} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";
import {Raags, gats} from "./gats.js";

$(function() {

    function renderSong() {
        $('.composition').html('');

        const inp = $('.composer-text').val() as string;
        if (inp) {
            parseAndDisplayText(inp);
            return;
        } else {
            let raag = $('select#raag').val() as string;
            let r = Raags[raag as keyof typeof Raags];
            console.log ('rendering raag ' + r);
            // @ts-ignore
            parseAndDisplayText(gats.get(r) as string);
            switch (raag) {
                case 'Bairagi':
                    BairagiTaans.render();
                    break;
            }
        }
    }

    $('#lang, #raag').change(function(e) {
        const lang = $('#lang').val() as string;

        setLanguage(lang);
        $('link[href="hi.css"], link[href="ka.css"], link[href="en.css"]').prop('disabled', true);
        $('link[href="' + lang + '.css"]').prop('disabled', false);
        $('body').removeClass('hi').removeClass('kn').removeClass('en').removeClass('sen');
        $('body').addClass(lang);

        renderSong();
    });

    $('.composer-text').keyup(function() {
        renderSong();
    });

    $('.composer-button').click(function(e) {
        var $textbox = $('.composer');
        $textbox.toggle();
        
        if ($textbox.is(":visible")) {
            $('.composer-button').css('background-color', 'white').css('color', 'black');
        } else {
            $('.composer-button').css('background-color', 'black').css('color', 'white');
        }
    });
    renderSong();
});

function parseAndDisplayText (s: string) {
    if (!s)
        return;
    let lines = s.split ("\n");
    var cycle = 16;
    var start_beat = 9;
    var note_len = DEFAULT_NOTE_LEN;

    lines.forEach(function(line) {
        line = line.trim();
        if (!line)
            return;
        if (line.toUpperCase().indexOf("H:") == 0) {
            displayHeader (line.substring(2).trim());
        } else if (line.toUpperCase().indexOf("B:") == 0) {
            cycle = parseInt(line.substring(2).trim());
        } else if (line.toUpperCase().indexOf("S:") == 0) {
            start_beat = parseInt(line.substring(2).trim());
        } else if (line.toUpperCase().indexOf("L:") == 0) {
            note_len = parseFloat(line.substring(2).trim());
        } else {
            display (parse(line, note_len), start_beat, cycle);
        }
    });
}
