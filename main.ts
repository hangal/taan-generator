import * as Bairagi from "./bairagi.js";
import * as GujriTodi from "./gujritodi.js";
import * as Bhairav from "./bhairav.js";
import * as Bhoop from "./bhoop.js";
import * as Durga from "./durga.js";
import * as Bageshree from "./bageshree.js";
import * as Multani from "./multani.js";
import * as Malhar from "./malhar.js";

import {setLanguage} from "./music.js";

$(function() {

    function renderSong() {
        let raag = $('select#raag').val();
        switch (raag) {
            case 'GujriTodi': GujriTodi.render(); break;
            case 'Bairagi': Bairagi.render(); break;
            case 'Bhairav': Bhairav.render(); break;
            case 'Bhoop': Bhoop.render(); break;
            case 'Durga': Durga.render(); break;
            case 'Bageshree': Bageshree.render(); break;
            case 'Multani': Multani.render(); break;
            case 'Malhar': Malhar.render(); break;
        }
    }

    $('#lang, #raag').change(function(e) {
        const lang = $('#lang').val() as string;
        $('.taans').html('');

        setLanguage(lang);
        $('link[href="hi.css"], link[href="ka.css"], link[href="en.css"]').prop('disabled', true);
        $('link[href="' + lang + '.css"]').prop('disabled', false);
        $('body').removeClass('hi').removeClass('kn').removeClass('en').removeClass('sen');
        $('body').addClass(lang);

        renderSong();
    });

    renderSong();
});

